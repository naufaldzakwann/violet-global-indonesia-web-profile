import Link from "next/link";
import type { Metadata } from "next";
import { PageHeroDotGrid } from "@/components/ui/PageHeroDotGrid";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";

type Locale = "id" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const isId = rawLocale !== "en";
  return {
    title: isId
      ? "Integrated Smart Waste Management | Violet Global Indonesia"
      : "Integrated Smart Waste Management | Violet Global Indonesia",
    description: isId
      ? "Solusi manajemen, infrastruktur, dan pengolahan sampah pintar — dari perencanaan TPST/TPA, konsultasi, teknologi Smart Bin & IoT, hingga program pemberdayaan masyarakat."
      : "Management, infrastructure, and smart waste processing solutions — from TPST/TPA planning and consultation to Smart Bin & IoT technology and community empowerment programs.",
  };
}

export default async function SmartWasteManagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "id";
  const isId = locale === "id";
  const pick = <T,>(id: T, en: T) => (isId ? id : en);

  const solutions = [
    {
      icon: "Building2",
      title: pick(
        "Perencanaan, Konsultasi & Pembangunan Infrastruktur Pengolahan Sampah (TPST/TPA)",
        "Planning, Consultation, and Waste Processing Infrastructure Development (TPST/TPA)",
      ),
    },
    {
      icon: "BarChart3",
      title: pick(
        "Konsultasi Manajemen Operasional & Studi Kelayakan Pengelolaan Sampah",
        "Operational Management Consultation & Waste Management Feasibility Study",
      ),
    },
    {
      icon: "Handshake",
      title: pick(
        "Penyelarasan Skema Kerja dengan Pemerintah & Badan Usaha (KPBU)",
        "Work Scheme Alignment with Government & Business Entities (KPBU)",
      ),
    },
    {
      icon: "Recycle",
      title: pick(
        "Pengembangan Fasilitas Pemilahan, Daur Ulang & Ekonomi Sirkular Berkelanjutan",
        "Development of Sorting Facilities, Recycling & Sustainable Circular Economy",
      ),
    },
    {
      icon: "Cpu",
      title: pick(
        "Implementasi Teknologi Smart Bin & Sistem Monitoring Armada berbasis IoT",
        "Smart Bin Technology Implementation & IoT-based Fleet Monitoring System",
      ),
    },
    {
      icon: "TrendingUp",
      title: pick(
        "Dashboard Analitik untuk Pengawasan & Kepatuhan Lingkungan",
        "Analytics Dashboard for Environmental Supervision & Compliance",
      ),
    },
    {
      icon: "GraduationCap",
      title: pick(
        "Program Edukasi, Sosialisasi & Pemberdayaan Masyarakat Berkelanjutan",
        "Community Education, Socialization & Sustainable Empowerment Programs",
      ),
    },
  ];

  const capabilities = [
    {
      icon: "Monitor",
      title: pick("Pemantauan Real-Time", "Real-Time Monitoring"),
      desc: pick(
        "Kondisi fasilitas, armada, dan volume sampah terpantau dalam satu dashboard terpadu.",
        "Facility conditions, fleets, and waste volumes monitored in one unified dashboard.",
      ),
    },
    {
      icon: "Lightbulb",
      title: pick("Insight Berbasis AI", "AI-Powered Insight"),
      desc: pick(
        "Analitik data mengubah operasi harian menjadi rekomendasi yang dapat ditindaklanjuti.",
        "Data analytics turns daily operations into actionable recommendations.",
      ),
    },
    {
      icon: "ShieldCheck",
      title: pick("Kepatuhan Lingkungan", "Environmental Compliance"),
      desc: pick(
        "Dukungan pelaporan dan pengawasan agar operasi sesuai regulasi yang berlaku.",
        "Reporting and supervision support to keep operations aligned with regulations.",
      ),
    },
    {
      icon: "Users",
      title: pick("Pemberdayaan Masyarakat", "Community Empowerment"),
      desc: pick(
        "Edukasi dan sosialisasi berkelanjutan agar program diterima dan dijaga bersama.",
        "Continuous education and socialization so programs are embraced and sustained.",
      ),
    },
  ];

  return (
    <div className="smart-waste-page pt-20">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#06040a] text-white">
        <PageHeroDotGrid />

        <div className="section-container relative z-10 py-24">
          {/* breadcrumb */}
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
            <Link href={`/${locale}/home`} className="transition-colors hover:text-emerald-300">
              {pick("Beranda", "Home")}
            </Link>
            <Icon name="ChevronRight" size={12} className="text-white/25" />
            <span className="text-emerald-400">{pick("Smart Waste Management", "Smart Waste Management")}</span>
          </nav>

          <div className="max-w-3xl">
            <AnimateOnView>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-emerald-500/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400">
                  {pick("Green Infrastructure", "Green Infrastructure")}
                </span>
                <div className="h-px w-6 bg-emerald-500/40" />
              </div>
            </AnimateOnView>

            <AnimateOnView delay={100}>
              <h1
                className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Integrated Smart
                <span className="block bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                  Waste Management
                </span>
              </h1>
            </AnimateOnView>

            <AnimateOnView delay={200}>
              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/60 sm:text-lg">
                {pick(
                  "Manajemen, infrastruktur, & solusi pengolahan sampah pintar — dari perencanaan dan konsultasi hingga pembangunan infrastruktur, teknologi pintar, dan pemberdayaan masyarakat.",
                  "Management, infrastructure, & smart waste processing solutions — from planning and consultation to infrastructure development, smart technology, and community empowerment.",
                )}
              </p>
            </AnimateOnView>

            <AnimateOnView delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-emerald-200">
                  TPST / TPA
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70">
                  Smart Bin & IoT
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70">
                  {pick("Ekonomi Sirkular", "Circular Economy")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70">
                  KPBU / PPP
                </span>
              </div>
            </AnimateOnView>

            <AnimateOnView delay={400}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#052017] shadow-[0_14px_30px_rgba(16,185,129,0.28)] transition-all duration-300 hover:bg-emerald-400"
                >
                  {pick("Konsultasikan Kebutuhan Anda", "Discuss Your Needs")}
                </Link>
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                  {pick("Pemerintah · Korporasi · Kawasan Industri", "Government · Corporates · Industrial Zones")}
                </span>
              </div>
            </AnimateOnView>
          </div>
        </div>

        {/* The Curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="h-[60px] w-full">
            <path d="M0 60L1440 60L1440 10C1200 50 720 0 0 40L0 60Z" className="fill-[#f8faf9] dark:fill-[#0a0810]" />
          </svg>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="bg-[#f8faf9] py-24 text-slate-900 dark:bg-[#0a0810] dark:text-white">
        <div className="section-container">
          <div className="mb-14 max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-emerald-600/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">
                {pick("Lingkup Layanan", "Scope of Services")}
              </span>
            </div>
            <h2
              className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {pick(
                "Solusi Terpadu dari Hulu ke Hilir",
                "End-to-End Integrated Solutions",
              )}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {pick(
                "Kami mendampingi pemerintah, badan usaha, dan kawasan industri dalam membangun sistem pengelolaan sampah yang modern, terukur, dan berkelanjutan.",
                "We partner with governments, businesses, and industrial zones to build modern, measurable, and sustainable waste management systems.",
              )}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item, i) => (
              <AnimateOnView key={i} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_18px_40px_rgba(16,185,129,0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-emerald-400/40">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:text-emerald-400">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <span className="mb-3 block text-[10px] font-mono font-bold tracking-widest text-emerald-600/60 dark:text-emerald-400/50">
                    0{i + 1}
                  </span>
                  <p className="text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
                    {item.title}
                  </p>
                </div>
              </AnimateOnView>
            ))}

            {/* Highlight card fills the 8th grid slot */}
            <AnimateOnView delay={560}>
              <div className="h-full rounded-2xl border border-emerald-600/30 bg-gradient-to-br from-emerald-600/10 to-transparent p-7 dark:border-emerald-400/20">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Icon name="Recycle" size={20} />
                </div>
                <h3
                  className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {pick("Smart Waste & Circular Economy Hub", "Smart Waste & Circular Economy Hub")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {pick(
                    "Infrastruktur terpadu untuk pemilahan, daur ulang, pengolahan sampah organik, dan pemulihan sumber daya dengan pengawasan lingkungan berbasis digital.",
                    "Integrated sorting, recycling, organic waste treatment and resource-recovery infrastructure with digital environmental supervision.",
                  )}
                </p>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="border-t border-slate-100 bg-white py-24 text-slate-900 dark:border-white/5 dark:bg-[#0d0b15] dark:text-white">
        <div className="section-container">
          <div className="mb-14 max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-emerald-600/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">
                {pick("Pendekatan Kami", "Our Approach")}
              </span>
            </div>
            <h2
              className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {pick("Teknologi yang Menghubungkan Setiap Tahap", "Technology Connecting Every Stage")}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, i) => (
              <AnimateOnView key={i} delay={i * 80}>
                <div className="h-full rounded-2xl border border-slate-200/80 bg-[#f8faf9] p-7 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">
                    <Icon name={cap.icon} size={18} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {cap.desc}
                  </p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden py-28 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#04170f_0%,#07231a_55%,#04170f_100%)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16)_0%,transparent_70%)] blur-3xl" />
        <div className="section-container relative z-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
            {pick("Mari Berkolaborasi", "Let's Collaborate")}
          </span>
          <h2
            className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {pick(
              "Bangun Sistem Pengelolaan Sampah Masa Depan, Bersama Kami",
              "Build Tomorrow's Waste Management System With Us",
            )}
          </h2>
          <Link
            href={`/${locale}/contact`}
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-900 shadow-[0_16px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-emerald-50"
          >
            {pick("Hubungi Kami", "Contact Us")}
            <Icon name="ArrowRight" size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
