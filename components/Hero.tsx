function CourtLines() {
  return (
    <svg viewBox="0 0 500 470" aria-hidden className="pointer-events-none absolute -right-24 top-6 h-[34rem] w-auto text-flame opacity-40 [filter:drop-shadow(0_0_6px_#ff5722)] lg:right-0 lg:opacity-60">
      <g fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect className="court-line" x="10" y="10" width="480" height="450" />
        <rect className="court-line" x="170" y="10" width="160" height="190" />
        <path className="court-line" d="M170 200 A80 80 0 0 0 330 200" />
        <path d="M170 200 A80 80 0 0 1 330 200" strokeDasharray="8 10" />
        <path className="court-line" d="M50 10 V120 A200 200 0 0 0 450 120 V10" />
        <path className="court-line" d="M190 460 A60 60 0 0 1 310 460" />
        <circle cx="250" cy="52" r="10" />
        <path d="M220 30 H280" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,rgba(255,87,34,0.22),transparent),radial-gradient(40%_40%_at_0%_100%,rgba(255,87,34,0.10),transparent)]" />
      <CourtLines />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
        <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-[1.2] sm:text-5xl">
          Сургуулийнхаа багт тохирох өрсөлдөгчийг 1 минутад ол.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
          Монголын анхны сургууль хоорондын нөхөрсөг тоглолт (Scrimmage) болон заал хуваалцах нэгдсэн платформ.
        </p>
      </div>
    </section>
  );
}