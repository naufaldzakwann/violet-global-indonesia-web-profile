import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { buildProjectSummary, sanitizePortfolioText } from "@/lib/portfolio-utils";
import { portfolios } from "@/lib/data/portfolio";
import type { Portfolio } from "@/types";
import { RichTextContent, hasRichText } from "@/components/ui/RichTextContent";

type Props = { params: Promise<{ locale: string; slug: string }> };
type Locale = "id" | "en";

// The optional migrated-content fields (overview, role, skills, designContent,
// pageExplanations, colorPalette, …) are declared on the shared `Portfolio`
// type so content authors get type checking. See content-editing.md.

type PortfolioPreset = {
  type: string; role: string; skills: string[]; structure: string[];
  palette: Array<[string, string]>; theme: string; styleText: string;
  themeReason: string; styleReason: string;
};

function previewImages(source: Portfolio) {
  // Use images from pageExplanations if available
  if (source.pageExplanations && source.pageExplanations.length > 0) {
    return source.pageExplanations
      .map((item) => ({
        src: item.imageUrl || item.image || "",
        position: "center 20%",
      }))
      .filter((img) => !!img.src);
  }

  // Fallback to gallery images if provided, otherwise empty
  if (source.images && source.images.length > 0) {
    const focus = ["center center", "center 30%", "center 38%", "center 46%", "center 52%", "center 36%", "center 48%", "center 40%"];
    return source.images.map((img, idx) => ({
      src: img,
      position: focus[idx % focus.length]
    }));
  }

  return [];
}



function previewSpanClass(index: number, total: number) {
  const isLast = index === total - 1;
  const pos = index % 3;

  // Patterns: 0=Full, 1=Half-Left, 2=Half-Right
  if (pos === 0) return "lg:col-span-2";
  
  // If it's the last one and it would normally be Half-Left (pos 1), 
  // make it Full to avoid a gap on the right.
  if (isLast && pos === 1) return "lg:col-span-2";
  
  return "lg:col-span-1";
}


function card(extra = "") {
  return `rounded-[1.05rem] border border-black/6 bg-white/76 p-5 shadow-[0_22px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 ${extra}`.trim();
}

function paletteGradient(palette: Array<[string, string]>) {
  if (!palette.length) return "conic-gradient(#111827 0deg 360deg)";

  const slice = 360 / palette.length;
  const stops = palette.map(([hex], index) => {
    const start = index * slice;
    const end = (index + 1) * slice;
    return `${hex} ${start}deg ${end}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function paletteLabelPosition(index: number) {
  const positions = [
    "left-0 top-1 text-left",
    "right-0 top-1 text-right",
    "left-0 bottom-1 text-left",
    "right-0 bottom-1 text-right",
  ];

  return positions[index] || positions[0];
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const project = portfolios.find((entry) => entry.slug === slug) as Portfolio | undefined;
  if (!project) return {};
  return { title: locale === "id" ? project.title : project.titleEn, description: sanitizePortfolioText(locale === "id" ? project.problem : project.problemEn) };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug, locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "id";
  const t = await getTranslations({ locale, namespace: "portfolioDetail" });
  const copy = { back: t("back"), overview: t("overview"), palette: t("palette"), structure: t("structure"), design: t("design"), type: t("type"), role: t("role"), tools: t("tools"), skills: t("skills") };
  const source = portfolios.find((entry) => entry.slug === slug) as Portfolio | undefined;
  if (!source) notFound();


  const isId = locale === "id";
  const presets = t.raw("presets") as Record<string, PortfolioPreset>;
  const preset = presets[source.category] || presets.default;
  const pageDescription = (name: string) => t("pageDescription", { name: name.toLowerCase() });
  const project = {
    title: isId ? source.title : source.titleEn,
    summary: (isId ? (source.overview || source.summary) : (source.overviewEn || source.summaryEn)) || buildProjectSummary((isId ? source.solution : source.solutionEn), (isId ? source.problem : source.problemEn)),
    tools: (source.tools || (isId ? source.technologies : (source.technologiesEn ?? source.technologies)) || []).map((item) => sanitizePortfolioText(item)),
  };


  const narrative = t("narrative", { theme: preset.theme, themeReason: preset.themeReason, styleText: preset.styleText, styleReason: preset.styleReason });
  const toolsText = project.tools.join(", ");
  const displayType = (isId ? (source.projectType || source.categoryLabel) : (source.projectTypeEn || source.categoryLabelEn)) || preset.type;
  const displayRole = (isId ? source.role : source.roleEn) || preset.role;
  const displaySkills = (isId ? source.skills : source.skillsEn) || preset.skills;
  
  const palette = source.colorPalette 
    ? source.colorPalette.map((p) => [p.hex, p.name] as [string, string])
    : (source.palette || []);
    
  const displayPalette = palette.length > 0 ? palette : preset.palette;
  const displayStructure: string[] = (source.structure && source.structure.length > 0) ? source.structure : (source.infrastructure || preset.structure);

  const skillsText = Array.isArray(displaySkills) ? displaySkills.join(", ") : displaySkills;
  const designContent = isId ? source.designContent : source.designContentEn;

  // Prepare images and explanations
  const imagesToDisplay = previewImages(source);
  const pageExps = (source.pageExplanations && source.pageExplanations.length > 0)
    ? source.pageExplanations.map((exp) => {
        const title = (isId ? exp.pageTitle : exp.pageTitleEn) || t("page");
        const explanation = isId ? exp.explanation : exp.explanationEn;
        return {
          title,
          text: hasRichText(explanation) ? explanation : pageDescription(title),
        };
      })
    : displayStructure.map((name: string) => ({
        title: name,
        text: pageDescription(name),
      }));


  return (
    <div className="bg-[linear-gradient(180deg,#fcfbf8_0%,#f3ede5_46%,#f8f4ef_100%)] pt-5 text-neutral-950 sm:pt-6">
      <section className="mx-auto w-full max-w-[92rem] px-3 pb-3 pt-4 sm:px-3.5 sm:pb-3.5 sm:pt-5 lg:px-4 lg:pb-3 lg:pt-6">
        <div className="detail-enter mb-7 flex flex-wrap items-center gap-3 sm:gap-4">
          <Link href={`/${locale}/portfolio`} className="inline-flex items-center justify-center text-3xl font-light leading-none text-black transition-transform duration-300 hover:-translate-x-0.5 sm:text-4xl" aria-label={copy.back}>{"<"}</Link>
          <h1 className="text-3xl font-semibold tracking-[-0.05em] text-black sm:text-4xl">{project.title}</h1>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <div className={`${card("h-full overflow-hidden")} detail-enter`} style={{ animationDelay: "90ms" }}>
            <div className="flex items-start justify-between">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-black">{copy.overview}</p>
            </div>

            <p className="mt-2 text-[13px] leading-[1.55] text-neutral-600">{project.summary}</p>
            <div className="mt-12 space-y-1">
              <div className="grid grid-cols-[4.2rem_minmax(0,1fr)] gap-3 border-b border-black/6 pb-1">
                <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-neutral-400">{copy.type}</p>
                <p className="truncate whitespace-nowrap text-right text-[10px] font-medium leading-[1.35] text-neutral-900">{displayType}</p>
              </div>
              <div className="grid grid-cols-[4.2rem_minmax(0,1fr)] gap-3 border-b border-black/6 pb-1">
                <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-neutral-400">{copy.role}</p>
                <p className="truncate whitespace-nowrap text-right text-[10px] leading-[1.35] text-neutral-700">{displayRole}</p>
              </div>
              <div className="grid grid-cols-[4.2rem_minmax(0,1fr)] gap-3 border-b border-black/6 pb-1">
                <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-neutral-400">{copy.tools}</p>
                <p className="truncate whitespace-nowrap text-right text-[10px] leading-[1.35] text-neutral-700">{toolsText}</p>
              </div>
              <div className="grid grid-cols-[4.2rem_minmax(0,1fr)] gap-3">
                <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-neutral-400">{copy.skills}</p>
                <p className="truncate whitespace-nowrap text-right text-[10px] leading-[1.35] text-neutral-700">{skillsText}</p>
              </div>
            </div>
          </div>

          <div className={`${card("h-full overflow-hidden")} detail-enter`} style={{ animationDelay: "150ms" }}>
            <p className="text-2xl font-semibold tracking-[-0.04em] text-black">{copy.palette}</p>
            <div className="mt-3.5 flex flex-col items-center">
              <div
                className="relative h-[13.5rem] w-full max-w-[16rem]"
              >
                <div
                  className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 shadow-[0_18px_36px_rgba(15,23,42,0.08)]"
                  style={{ backgroundImage: paletteGradient(displayPalette) }}
                />
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-black/5" />
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.42),transparent_30%),radial-gradient(circle_at_72%_76%,rgba(255,255,255,0.10),transparent_34%)]" />
                {displayPalette.map(([hex, name]: [string, string], index: number) => (
                  <div
                    key={`${hex}-${name}`}
                    className={`absolute flex max-w-[6.2rem] items-start gap-1.5 ${paletteLabelPosition(index)}`}
                  >
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: hex }} />
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium leading-4 text-neutral-900">{name}</p>
                      <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-neutral-400">{hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${card("h-full")} detail-enter`} style={{ animationDelay: "210ms" }}>
            <p className="text-2xl font-semibold tracking-[-0.04em] text-black">{copy.structure}</p>
            <div className="mt-3.5 grid gap-2 sm:grid-cols-2">{displayStructure.map((item: string, index: number) => <div key={item} className="flex items-start gap-2 rounded-[0.85rem] bg-black/[0.03] px-3 py-2.5"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[9px] font-semibold text-white">{index + 1}</span><p className="text-xs leading-5 text-neutral-700">{item}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[92rem] px-3 pb-16 sm:px-3.5 lg:px-4 lg:pb-24">
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-3 lg:col-span-8 lg:grid-cols-2">
            {imagesToDisplay.map((image, index, arr) => (
              <div 
                key={`${image.src}-${index}`} 
                className={`detail-enter relative overflow-hidden rounded-[1.05rem] border border-black/6 bg-white/24 shadow-[0_20px_48px_rgba(15,23,42,0.10)] backdrop-blur-sm ${previewSpanClass(index, arr.length)}`} 
                style={{ animationDelay: `${240 + index * 55}ms` }}
              >
                <div className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/78 text-xs font-semibold text-white backdrop-blur-md">{index + 1}</div>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_28%,transparent_70%,rgba(255,255,255,0.04))]" />
                <div className="relative aspect-[16/10]">
                  <Image 
                    src={image.src} 
                    alt={t("imageAlt", { title: project.title, number: index + 1 })}
                    fill 
                    className="object-cover saturate-[0.97]" 
                    style={{ objectPosition: image.position }} 
                    sizes="(max-width:1024px) 100vw, 62vw" 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={`${card("h-fit lg:col-span-4 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto")} detail-enter`} style={{ animationDelay: "300ms" }}>
            <p className="text-2xl font-semibold tracking-[-0.04em] text-black">{copy.design}</p>
            <div className="mt-4 text-sm leading-7 text-neutral-700 description-rich">
              <RichTextContent value={designContent} fallback={<p className="leading-8">{narrative}</p>} />
            </div>



            <div className="my-6 h-[5px] rounded-full bg-black" />
            <div className="mt-5 space-y-0">{pageExps.map((item, index) => <article key={index} className={`${index !== 0 ? "border-t border-black/10 pt-4" : ""} ${index !== pageExps.length - 1 ? "pb-4" : ""}`}><div className="flex items-start gap-3"><span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white shadow-[0_10px_26px_rgba(15,23,42,0.16)]">{index + 1}</span><div className="min-w-0"><h2 className="text-lg font-semibold tracking-[-0.03em] text-black">{item.title}</h2><RichTextContent value={item.text} className="mt-2 text-sm leading-7 text-neutral-600" /></div></div></article>)}</div>
          </div>
        </div>
      </section>
      <style>{`
        .detail-enter {
          opacity: 0;
          transform: translate3d(0, 20px, 0) scale(0.992);
          animation: detail-enter 760ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes detail-enter {
          0% {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.992);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
