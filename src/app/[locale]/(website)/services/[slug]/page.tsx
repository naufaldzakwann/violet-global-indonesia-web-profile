import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services as staticServices, getCategoryLabel } from "@/lib/data/services";
import { portfolios } from "@/lib/data/portfolio";
import { getDetailHero } from "@/lib/data/service-images";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";
import { RichTextContent } from "@/components/ui/RichTextContent";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return staticServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const svc = staticServices.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: locale === "id" ? svc.title : svc.titleEn,
    description: locale === "id" ? svc.shortDesc : svc.shortDescEn,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const svc = staticServices.find((s) => s.slug === slug);
  if (!svc) notFound();

  const isId = locale === "id";
  const entry = svc;
  const title = isId ? entry.title : entry.titleEn || entry.title;
  const shortDesc = isId ? entry.shortDesc : entry.shortDescEn || entry.shortDesc;
  const desc = isId
    ? (entry.description || entry.shortDesc)
    : (entry.descriptionEn || entry.shortDescEn || entry.description || entry.shortDesc);
  const features = isId ? (entry.features || []) : (entry.featuresEn || entry.features || []);
  const content = isId ? entry.content : (entry.contentEn ?? entry.content);
  const audience = isId ? (entry.audience || []) : (entry.audienceEn || entry.audience || []);
  const processSteps = entry.process || [];
  const category = entry.category || "default";
  // Layout khusus Consulting: tanpa section "What is", audience dipindah ke bawah produk
  const isConsulting = entry.slug === "consulting";
  // Layout khusus Sustainable Energy Solutions: tanpa paragraf intro di hero, audience di bawah produk
  const isSustainable = entry.slug === "sustainable-energy-solutions";
  const audienceAfterProducts = isConsulting || isSustainable;

  // Proyek portfolio yang relevan dengan kategori layanan ini
  const relevantPortfolio = portfolios.filter((p) => p.category === category).slice(0, 3);

  const audienceSection = audience.length > 0 && (
    <section className="mb-20">
      <AnimateOnView>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          {isId ? "Layanan Ini Cocok untuk Siapa?" : "Who Is This Service For?"}
        </h2>
        <p className="mb-8 text-sm text-slate-400 dark:text-white/40">
          {isId ? "Cocokkan dengan kondisi Anda — kalau salah satu terasa familiar, layanan ini untuk Anda." : "Match it with your situation — if any of these feels familiar, this service is for you."}
        </p>
      </AnimateOnView>
      <div className="grid gap-3 sm:grid-cols-2">
        {audience.map((item, i) => (
          <AnimateOnView key={i} delay={i * 60}>
            <div className="flex h-full items-start gap-3 rounded-2xl border border-slate-100 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                <Icon name="Check" size={13} />
              </div>
              <p className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-200">{item}</p>
            </div>
          </AnimateOnView>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#f8faf9] pt-24 font-sans selection:bg-violet-100 selection:text-violet-900 dark:bg-[#0a0810] dark:text-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">

        {/* BREADCRUMB */}
        <header className="mb-12">
          <AnimateOnView className="mb-10 flex items-center gap-4">
            <Link
              href={`/${locale}/services`}
              className="text-[10px] font-bold uppercase tracking-widest text-violet-600 transition-colors hover:text-slate-900 dark:text-violet-400 dark:hover:text-white"
            >
              ← {isId ? "Layanan" : "Services"}
            </Link>
            <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/40">
              {getCategoryLabel(category, locale)}
            </div>
          </AnimateOnView>

          {/* Hero: judul + penjelasan singkat + CTA */}
          <AnimateOnView delay={100}>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-[0_12px_28px_rgba(124,58,237,0.35)]">
              <Icon name={entry.icon} size={26} strokeWidth={1.75} />
            </div>
            <h1
              className="mb-6 text-4xl font-medium leading-tight tracking-tighter text-slate-950 md:text-6xl dark:text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {title}
            </h1>
            {!isSustainable && (
              <p className="mb-8 max-w-2xl text-lg font-light leading-relaxed text-slate-600 dark:text-slate-300">
                {shortDesc}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(124,58,237,0.35)] transition-all hover:bg-violet-500"
              >
                {isId ? "Konsultasi Gratis" : "Free Consultation"}
                <Icon name="ArrowRight" size={14} />
              </Link>
              {entry.products && entry.products.length > 0 && (
                <a
                  href="#produk"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-600 transition-all hover:border-violet-300 hover:text-violet-700 dark:border-white/15 dark:text-slate-300 dark:hover:border-violet-400/50 dark:hover:text-white"
                >
                  {isId ? "Lihat Produknya" : "See the Products"}
                </a>
              )}
            </div>
          </AnimateOnView>

          {/* Gambar hero */}
          <AnimateOnView delay={200} className="relative mt-10 aspect-[21/9] overflow-hidden rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 dark:border-white/10 dark:shadow-black/40">
            <Image
              src={getDetailHero(entry.slug)}
              alt={title}
              fill
              className="object-cover opacity-90 dark:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/30" />
          </AnimateOnView>
        </header>

        {/* APA ITU LAYANAN INI? — penjelasan bahasa sederhana */}
        {!isConsulting && (
          <section className="mb-20">
            <AnimateOnView>
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                {isId ? `Apa itu ${title}?` : `What is ${title}?`}
              </h2>
              <div className="space-y-6 text-lg font-light leading-relaxed text-slate-600 dark:text-slate-300">
                <RichTextContent
                  value={content}
                  className="portable-text-container prose prose-violet max-w-none prose-p:leading-relaxed dark:prose-invert"
                  fallback={<p>{desc}</p>}
                />
              </div>
            </AnimateOnView>
          </section>
        )}

        {/* COCOK UNTUK SIAPA? — Consulting & Sustainable: dirender setelah produk */}
        {!audienceAfterProducts && audienceSection}

        {/* PRODUK & PLATFORM */}
        {entry.products && entry.products.length > 0 && (
          <section id="produk" className="mb-20 scroll-mt-24">
            <AnimateOnView>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                {isId ? "Produk & Platform di Layanan Ini" : "Products & Platforms in This Service"}
              </h2>
              <p className="mb-8 text-sm text-slate-400 dark:text-white/40">
                {isId ? "Beberapa pilihan yang tersedia — klik untuk melihat detailnya." : "The available options — click to see the details."}
              </p>
            </AnimateOnView>

            <div className="space-y-6">
              {entry.products.map((product, pIdx) => (
                <AnimateOnView key={product.name} delay={pIdx * 60}>
                  <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20 md:p-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                        <Icon name={product.icon} size={26} strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-3">
                          <span className="font-mono text-[10px] font-bold text-violet-400">{String(pIdx + 1).padStart(2, "0")}</span>
                          <h3
                            className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl dark:text-white"
                            style={{ fontFamily: "var(--font-poppins)" }}
                          >
                            {isId ? product.name : product.nameEn}
                          </h3>
                        </div>
                        <p className="mb-4 text-[13px] font-semibold text-violet-600 dark:text-violet-300">
                          {isId ? product.tagline : product.taglineEn}
                        </p>
                        <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-300">
                          {isId ? product.description : product.descriptionEn}
                        </p>

                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {(isId ? product.capabilities : product.capabilitiesEn).map((cap) => (
                            <div key={cap} className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2.5 dark:border-white/5 dark:bg-white/[0.03]">
                              <div className="mt-0.5 shrink-0 text-violet-500 dark:text-violet-300">
                                <Icon name="Check" size={12} />
                              </div>
                              <span className="text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-300">{cap}</span>
                            </div>
                          ))}
                        </div>

                        {product.href && (
                          <Link
                            href={`/${locale}${product.href}`}
                            className="mt-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-700 transition-all hover:border-violet-600 hover:bg-violet-600 hover:text-white dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200 dark:hover:bg-violet-600 dark:hover:text-white"
                          >
                            {isId ? "Lihat Halaman Lengkap" : "View Full Page"}
                            <Icon name="ArrowRight" size={13} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimateOnView>
              ))}
            </div>
          </section>
        )}

        {/* COCOK UNTUK SIAPA? — khusus Consulting & Sustainable, di bawah produk */}
        {audienceAfterProducts && audienceSection}

        {/* CARA KAMI BEKERJA — langkah sederhana */}
        {processSteps.length > 0 && (
          <section className="mb-20">
            <AnimateOnView>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                {isId ? "Cara Kami Bekerja" : "How We Work"}
              </h2>
              <p className="mb-8 text-sm text-slate-400 dark:text-white/40">
                {isId ? "Prosesnya sederhana dan transparan — Anda tahu apa yang terjadi di setiap langkah." : "The process is simple and transparent — you know what happens at every step."}
              </p>
            </AnimateOnView>

            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <AnimateOnView key={i} delay={i * 60}>
                  <div className="flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1.5 text-[16px] font-bold text-slate-900 dark:text-white">
                        {isId ? step.title : step.titleEn}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-300">
                        {isId ? step.desc : step.descEn}
                      </p>
                    </div>
                  </div>
                </AnimateOnView>
              ))}
            </div>
          </section>
        )}

        {/* YANG ANDA DAPATKAN */}
        <section className="mb-20">
          <AnimateOnView>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              {isId ? "Yang Anda Dapatkan" : "What You Get"}
            </h2>
          </AnimateOnView>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((f: string) => (
              <li key={f} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-[13px] text-slate-600 transition-all hover:border-violet-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-violet-400/30">
                <div className="shrink-0 text-violet-600 dark:text-violet-300">
                  <Icon name="Check" size={14} />
                </div>
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* REFERENSI PORTFOLIO */}
        {relevantPortfolio.length > 0 && (
          <section className="border-t border-slate-100 pt-16 dark:border-white/5">
            <AnimateOnView className="mb-10">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40">
                {isId ? "Bukti Kualitas" : "Proof of Excellence"}
              </h2>
              <h3
                className="mb-6 text-3xl font-medium leading-tight tracking-tight text-slate-900 dark:text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {isId ? `Karya ${title} yang Pernah Kami Kerjakan.` : `Successfully delivered ${title} projects.`}
              </h3>
            </AnimateOnView>

            <div className="grid gap-8">
              {relevantPortfolio.map((project, idx) => (
                <AnimateOnView key={project.id} delay={idx * 60}>
                  <Link
                    href={`/${locale}/portfolio/${project.slug}`}
                    className="group grid items-center gap-6 rounded-[2rem] border border-slate-100 p-6 transition-all hover:border-violet-100 hover:bg-violet-50/10 dark:border-white/10 dark:hover:border-violet-400/30 dark:hover:bg-white/[0.03] md:grid-cols-12 md:gap-8"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg md:col-span-4">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="md:col-span-7">
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-violet-400">{project.client}</div>
                      <h4 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
                        {isId ? project.title : project.titleEn}
                      </h4>
                      <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-slate-400 dark:text-slate-400">
                        {isId ? project.problem : project.problemEn}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((t) => (
                          <span key={t} className="rounded-full border border-slate-200 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400 dark:border-white/15 dark:text-white/50">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end pr-4 md:col-span-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-300 transition-all group-hover:border-violet-600 group-hover:text-violet-600 dark:border-white/15 dark:text-white/40 dark:group-hover:border-violet-400 dark:group-hover:text-violet-300">
                        <Icon name="ArrowRight" size={16} />
                      </div>
                    </div>
                  </Link>
                </AnimateOnView>
              ))}
            </div>

            <AnimateOnView delay={300} className="mt-10 text-center">
              <Link
                href={`/${locale}/portfolio`}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-violet-600 dark:hover:text-violet-300"
              >
                {isId ? "Lihat Seluruh Portfolio →" : "View Entire Portfolio →"}
              </Link>
            </AnimateOnView>
          </section>
        )}

        {/* CTA PENUTUP */}
        <section className="mt-20">
          <AnimateOnView>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0810] px-8 py-14 text-center dark:border dark:border-white/10">
              <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />
              <div className="relative">
                <h2
                  className="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {isId ? `Masih ragu ${title} cocok untuk Anda?` : `Not sure ${title} is right for you?`}
                </h2>
                <p className="mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-white/50">
                  {isId
                    ? "Ceritakan kebutuhan Anda — konsultasi pertama gratis, tanpa komitmen apa pun."
                    : "Tell us what you need — the first consultation is free, with no commitment."}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(124,58,237,0.4)] transition-all hover:bg-violet-500"
                >
                  {isId ? "Mulai Konsultasi Gratis" : "Start Free Consultation"}
                  <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            </div>
          </AnimateOnView>
        </section>

        <footer className="mt-16 border-t border-slate-50 pt-10 text-center dark:border-white/5">
          <AnimateOnView className="pointer-events-none select-none opacity-10">
            <span className="text-[9px] font-bold uppercase tracking-[1.5em]">VIOLET GLOBAL INDONESIA • {new Date().getFullYear()}</span>
          </AnimateOnView>
        </footer>

      </div>
    </div>
  );
}
