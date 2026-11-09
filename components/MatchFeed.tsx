import { CalendarClock, MapPin, Swords } from "lucide-react";
import type { Match, MatchStatus } from "@/lib/data";

const STATUS: Record<MatchStatus, { label: string; cls: string }> = {
  split: { label: "Заалтай / Заалны төлбөр тал хуваана", cls: "bg-amber-400/10 text-amber-300" },
  hosting: { label: "Заалтай өрсөлдөгч хайж байна", cls: "bg-emerald-400/10 text-emerald-300" },
};

export function MatchCard({ m }: { m: Match }) {
  const s = STATUS[m.status];
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-line bg-ink p-5 transition hover:border-flame/60">
      <header className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-flame font-display font-extrabold">{m.team[0]}</span>
        <div className="min-w-0">
          <h3 className="truncate font-bold">{m.team}</h3>
          <p className="truncate text-sm text-mute">{m.school} - {m.grade}</p>
        </div>
      </header>

      <ul className="space-y-2 text-sm text-mute">
        <li className="flex items-center gap-2"><MapPin size={16} className="shrink-0 text-flame" />{m.district} | {m.venue}</li>
        <li className="flex items-center gap-2 font-semibold text-white"><CalendarClock size={16} className="shrink-0 text-flame" />{m.whenLabel}</li>
      </ul>

      <p className={`w-fit rounded-md px-2.5 py-1 text-xs font-semibold ${s.cls}`}>{s.label}</p>

      <button className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-flame py-3 text-sm font-bold text-flame transition hover:bg-flame hover:text-white">
        <Swords size={16} /> Тоглох хүсэлт илгээх
      </button>
    </article>
  );
}

export function MatchFeed({ matches }: { matches: Match[] }) {
  return (
    <section id="matches" className="scroll-mt-20 border-y border-line bg-ink/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="max-w-2xl font-display text-2xl font-extrabold sm:text-3xl">Сүүлд нэмэгдсэн нөхөрсөг тоглолтын зар</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((m) => <MatchCard key={m.id} m={m} />)}
        </div>
      </div>
    </section>
  );
}
