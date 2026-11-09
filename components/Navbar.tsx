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

export function Navbar() {
  const [open, setOpen] = useState(false);
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
          <a href="/login" className="rounded-lg border border-line px-4 py-2 text-sm font-semibold transition hover:border-flame hover:text-flame">Нэвтрэх</a>
          <a href="/register" className="rounded-lg bg-flame px-4 py-2 text-sm font-bold text-white shadow-[0_0_24px_-4px_#ff5722] transition hover:bg-flame-soft">Баг бүртгүүлэх</a>
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
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href="/login" className="rounded-lg border border-line py-3 text-center text-sm font-semibold">Нэвтрэх</a>
            <a href="/register" className="rounded-lg bg-flame py-3 text-center text-sm font-bold">Баг бүртгүүлэх</a>
          </div>
        </div>
      )}
    </header>
  );
}
