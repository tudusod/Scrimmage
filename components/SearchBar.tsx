"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { DATE_OPTIONS, GRADES, type District } from "@/lib/data";

const fieldCls =
  "w-full rounded-xl border border-line bg-court px-4 py-3 text-sm font-medium text-white focus:border-flame";

export function SearchBar({ districts }: { districts: District[] }) {
  const router = useRouter();
  const [district, setDistrict] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState<string>(DATE_OPTIONS[0]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ district, grade, date });
    router.push(`/matches?${q.toString()}`);
  };

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <form
          onSubmit={onSubmit}
          className="grid gap-4 rounded-2xl border border-line bg-ink p-4 shadow-[0_0_60px_-20px_#ff5722] sm:grid-cols-2 sm:p-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-mute">Дүүрэг</span>
            <select className={fieldCls} value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">Бүх дүүрэг</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-mute">Насны ангилал</span>
            <select className={fieldCls} value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="">Бүх анги</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-mute">Огноо</span>
            <select className={fieldCls} value={date} onChange={(e) => setDate(e.target.value)}>
              {DATE_OPTIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-flame px-6 py-3 font-bold text-white transition hover:bg-flame-soft sm:col-span-2 lg:col-span-1"
          >
            <Search size={18} /> Өрсөлдөгч хайх
          </button>
        </form>
      </div>
    </section>
  );
}