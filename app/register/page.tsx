import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";

async function RegisterContent() {
  if (await getCurrentUser()) redirect("/account");

  return <AuthForm signup />;
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterContent />
    </Suspense>
  );
}
