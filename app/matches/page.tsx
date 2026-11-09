import { Suspense } from "react";
import Link from "next/link";
import { MatchCard } from "@/components/MatchFeed";
import { getMatches } from "@/lib/data";

type Props = {
  searchParams: Promise<{ district?: string; grade?: string; date?: string }>;
};

async function MatchResults({ searchParams }: Props) {
  const filters = await searchParams;
  const matches = await getMatches(filters);

  if (matches.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-line bg-ink p-8 text-center">
        <p className="font-bold">Таны сонгосон нөхцөлд тохирох зар олдсонгүй.</p>
        <p className="mt-2 text-mute">Өөр дүүрэг, огноо сонгож үзнэ үү.</p>
        <Link
          href="/matches"
          className="mt-6 inline-block rounded-xl bg-flame px-6 py-3 font-bold text-white transition hover:bg-flame-soft"
        >
          Шүүлтүүр цэвэрлэх
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mt-3 text-mute">{matches.length} зар олдлоо</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((m) => (
          <MatchCard key={m.id} m={m} />
        ))}
      </div>
    </>
  );
}

function ResultsSkeleton() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-56 animate-pulse rounded-2xl border border-line bg-ink" />
      ))}
    </div>
  );
}

export default function MatchesPage({ searchParams }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold">Нөхөрсөг тоглолтууд</h1>
      <Suspense fallback={<ResultsSkeleton />}>
        <MatchResults searchParams={searchParams} />
      </Suspense>
    </section>
  );
}