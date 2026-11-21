"use server";

import { MongoServerError } from "mongodb";
import { redirect } from "next/navigation";
import { endSession, hashPassword, startSession, users, verifyPassword } from "@/lib/auth";

type AuthState = { error: string };

const invalidCredentials = "И-мэйл эсвэл нууц үг буруу байна.";
const unavailable = "Түр алдаа гарлаа. Дахин оролдоно уу.";

function credentials(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string") return null;

  const normalizedEmail = email.trim().toLowerCase();
  if (
    normalizedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    password.length === 0 ||
    password.length > 128
  ) {
    return null;
  }
  return { email: normalizedEmail, password };
}

export async function register(_previous: AuthState | null, formData: FormData): Promise<AuthState> {
  const input = credentials(formData);
  if (!input) return { error: "И-мэйл болон нууц үгээ шалгана уу." };
  if (input.password.length < 8) {
    return { error: "Нууц үг дор хаяж 8 тэмдэгттэй байх ёстой." };
  }

  try {
    await users().insertOne({
      _id: input.email,
      passwordHash: await hashPassword(input.password),
      createdAt: new Date(),
    });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return { error: "Энэ и-мэйл бүртгэлтэй байна. Нэвтэрнэ үү." };
    }
    console.error("Registration failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      ...(error instanceof MongoServerError && {
        code: error.code,
        codeName: error.codeName,
        authenticationRejected: /bad auth|authentication failed/i.test(error.message),
      }),
    });
    return { error: unavailable };
  }

  redirect("/login?registered=1");
}

export async function login(_previous: AuthState | null, formData: FormData): Promise<AuthState> {
  const input = credentials(formData);
  if (!input) return { error: invalidCredentials };

  try {
    const user = await users().findOne({ _id: input.email });
    if (!(await verifyPassword(input.password, user?.passwordHash))) {
      return { error: invalidCredentials };
    }
    await startSession(input.email);
  } catch (error) {
    console.error("Login failed", error instanceof Error ? error.name : "UnknownError");
    return { error: unavailable };
  }

  redirect("/account");
}

export async function logout() {
  await endSession();
  redirect("/");
}
