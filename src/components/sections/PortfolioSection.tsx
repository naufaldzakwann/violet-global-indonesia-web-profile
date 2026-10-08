import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { portfolios as allPortfolios } from "@/lib/data/portfolio";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";

export async function PortfolioSection({ limit, locale }: { limit?: number; locale: string }) {
  const t = await getTranslations("portfolio");

  const portfolios = allPortfolios.map((project) => ({
    ...project,
    title: locale === "id" ? project.title : project.titleEn,
    categoryLabel: locale === "id" ? project.categoryLabel : project.categoryLabelEn,
  }));

  portfolios.sort((left, right) => {
    if (right.year !== left.year) return Number(right.year) - Number(left.year);
    return String(right.id).localeCompare(String(left.id));
  });


  const displayed = limit ? portfolios.slice(0, limit) : portfolios;

  // Sembunyikan section di halaman depan saat belum ada proyek.
  if (displayed.length === 0) return null;



  return (
    <section className="section-padding bg-white theme-section theme-section-soft">
      <div className="section-container">
        <div className="mb-16 text-center">
          <AnimateOnView>
            <span className="badge mb-4">{t("badge")}</span>
          </AnimateOnView>
          <AnimateOnView delay={100}>
            <h2 className="section-title mb-4">{t("title")}</h2>
          </AnimateOnView>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 max-w-[1200px] mx-auto">
          {displayed.map((project, index) => {
            // Logic for Mosaic Layout (Long, Short) -> (Short, Long)
            const isWide = index % 4 === 0 || index % 4 === 3;
            
            return (
            <AnimateOnView key={project.id} delay={index * 80} className={`h-full ${isWide ? 'md:col-span-2' : 'md:col-span-1'}`}>
              <Link href={`/${locale}/portfolio/${project.slug}`} className="group block h-full w-full">
                <div className="portfolio-showcase-card relative h-[220px] w-full overflow-hidden rounded-xl bg-slate-900 shadow-xl md:h-[280px]">
                  
                  {/* Background Image */}
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />

                  {/* Elegant Gradient Overlay restricted to Top Half for pure text contrast without darkening the whole image unnecessarily */}
                  <div className="absolute left-0 right-0 top-0 h-[78%] bg-gradient-to-b from-black/95 via-black/72 to-transparent pointer-events-none opacity-95 transition-opacity duration-[800ms] group-hover:opacity-100" />
                  
                  {/* Deepening filter on the whole card for cinematic feel */}
                  <div className="absolute inset-0 bg-black/34 transition-opacity duration-[800ms] group-hover:bg-black/18 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_24%,transparent_72%,rgba(0,0,0,0.22)_100%)] pointer-events-none opacity-100" />
                  <div className="absolute inset-[1px] rounded-[calc(0.75rem-1px)] border border-white/10 pointer-events-none" />

                  {/* Content Layer (Top-Aligned but dropped slightly) */}
                  <div className="absolute inset-0 pt-6 px-6 md:pt-8 md:px-8 flex flex-col justify-start pointer-events-none">
                    <div className="flex justify-between items-start gap-4 w-full">
                      
                      {/* Top Left: Refined Elegant Title */}
                      <h3 className="max-w-[95%] text-xl md:text-[1.65rem] font-medium text-white leading-[1.3] md:leading-[1.25] tracking-wide drop-shadow-[0_6px_24px_rgba(0,0,0,1)] group-hover:text-white transition-colors duration-500" style={{ fontFamily: "var(--font-poppins)" }}>
                        {project.title}
                      </h3>

                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnView>
            );
          })}
        </div>

        {limit && (
          <div className="mt-12 text-center">
            <Link href={`/${locale}/portfolio`} className="btn-primary">
              {t("viewAll")}
              <Icon name="ArrowRight" size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
