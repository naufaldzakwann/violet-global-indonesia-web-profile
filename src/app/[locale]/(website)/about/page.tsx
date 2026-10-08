import { useTranslations, useLocale } from "next-intl";
import { teamMembers, coreValues } from "@/lib/data/general";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";
import { PageHeroDotGrid } from "@/components/ui/PageHeroDotGrid";
import type { Metadata } from "next";

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();
  const missionItems = t.raw("mission.items") as string[];
  const companyOverview = {
    eyebrow: locale === "id" ? "Siapa Kami" : "Who We Are",
    title: locale === "id" ? "Mitra teknologi yang membangun sistem, brand, dan pertumbuhan bisnis." : "A technology partner that builds systems, brands, and business growth.",
    description:
      locale === "id"
        ? "Violet Global Indonesia hadir untuk membantu perusahaan bergerak lebih cepat di era digital melalui solusi yang terukur, rapi, and benar-benar relevan dengan kebutuhan bisnis. Kami tidak hanya membuat output yang terlihat baik, tetapi juga merancang fondasi digital yang kuat untuk operasional, pemasaran, dan pengambilan keputusan."
        : "Violet Global Indonesia helps companies move faster in the digital era through solutions that are measurable, structured, and deeply aligned with business needs. We do not only create polished outputs, but also design strong digital foundations for operations, marketing, and decision-making.",
    points:
      locale === "id"
        ? [
          "Pendekatan kami menggabungkan strategi, desain, dan teknologi dalam satu alur kerja yang lebih efisien.",
          "Setiap solusi disusun agar dapat dipakai jangka panjang, mudah dikembangkan, dan jelas dampaknya untuk bisnis.",
        ]
        : [
          "Our approach combines strategy, design, and technology in one more efficient workflow.",
          "Every solution is built for long-term use, easier growth, and clear business impact.",
        ],
  };

  return (
    <div className="about-page pt-20">
      {/* Centered Spotlight Hero (Original Size with Wave) */}
      <section className="relative overflow-hidden py-24 bg-[#06040a]">
        <PageHeroDotGrid />

        <div className="section-container relative z-10 text-center">
          <AnimateOnView>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-6 bg-violet-500/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400">
                {t("badge")}
              </span>
              <div className="h-px w-6 bg-violet-500/30" />
            </div>
          </AnimateOnView>

          <AnimateOnView delay={100}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.2]">
              <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                {locale === "id" ? "Tentang" : "About"}
              </span>
              <br />
              <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.25)]">
                {locale === "id" ? "Violet Global" : "Violet Global"}
              </span>
            </h1>
          </AnimateOnView>

          <AnimateOnView delay={200}>
            <p className="text-white/50 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </AnimateOnView>
        </div>

        {/* The Curve (Bentuk Melengkung) */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none">
            <path className="page-hero-curve" d="M0 60L1440 60L1440 10C1200 50 720 0 0 40L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Elegant Company Overview */}
      <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimateOnView>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3">
                  <span className="h-px w-10 bg-violet-600/30" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
                    {companyOverview.eyebrow}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                  {companyOverview.title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-violet-300 rounded-full" />
              </div>
            </AnimateOnView>

            <AnimateOnView delay={150}>
              <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                <p>{companyOverview.description}</p>
                <div className="grid gap-4 pt-4 border-t border-slate-100">
                  {companyOverview.points.map((point, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                        <Icon name="Check" size={14} />
                      </div>
                      <p className="flex-1 text-base leading-relaxed text-slate-600">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Vision & Mission (Architectural Design) */}
      <section className="bg-slate-50 py-32 sm:py-48 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <div className="text-[20vw] font-bold absolute -top-10 -left-10 leading-none">PURPOSE</div>
          <div className="text-[20vw] font-bold absolute -bottom-10 -right-10 leading-none">ACTION</div>
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Vision - The Foundation (Spans 5 columns) */}
            <AnimateOnView className="lg:col-span-12 xl:col-span-5">
              <div className="h-full bg-white border border-slate-200/60 p-10 sm:p-14 relative overflow-hidden group">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-violet-600 transition-all duration-700" />

                <div className="relative z-10">
                  <div className="mb-14 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center text-violet-600">
                      <Icon name="Eye" size={24} />
                    </div>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  <span className="block text-xs font-bold uppercase tracking-[0.4em] text-violet-600 mb-6">
                    {locale === "id" ? "Visi" : "Vision"}
                  </span>

                  <h3 className="text-4xl sm:text-5xl font-light text-slate-900 leading-[1.1] mb-8" style={{ fontFamily: "var(--font-poppins)" }}>
                    {t("vision.title")}<span className="text-violet-600">.</span>
                  </h3>

                  <p className="text-lg text-slate-500 leading-relaxed max-w-md">
                    {t("vision.text")}
                  </p>
                </div>
              </div>
            </AnimateOnView>

            {/* Mission - The Execution (Spans 7 columns) */}
            <AnimateOnView delay={150} className="lg:col-span-12 xl:col-span-7">
              <div className="h-full bg-[#0a0810] p-10 sm:p-14 border border-white/5 relative overflow-hidden group">
                {/* Interactive Light Beam */}
                <div className="absolute -top-1/2 -left-1/2 w-full h-[200%] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="relative z-10 grid sm:grid-cols-2 gap-12">
                  <div className="sm:col-span-2">
                    <span className="block text-xs font-bold uppercase tracking-[0.4em] text-violet-400 mb-6">
                      {locale === "id" ? "Misi" : "Mission"}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-10 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                      {t("mission.title")}
                    </h3>
                  </div>

                  {missionItems.map((item, i) => (
                    <div key={i} className="space-y-4 border-l border-white/10 pl-6 hover:border-violet-500 transition-colors duration-300">
                      <span className="text-[10px] font-mono text-violet-500/50">0{i + 1}</span>
                      <p className="text-sm sm:text-base leading-relaxed text-white/70 italic group-hover:text-white/90 transition-colors">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Core Values (Elegant Minimalist) */}
      <section className="bg-white py-24 sm:py-36 relative border-t border-slate-100">
        <div className="section-container">
          <div className="max-w-2xl mb-24">
            <AnimateOnView>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-violet-600 mb-6 block">
                {locale === "id" ? "Nilai & Budaya" : "Values & Culture"}
              </span>
              <h2 className="text-4xl sm:text-5xl font-medium text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                {t("values")}
              </h2>
            </AnimateOnView>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {coreValues.map((val, i) => (
              <AnimateOnView key={val.title} delay={i * 100}>
                <div className="flex flex-col h-full group">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[10px] font-mono text-violet-500/60 font-bold tracking-widest">
                      0{i + 1}
                    </span>
                    <div className="h-px flex-1 bg-slate-100 group-hover:bg-violet-200 transition-colors" />
                  </div>
                  
                  <div className="mb-6 text-violet-600">
                    <Icon name={val.icon} size={20} strokeWidth={1.5} />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                    {locale === "id" ? val.title : val.titleEn}
                  </h4>
                  
                  <p className="text-slate-500 leading-relaxed text-sm sm:text-base font-light">
                    {locale === "id" ? val.desc : val.descEn}
                  </p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Management Team */}
      <section className="bg-slate-50 py-24 sm:py-32 border-t border-slate-200/60 relative overflow-hidden">
        {/* Abstract background */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />

        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24">
            <div className="max-w-2xl">
              <AnimateOnView>
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-violet-600/30" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
                    Management
                  </span>
                </div>
              </AnimateOnView>
              <AnimateOnView delay={100}>
                <h2 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                  {t("team.title")}
                </h2>
              </AnimateOnView>
            </div>
            <AnimateOnView delay={200}>
              <p className="text-lg text-slate-500 max-w-md">
                {t("team.subtitle")}
              </p>
            </AnimateOnView>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member, i) => {
              const nameParts = member.name.split(" ");
              const initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();

              return (
                <AnimateOnView key={member.id} delay={i * 100}>
                  <div className="group relative bg-white rounded-2xl px-8 py-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col items-center justify-center text-center">
                    {/* Monogram Inisial - pengganti foto */}
                    <div className="relative mb-7">
                      <div className="absolute -inset-2 rounded-full border border-violet-100 group-hover:border-violet-300/70 transition-colors duration-500" />
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-violet-800 flex items-center justify-center shadow-lg shadow-violet-500/25 transition-transform duration-500 group-hover:scale-105">
                        <span className="text-2xl font-bold text-white tracking-widest" style={{ fontFamily: "var(--font-poppins)" }}>
                          {initials}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mb-4 tracking-tight leading-snug" style={{ fontFamily: "var(--font-poppins)" }}>
                      {member.name}
                    </h4>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="h-px w-6 bg-violet-200" />
                      <span className="h-1 w-1 rounded-full bg-violet-400" />
                      <span className="h-px w-6 bg-violet-200" />
                    </div>

                    <p className="text-violet-600 text-[11px] font-semibold uppercase tracking-[0.15em]">
                      {locale === "id" ? member.position : member.positionEn}
                    </p>
                  </div>
                </AnimateOnView>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
