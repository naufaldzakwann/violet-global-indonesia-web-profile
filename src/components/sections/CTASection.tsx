import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";

export function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const waUrl = `https://wa.me/6285166415046?text=${encodeURIComponent(
    locale === "id" ? "Halo VGI, saya ingin berkonsultasi." : "Hello VGI, I would like to consult.",
  )}`;

  return (
    <section className="section-padding bg-white theme-section theme-section-soft dark-starfield cta-dark-shell">
      <div className="dark-starfield-overlay" />
      <div className="section-container">
        <div className="dark-starfield relative overflow-hidden rounded-[2rem] border border-violet-500/30 bg-[linear-gradient(145deg,#43206b_0%,#5f2f8c_48%,#4B0082_100%)] shadow-[0_28px_90px_rgba(75,0,130,0.28),0_10px_24px_rgba(15,23,42,0.12)]">
          <div className="dark-starfield-overlay" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)]" />
          <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)]" />
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-violet-300/25 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />

          <div className="relative grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-end lg:px-12 lg:py-12">
            <div className="max-w-3xl">
              <AnimateOnView>
                <div className="mb-6 flex items-center gap-4">
                  <span className="h-px w-12 bg-violet-200/70" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-100/90">
                    Consultation
                  </span>
                </div>
              </AnimateOnView>

              <AnimateOnView delay={100}>
                <h2
                  className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.8rem]"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {t("title")}
                </h2>
              </AnimateOnView>

              <AnimateOnView delay={180}>
                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-violet-100/88 sm:text-base">
                  {t("subtitle")}
                </p>
              </AnimateOnView>

              <AnimateOnView delay={240}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-violet-100/88">
                  <div className="flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-violet-200" />
                    <span>Strategy-first approach</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-sky-200" />
                    <span>{t("phone")}</span>
                  </div>
                </div>
              </AnimateOnView>
            </div>

            <AnimateOnView delay={260}>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[280px]">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-violet-900 shadow-[0_14px_28px_rgba(17,24,39,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-50"
                >
                  {t("primary")}
                  <Icon name="ArrowRight" size={18} />
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/14"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.13 1.533 5.862L0 24l6.304-1.513A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 0 1-5.042-1.393l-.361-.214-3.74.897.94-3.634-.236-.373A9.823 9.823 0 0 1 2.182 12C2.182 6.568 6.568 2.182 12 2.182S21.818 6.568 21.818 12 17.432 21.818 12 21.818z" />
                  </svg>
                  {t("secondary")}
                </a>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </div>
    </section>
  );
}
