import { redirect } from "next/navigation";
import { Suspense } from "react";
import { logout } from "@/app/auth-actions";
import { getCurrentUser } from "@/lib/auth";

async function AccountContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 sm:py-24">
      <div className="rounded-2xl border border-line bg-ink p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold">Миний бүртгэл</h1>
        <p className="mt-3 break-all text-mute">{user.email}</p>
        <form action={logout} className="mt-6">
          <button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:border-flame hover:text-flame-soft">
            Гарах
          </button>
        </form>
      </div>
    </section>
  );
}

export default function AccountPage() {
  return (
    <Suspense>
      <AccountContent />
    </Suspense>
  );
}
