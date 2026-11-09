import { ArrowUpRight, MapPin } from "lucide-react";
import type { District } from "@/lib/data";

export function DistrictGrid({ districts }: { districts: District[] }) {
  return (
    <section id="districts" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
      <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Байршлаар шүүх</h2>
      <p className="mt-3 text-mute">Өөрийн дүүргийн багуудыг шууд үз.</p>

      <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {districts.map((d) => (
          <li key={d.id}>
            <a href={`/matches?district=${d.id}`} className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-ink p-5 transition hover:border-flame hover:shadow-[0_0_40px_-12px_#ff5722] sm:p-6">
              <div className="flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-flame/15 text-flame"><MapPin size={20} /></span>
                <ArrowUpRight size={20} className="text-mute transition group-hover:text-flame" />
              </div>
              <div>
                <h3 className="font-display text-base font-extrabold sm:text-lg">{d.name} дүүрэг</h3>
                <p className="mt-1 text-sm text-mute"><span className="font-bold text-flame">{d.activeTeams}</span> идэвхтэй баг</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
