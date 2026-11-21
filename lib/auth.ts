import "server-only";

import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { MongoClient } from "mongodb";
import { cache } from "react";

type User = { _id: string; passwordHash: string; createdAt: Date };
type Session = { _id: string; email: string; expiresAt: Date };

const cookieName = "scrimmage_session";
const sessionDuration = 7 * 24 * 60 * 60 * 1000;
const connections = globalThis as typeof globalThis & {
  scrimmageMongo?: MongoClient;
};

function authDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required for authentication.");

  connections.scrimmageMongo ??= new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  return connections.scrimmageMongo.db(process.env.MONGODB_DB || "scrimmage");
}

export function users() {
  return authDatabase().collection<User>("users");
}

function sessions() {
  return authDatabase().collection<Session>("sessions");
}

function deriveKey(password: string, salt: string) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 ** 2 }, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return salt + ":" + (await deriveKey(password, salt)).toString("hex");
}

export async function verifyPassword(password: string, stored?: string) {
  const [salt, hash] = (stored ?? "0".repeat(32) + ":" + "0".repeat(128)).split(":");
  const key = await deriveKey(password, salt);
  return timingSafeEqual(key, Buffer.from(hash, "hex")) && stored !== undefined;
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function readSessionToken() {
  const token = (await cookies()).get(cookieName)?.value;
  return token && /^[a-f0-9]{64}$/.test(token) ? token : undefined;
}

export async function startSession(email: string) {
  const previousToken = await readSessionToken();
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + sessionDuration);
  const collection = sessions();
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  if (previousToken) await collection.deleteOne({ _id: tokenHash(previousToken) });
  await collection.insertOne({ _id: tokenHash(token), email, expiresAt });
  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function endSession() {
  const token = await readSessionToken();
  if (token) await sessions().deleteOne({ _id: tokenHash(token) });
  (await cookies()).delete(cookieName);
}

export const getCurrentUser = cache(async () => {
  const token = await readSessionToken();
  if (!token || !process.env.MONGODB_URI) return null;

  await connection();
  const session = await sessions().findOne({
    _id: tokenHash(token),
    expiresAt: { $gt: new Date() },
  });
  if (!session) return null;
  const user = await users().findOne(
    { _id: session.email },
    { projection: { _id: 1 } },
  );
  return user ? { email: user._id } : null;
});
