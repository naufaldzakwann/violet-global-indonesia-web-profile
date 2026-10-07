import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { e3iRegenx } from "@/lib/data/green-energy";
import { Icon } from "@/components/ui/Icon";

type Locale = "id" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";
  return {
    title: isId
      ? "E3i RegenX — Plastics-to-Fuel | Violet Global Indonesia"
      : "E3i RegenX — Plastics-to-Fuel | Violet Global Indonesia",
    description: isId ? e3iRegenx.description : e3iRegenx.descriptionEn,
  };
}

export default async function RegenxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "id";
  const isId = locale === "id";
  const d = e3iRegenx;

  const pick = <T,>(id: T, en: T) => (isId ? id : en);

  return (
    <div className="regenx-page pt-20">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07231a] text-white">
        <Image
          src={d.heroImage}
          alt={pick("Fasilitas E3i RegenX", "E3i RegenX facility")}
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_55%),linear-gradient(180deg,rgba(4,20,15,0.82),rgba(4,20,15,0.92))]" />

        <div className="section-container relative z-10 py-24">
          {/* breadcrumb */}
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
            <Link href={`/${locale}/home`} className="transition-colors hover:text-emerald-300">
              {pick("Beranda", "Home")}
            </Link>
            <Icon name="ChevronRight" size={12} className="text-white/25" />
            <span>{pick("Green Energy", "Green Energy")}</span>
            <Icon name="ChevronRight" size={12} className="text-white/25" />
            <span className="text-emerald-400">E3i RegenX</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-emerald-500/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400">
                  {d.tagline}
                </span>
                <div className="h-px w-6 bg-emerald-500/40" />
              </div>

              <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-6xl" style={{ fontFamily: "var(--font-poppins)" }}>
                {pick("E3i RegenX", "E3i RegenX")}
                <span className="mt-2 block bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-2xl text-transparent sm:text-4xl">
                  {pick("Plastics-to-Fuel", "Plastics-to-Fuel")}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-white/60 sm:text-lg">
                {d.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-emerald-200">
                  <Icon name="MapPin" size={14} />
                  {pick(d.location, d.locationEn)}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70">
                  {pick("20 Ton per Hari", "20 Metric tons per day")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70">
                  {pick("Fasilitas Dua Modul", "Two-module facility")}
                </span>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#052017] shadow-[0_14px_30px_rgba(16,185,129,0.28)] transition-all duration-300 hover:bg-emerald-400"
                >
                  {pick("Diskusikan Program Ini", "Discuss the program")}
                </Link>
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                  {pick("Indonesia · Program Unggulan", "Indonesia · Flagship program")}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
                <Image
                  src={d.posterImage}
                  alt={pick(
                    "Poster program E3i RegenX Plastics-to-Fuel",
                    "E3i RegenX Plastics-to-Fuel program poster",
                  )}
                  width={853}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="h-[60px] w-full">
            <path d="M0 60L1440 60L1440 10C1200 50 720 0 0 40L0 60Z" className="fill-[#f8faf9] dark:fill-[#0a0810]" />
          </svg>
        </div>
      </section>

      {/* Program snapshot strip */}
      <section className="bg-[#f8faf9] pb-4 text-slate-900 dark:bg-[#0a0810] dark:text-white">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/50 sm:grid-cols-3 lg:grid-cols-6 dark:border-white/10 dark:bg-white/10">
            {d.stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 bg-[#f8faf9] px-5 py-6 dark:bg-[#0d0b15]"
              >
                <span className="text-2xl font-bold text-emerald-700 tracking-tight dark:text-emerald-400" style={{ fontFamily: "var(--font-poppins)" }}>
                  {pick(stat.value, stat.valueEn)}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-emerald-300/80">
                  {pick(stat.unit, stat.unitEn)}
                </span>
                <span className="text-[11px] leading-4 text-slate-500">
                  {pick(stat.label, stat.labelEn)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="bg-[#f8faf9] py-24 text-slate-900 dark:bg-[#0a0810] dark:text-white">
        <div className="section-container grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-emerald-600/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">
                {pick("Tantangan", "The challenge")}
              </span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl" style={{ fontFamily: "var(--font-poppins)" }}>
              {pick(d.challenge.title, d.challenge.titleEn)}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {pick(d.challenge.text, d.challenge.textEn)}
            </p>
          </div>
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 shadow-[0_24px_50px_rgba(15,23,42,0.10)] dark:border-white/10">
              <Image
                src={d.challenge.image}
                alt={pick(d.challenge.imageAlt, d.challenge.imageAltEn)}
                width={1280}
                height={960}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-2 text-[10px] leading-4 text-slate-500 dark:text-white/35">
              {d.challenge.credit}
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-t border-slate-100 bg-white py-24 text-slate-900 dark:border-white/5 dark:bg-[#0d0b15] dark:text-white">
        <div className="section-container">
          <div className="mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-emerald-600/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">
                {pick("Solusi Kami", "Our solution")}
              </span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl" style={{ fontFamily: "var(--font-poppins)" }}>
              {pick(d.solution.title, d.solution.titleEn)}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {pick(d.solution.text, d.solution.textEn)}
            </p>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 shadow-[0_24px_48px_rgba(15,23,42,0.10)] dark:border-white/10">
              <Image
                src={d.solution.image}
                alt={pick(
                  "Ruang kerja rekayasa proses untuk program E3i RegenX plastics-to-fuel",
                  "Process engineering laboratory for the E3i RegenX plastics-to-fuel program",
                )}
                width={1600}
                height={1067}
                className="h-auto w-full"
              />
            </div>

            {/* Process flow */}
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              {d.solution.steps.map((step, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-4 sm:flex-row">
                  <div className="flex-1 rounded-2xl border border-slate-200/80 bg-slate-50 p-5 text-center dark:border-white/10 dark:bg-white/5">
                    <span className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold leading-5 text-slate-800 dark:text-slate-100">
                      {pick(step.title, step.titleEn)}
                    </p>
                  </div>
                  {i < d.solution.steps.length - 1 && (
                    <Icon name="ArrowRight" size={18} className="rotate-90 text-emerald-600 sm:rotate-0 dark:text-emerald-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Target plastics */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-[#f8faf9] p-8 dark:border-white/10 dark:bg-white/[0.03]">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                {pick(d.targetPlastics.title, d.targetPlastics.titleEn)}
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {d.targetPlastics.items.map((p) => (
                  <div key={p.name} className="rounded-xl bg-emerald-600/10 px-4 py-3 text-center">
                    <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{p.code}</span>
                    <span className="ml-2 font-semibold text-emerald-800 dark:text-emerald-300">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-rose-200/70 bg-rose-50 p-8 dark:border-rose-500/20 dark:bg-rose-500/[0.06]">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-xs font-bold text-white line-through decoration-2">3</span>
                <span className="font-semibold text-rose-700 dark:text-rose-300">PVC — {pick("tidak dapat diolah", "cannot be processed")}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-rose-700/90 dark:text-rose-200/70">
                {pick(d.targetPlastics.excludedNote, d.targetPlastics.excludedNoteEn)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTPUT + BUSINESS MODEL */}
      <section className="bg-[#f8faf9] py-24 text-slate-900 dark:bg-[#0a0810] dark:text-white">
        <div className="section-container grid gap-8 lg:grid-cols-2">
          {/* Final output */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-8 shadow-[0_20px_44px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-white/[0.04] sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">
              {pick("Hasil Akhir", "Final output")}
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl" style={{ fontFamily: "var(--font-poppins)" }}>
              {pick(d.output.title, d.output.titleEn)}
            </h3>
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-300/40 px-4 py-2 text-sm font-bold text-amber-900 dark:bg-amber-400/15 dark:text-amber-300">
              {pick(d.output.label, d.output.labelEn)}
            </div>
            <ul className="mt-8 space-y-4">
              {d.output.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">
                    <Icon name="Check" size={13} />
                  </span>
                  <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {pick(point.text, point.textEn)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Business model */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-8 shadow-[0_20px_44px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-white/[0.04] sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl" style={{ fontFamily: "var(--font-poppins)" }}>
              {pick(d.businessModel.title, d.businessModel.titleEn)}
            </h3>
            <div className="mt-8 space-y-6">
              {d.businessModel.items.map((item, i) => (
                <div key={i} className="border-l-2 border-emerald-600/50 pl-5">
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {i + 1}. {pick(item.title, item.titleEn)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {pick(item.text, item.textEn)}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-slate-100 pt-5 text-sm font-medium text-emerald-700 dark:border-white/10 dark:text-emerald-400">
              {pick(d.businessModel.note, d.businessModel.noteEn)}
            </p>
          </div>
        </div>

        {/* Financials */}
        <div className="section-container mt-8">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-8 shadow-[0_20px_44px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-white/[0.04] sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl" style={{ fontFamily: "var(--font-poppins)" }}>
              {pick(d.financials.title, d.financials.titleEn)}
            </h3>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <tbody>
                  {d.financials.rows.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                      <th scope="row" className="py-4 pr-4 font-medium text-slate-700 dark:text-slate-200">
                        {pick(row.term, row.termEn)}
                      </th>
                      <td className="py-4 text-right text-base font-bold text-slate-900 dark:text-white">
                        {pick(row.value, row.valueEn)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-xs italic leading-relaxed text-slate-500 dark:text-slate-400">
              {pick(d.financials.note, d.financials.noteEn)}
            </p>
          </div>
        </div>

        {/* Positive impact */}
        <div className="section-container mt-8">
          <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-emerald-700/[0.07] to-transparent p-8 dark:border-white/10 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl" style={{ fontFamily: "var(--font-poppins)" }}>
              {pick(d.impact.title, d.impact.titleEn)}
            </h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {d.impact.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-white/70 p-4 dark:bg-white/[0.03]">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-400">
                    <Icon name="Check" size={14} />
                  </span>
                  <p className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {pick(item.title, item.titleEn)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative overflow-hidden py-28 text-white">
        <Image
          src={d.closing.image}
          alt={pick("Lanskap pedesaan Indonesia saat fajar", "Indonesian rural landscape at dawn")}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(4,26,19,0.92),rgba(4,26,19,0.55))]" />
        <div className="section-container relative z-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Banyumas, {pick("Jawa Tengah", "Central Java")}
          </span>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-poppins)" }}>
            {pick(d.closing.title, d.closing.titleEn)}
          </h2>
          <Link
            href={`/${locale}/contact`}
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-900 shadow-[0_16px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-emerald-50"
          >
            {pick("Diskusikan Program Ini", "Discuss the program")}
            <Icon name="ArrowRight" size={15} />
          </Link>
          <p className="mt-16 text-[10px] uppercase tracking-[0.2em] text-white/40">
            {d.photosCredit}
          </p>
        </div>
      </section>
    </div>
  );
}
