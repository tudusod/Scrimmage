"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, register } from "@/app/auth-actions";

export function AuthForm({ signup = false, registered = false }) {
  const [state, action, pending] = useActionState(signup ? register : login, null);
  const title = signup ? "Бүртгүүлэх" : "Нэвтрэх";
  const inputClass = "rounded-lg border border-line bg-court px-3 py-2.5 text-white";

  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 sm:py-24">
      <div className="rounded-2xl border border-line bg-ink p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        {registered && (
          <p role="status" className="mt-4 text-sm text-mute">Бүртгэл амжилттай. Одоо нэвтэрнэ үү.</p>
        )}
        <form action={action} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            И-мэйл
            <input className={inputClass} type="email" name="email" autoComplete="username" maxLength={254} required />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Нууц үг
            <input
              className={inputClass}
              type="password"
              name="password"
              autoComplete={signup ? "new-password" : "current-password"}
              minLength={signup ? 8 : undefined}
              maxLength={128}
              aria-describedby={signup ? "password-hint" : undefined}
              required
            />
            {signup && <span id="password-hint" className="font-normal text-mute">Дор хаяж 8 тэмдэгт</span>}
          </label>
          {state?.error && <p role="alert" className="text-sm text-flame-soft">{state.error}</p>}
          <button disabled={pending} className="rounded-lg bg-flame px-4 py-2.5 font-bold text-court hover:bg-flame-soft disabled:opacity-60">
            {pending ? "Түр хүлээнэ үү…" : title}
          </button>
        </form>
        <p className="mt-5 text-sm text-mute">
          {signup ? "Бүртгэлтэй юу?" : "Шинэ хэрэглэгч үү?"}{" "}
          <Link className="font-semibold text-flame-soft hover:underline" href={signup ? "/login" : "/register"}>
            {signup ? "Нэвтрэх" : "Бүртгүүлэх"}
          </Link>
        </p>
      </div>
    </section>
  );
}
