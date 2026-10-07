import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";
import { services as staticServices } from "@/lib/data/services";
import { serviceFallbackImage, serviceImages } from "@/lib/data/service-images";

const getGraphic = (slug: string) => serviceImages[slug] || serviceFallbackImage;

export async function ServicesSection({ limit, locale }: { limit?: number; locale: string }) {
  const t = await getTranslations("services");

  const services = staticServices.map(s => ({
    ...s,
    title: locale === "id" ? s.title : s.titleEn,
    shortDesc: locale === "id" ? s.shortDesc : s.shortDescEn,
    features: locale === "id" ? s.features : s.featuresEn,
  }));

  const displayed = limit ? services.slice(0, limit) : services;

  return (
    <section className="section-padding bg-white theme-section theme-section-soft">
      <div className="section-container">

        {/* Header */}
        <div className="text-center mb-16">
          <AnimateOnView>
            <span className="badge mb-4">{t("badge")}</span>
          </AnimateOnView>
          <AnimateOnView delay={100}>
            <h2 className="section-title mb-4">{t("title")}</h2>
          </AnimateOnView>
          <AnimateOnView delay={200}>
            <p className="section-subtitle mx-auto">{t("subtitle")}</p>
          </AnimateOnView>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((svc, i) => (
            <AnimateOnView key={svc.id} delay={i * 50} className="h-full">
              <Link
                href={`/${locale}/services/${svc.slug}`}
                className="theme-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:z-10 hover:border-transparent hover:shadow-[0_16px_60px_rgba(100,20,200,0.2)]"
                style={{ minHeight: "260px" }}
              >
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
                  {/* ── Layer 1: Hover State (Dark + Vibrant Image) ── */}
                  <img
                    src={getGraphic(svc.slug)}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] scale-100 group-hover:scale-110"
                  />
                  {/* Dark overlays to ensure white text pops on hover */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* ── Layer 2: Normal State (Clean White) ── */}
                  {/* This solid white blanket fades out on hover to reveal the dark image */}
                  <div className="theme-card-blanket absolute inset-0 bg-white transition-opacity duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0" />
                  
                  {/* Very subtle texture on the white blanket */}
                  <div className="absolute inset-0 opacity-[0.07] transition-opacity duration-[800ms] group-hover:opacity-0 mix-blend-multiply">
                    <img src={getGraphic(svc.slug)} alt="" className="w-full h-full object-cover grayscale" />
                  </div>
                </div>

                {/* ── Main content ── */}
                <div className="relative z-10 flex flex-col justify-between h-full p-10 pb-9">
                  {/* Title */}
                  <h3
                    className="theme-title mt-2 text-[1.75rem] font-semibold leading-tight transition-colors duration-700 group-hover:text-white"
                    style={{ fontFamily: "var(--font-poppins)", maxWidth: "80%" }}
                  >
                    {svc.title}
                  </h3>

                  {/* Learn More */}
                  <div className="flex items-center gap-3 mt-12 mb-1">
                    <div className="theme-rule h-[1px] w-[18px] transition-all duration-700 group-hover:w-8 group-hover:bg-violet-400" />
                    <span className="theme-muted text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-700 group-hover:text-violet-200">
                      {t("learnMore")}
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnView>
          ))}
        </div>

        {/* View All */}
        {limit && (
          <div className="text-center mt-12">
            <Link href={`/${locale}/services`} className="btn-primary">
              {t("allServices")}
              <Icon name="ArrowRight" size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
