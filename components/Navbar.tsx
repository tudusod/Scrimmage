"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import Link from "next/link";

const LINKS = [
  { label: "Нөхөрсөг тоглолтууд", href: "/matches" },
  { label: "Дүүргүүд", href: "/districts" },
  { label: "Багууд", href: "/teams" },
  { label: "Заал хайх", href: "/courts" },
];

export function Navbar({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const authLinks = signedIn
    ? [{ href: "/account", label: "Миний бүртгэл" }]
    : [{ href: "/login", label: "Нэвтрэх" }, { href: "/register", label: "Бүртгүүлэх" }];
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-court/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Scrimmage нүүр"><Logo /></Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-mute transition hover:text-white">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {authLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={href === "/login"
              ? "rounded-lg border border-line px-4 py-2 text-sm font-semibold transition hover:border-flame hover:text-flame"
              : "rounded-lg bg-flame px-4 py-2 text-sm font-bold text-court transition hover:bg-flame-soft"}>
              {label}
            </Link>
          ))}
        </div>

        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Цэс">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-court px-4 pb-5 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium text-mute hover:bg-ink hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-3">
            {authLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={href === "/login"
                ? "flex-1 rounded-lg border border-line py-3 text-center text-sm font-semibold"
                : "flex-1 rounded-lg bg-flame py-3 text-center text-sm font-bold text-court"}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
