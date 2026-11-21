import { Logo } from "./Logo";

const SOCIAL = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

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
