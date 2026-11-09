import { BarChart3, Search, Star } from "lucide-react";

const FEATURES = [
  { icon: Search, title: "Заал ба өрсөлдөгч олох", text: "Хурдан бөгөөд хялбар matchmaking. Дүүрэг, анги, цагаа сонгоход л хангалттай." },
  { icon: Star, title: "Fair Play ба Үнэлгээ", text: "Тоглолтын дараа багууд бие биедээ одоор үнэлгээ өгч, шударга тоглогчдыг тодруулна." },
  { icon: BarChart3, title: "Багийн статистик", text: "Нөхөрсөг тоглолтын хожил, хожигдлын түүхээ хөтөлж, багийнхаа өсөлтийг хар." },
];

export function Features() {
  return (
    <section id="teams" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
      <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Яагаад Scrimmage гэж?</h2>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-flame/40 bg-flame/10 text-flame shadow-[0_0_30px_-8px_#ff5722]"><Icon size={26} /></span>
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-mute">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
