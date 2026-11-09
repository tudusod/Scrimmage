import { Logo } from "./Logo";

const SOCIAL = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-flame px-6 py-14 sm:px-14">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full border-[18px] border-white/15" aria-hidden />
        <h2 className="relative max-w-2xl font-display text-2xl font-extrabold leading-snug text-white sm:text-3xl">
          Танай сургуулийн баг бэлэн үү? Одоо багаа бүртгүүлж, нөхөрсөг тоглолтоо эхлүүл.
        </h2>
        <a href="/register" className="relative mt-8 inline-block rounded-xl bg-court px-7 py-4 font-bold text-white transition hover:bg-black">Баг бүртгүүлэх</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Logo />
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
          {SOCIAL.map((s) => <li key={s.label}><a href={s.href} className="hover:text-white">{s.label}</a></li>)}
          <li><a href="/terms" className="hover:text-white">Үйлчилгээний нөхцөл</a></li>
          <li><a href="/privacy" className="hover:text-white">Нууцлалын бодлого</a></li>
        </ul>
        <p className="text-sm text-mute">© 2026 Scrimmage. Бүх эрх хуулиар хамгаалагдсан.</p>
      </div>
    </footer>
  );
}