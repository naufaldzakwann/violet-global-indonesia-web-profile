import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { services as staticServices } from "@/lib/data/services";
import { serviceFallbackImage, serviceImages } from "@/lib/data/service-images";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";
import { PageHeroDotGrid } from "@/components/ui/PageHeroDotGrid";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";
import type { Service } from "@/types";

type LocalizedServiceCard = Service & {
  description: string;
  features: string[];
  title: string;
};

export const metadata: Metadata = {
  title: "Layanan / Services",
  description: "Temukan semua layanan IT & digital dari Violet Global Indonesia â€” Web Development, Cybersecurity, Digital Marketing, Data Analytics, dan lebih banyak lagi.",
};

const getGraphic = (slug: string) => serviceImages[slug] || serviceFallbackImage;

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("services");

  const services: LocalizedServiceCard[] = staticServices.map((s) => ({
    ...s,
    title: locale === "id" ? s.title : s.titleEn,
    description: locale === "id" ? s.description : s.descriptionEn,
    features: locale === "id" ? s.features : s.featuresEn,
  }));

  return (
    <main className="services-page service-atmosphere pt-20">
      <section className="relative overflow-hidden py-24 bg-[#06040a]">
        <PageHeroDotGrid />

        <div className="section-container relative z-10 text-center">
          <AnimateOnView>
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-6 bg-violet-500/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400">
                {t("badge")}
              </span>
              <div className="h-px w-6 bg-violet-500/30" />
            </div>
          </AnimateOnView>

          <AnimateOnView delay={100}>
            <h1 className="mb-6 text-4xl font-bold leading-[1.2] tracking-tight md:text-6xl">
              <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                {locale === "id" ? "Layanan" : "Our"}
              </span>
              <br />
              <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.25)]">
                {locale === "id" ? "Violet Global" : "Services"}
              </span>
            </h1>
          </AnimateOnView>

          <AnimateOnView delay={200}>
            <p className="mx-auto max-w-xl text-base font-medium leading-relaxed text-white/50 md:text-lg">
              {t("subtitle")}
            </p>
          </AnimateOnView>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none">
            <path className="page-hero-curve" d="M0 60L1440 60L1440 10C1200 50 720 0 0 40L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      <div className="relative subtle-grid-theme service-atmosphere-sections">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html[data-theme="light"] .subtle-grid-theme section {
                background-image:
                  linear-gradient(rgba(124, 58, 237, 0.025) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(124, 58, 237, 0.025) 1px, transparent 1px) !important;
                background-size: 80px 80px !important;
                background-position: center top !important;
              }

              html[data-theme="dark"] .subtle-grid-theme section {
                background-image: none !important;
              }
            `,
          }}
        />

        <section className="relative bg-slate-50 section-padding">
          <div className="section-container">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((svc, i) => (
                <AnimateOnView key={svc.id || svc.slug || i} delay={i * 60} className="h-full">
                  <Link
                    href={`/${locale}/services/${svc.slug}`}
                    className="group relative flex h-full min-h-[440px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200/10 bg-slate-900 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:border-violet-500/30 hover:z-10 hover:shadow-[0_16px_60px_rgba(100,20,200,0.2)]"
                  >
                    <div className="absolute inset-0 bg-slate-950">
                      <img
                        src={getGraphic(svc.slug)}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center opacity-60 transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/20" />
                      <div className="absolute inset-0 bg-violet-500/15 opacity-0 mix-blend-color-dodge transition-opacity duration-700 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
                      <div className="mt-auto flex flex-col">
                        <h3
                          className="mb-4 text-[1.65rem] font-bold leading-[1.3] tracking-tight text-white transition-colors duration-500 group-hover:text-violet-50"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {svc.title}
                        </h3>

                        <p className="mb-8 line-clamp-3 text-[14px] font-light leading-relaxed text-slate-400 transition-colors duration-500 group-hover:text-white/90">
                          {svc.description}
                        </p>

                        <div className="flex items-center gap-4 border-t border-white/10 pt-6 transition-colors duration-500 group-hover:border-violet-500/30">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-300 transition-colors duration-500 group-hover:text-white">
                            {t("learnMore")}
                          </span>

                          <div className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-violet-500 group-hover:bg-violet-600 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                            <Icon name="ArrowRight" size={14} className="text-white transition-transform duration-500 group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnView>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </main>
  );
}
