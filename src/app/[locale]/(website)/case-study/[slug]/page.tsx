import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data/case-studies";
import type { CaseStudyItem } from "@/lib/data/case-studies";
import { PortableText } from "@portabletext/react";

// `explanation`/`explanationEn` hold Portable Text blocks or a string, `image`
// a local asset path, and `isContinuation` marks a continuation page. These
// optional fields are declared on `CaseStudyPageItem` in the data module.

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

type BookPage = {
  id: string;
  number: number;
  kind: "cover" | "toc" | "content";
  title: string;
  subtitle?: string;
  explanation?: unknown;
  isContinuation?: boolean;
  image?: string;
  paragraphs?: string[];
  notes?: string[];
  closing?: string;
};

const SECTION_TITLES = {
  id: [
    "Latar Belakang Riset",
    "Pertanyaan Utama",
    "Ruang Lingkup",
    "Metode dan Pendekatan",
    "Pembacaan Awal",
    "Sinyal Perilaku",
    "Pola Keputusan",
    "Titik Friksi",
    "Sudut Pandang Stakeholder",
    "Peluang Strategis",
    "Arah Narasi",
    "Implikasi Desain",
    "Implikasi Operasional",
    "Struktur Informasi",
    "Prioritas Temuan",
    "Risiko yang Perlu Dijaga",
    "Arah Rekomendasi",
    "Catatan Akhir Riset",
    "Peta Peluang",
    "Lapisan Konteks",
    "Catatan Observasi",
    "Ritme Interaksi",
    "Arah Pengembangan",
    "Skenario Implementasi",
    "Pertimbangan Validasi",
    "Hal yang Perlu Dijaga",
    "Penutup",
    "Lampiran Ringkas",
  ],
  en: [
    "Research Background",
    "Core Question",
    "Scope of Review",
    "Method and Approach",
    "Initial Reading",
    "Behavior Signals",
    "Decision Patterns",
    "Friction Points",
    "Stakeholder Lens",
    "Strategic Opportunity",
    "Narrative Direction",
    "Design Implication",
    "Operational Implication",
    "Information Structure",
    "Priority Findings",
    "Risks to Watch",
    "Recommendation Direction",
    "Final Research Note",
    "Opportunity Map",
    "Context Layer",
    "Observation Notes",
    "Interaction Rhythm",
    "Development Direction",
    "Implementation Scenario",
    "Validation Considerations",
    "Things to Preserve",
    "Closing Note",
    "Brief Appendix",
  ],
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const study = caseStudies.find((entry) => entry.slug === slug);

  if (!study) return {};

  return {
    title: locale === "id" ? study.title : study.titleEn,
    description: locale === "id" ? (study.cardSummary || study.summary) : (study.cardSummaryEn || study.summaryEn),
  };
}


function buildContentPages(
  study: CaseStudyItem,
  locale: "id" | "en",
): BookPage[] {
  const isId = locale === "id";

  if (!study.pages || study.pages.length === 0) return [];

  return study.pages.map((source, index) => {
    return {
      id: `page-${String(index + 3).padStart(2, "0")}`,
      number: index + 3,
      kind: "content",
      title: (isId ? source.title : source.titleEn) || "",
      explanation: isId ? source.explanation : source.explanationEn,
      isContinuation: source.isContinuation,
      image: source.image,
      paragraphs: [
        isId ? source.intro : source.introEn,
        isId ? source.note : source.noteEn
      ].filter(Boolean),
      notes: isId ? source.bullets : source.bulletsEn,
    };
  });
}


function chunkPages<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function pageNumber(value: number) {
  return String(value);
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale === "en" ? "en" : "id";
  const isId = locale === "id";
  const study = caseStudies.find((entry) => entry.slug === slug);

  if (!study) notFound();


  const coverPage: BookPage = {
    id: "page-01",
    number: 1,
    kind: "cover",
    title: isId ? study.title : study.titleEn,
  };

  const tocPage: BookPage = {
    id: "page-02",
    number: 2,
    kind: "toc",
    title: isId ? "Daftar Isi" : "Table of Contents",
  };

  const contentPages = buildContentPages(study, locale);
  const allPages = [coverPage, tocPage, ...contentPages];
  const spreads = chunkPages(allPages, 2);

  return (
    <div className="research-book bg-[#efe7da] text-neutral-900">
      <Link
        href={`/${locale}/case-study`}
        className="research-hand fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-[1rem] border border-[#8a7a65]/22 bg-[linear-gradient(180deg,rgba(255,251,243,0.94),rgba(248,241,228,0.88))] px-4 py-2.5 text-[13px] text-[#5a4b3d] shadow-[0_12px_26px_rgba(83,62,41,0.10),inset_0_1px_0_rgba(255,255,255,0.7)] transition-colors hover:text-[#2f261e] sm:left-6 sm:top-6"
      >
        <span className="text-[15px] leading-none">{"<"}</span>
        <span>Back</span>
      </Link>

      <main className="scroll-smooth">
        {spreads.map((spread, spreadIndex) => (
          <section
            key={`spread-${spreadIndex}`}
            className="research-spread relative min-h-screen border-b border-dashed border-[#8a7a65]/18 bg-[#fbf7ef]"
          >
            <div className="mx-auto grid min-h-screen w-full max-w-[96rem] grid-cols-1 lg:grid-cols-2">
              {spread.map((page, pageIndex) => (
                <article
                  key={page.id}
                  id={page.id}
                  className={`research-page relative flex min-h-[50vh] flex-col px-6 pb-12 pt-24 sm:px-8 lg:min-h-screen lg:px-12 lg:pb-16 lg:pt-20 ${
                    pageIndex === 0 ? "lg:border-r lg:border-[#8a7a65]/18" : ""
                  }`}
                >
                  {page.kind === "cover" ? (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 18% 20%, ${study.accentTone}28 0%, transparent 24%), radial-gradient(circle at 84% 16%, rgba(255,255,255,0.8) 0%, transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 52%, rgba(0,0,0,0.04) 100%), ${study.spineTone}`,
                        }}
                      />
                      <div className="absolute inset-x-[10%] top-[16%] h-px bg-white/18" />
                      <div className="absolute bottom-[18%] right-[10%] h-56 w-56 rounded-full bg-black/10 blur-3xl" />
                      <div className="relative flex h-full flex-col items-center justify-center text-center">
                        <div className="max-w-3xl">
                          <h1 className="research-hand text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
                            {isId ? study.title : study.titleEn}
                          </h1>
                        </div>

                        <div className="mt-10 max-w-md">
                          <p className="research-hand text-[16px] leading-8 text-white/84">
                            {isId ? (study.cardSummary || study.summary) : (study.cardSummaryEn || study.summaryEn)}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {page.kind === "toc" ? (
                    <div className="flex h-full flex-col">
                      <div className="border-b border-black/8 pb-6">
                        <h2 className="research-hand mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2f261e] md:text-5xl">
                          {page.title}
                        </h2>
                        <p className="research-hand mt-6 max-w-xl text-[16px] leading-8 text-[#55493d]">
                          {isId ? (study.cardSummary || study.summary) : (study.cardSummaryEn || study.summaryEn)}
                        </p>
                      </div>

                      <div className="mt-7 grid gap-1.5">
                        {contentPages.filter(item => !item.isContinuation).map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="toc-line flex items-center justify-between border-b border-dashed border-[#8a7a65]/26 py-1.5 text-[14px] text-[#55493d] transition-all duration-200 hover:border-[#5f5141]/40 hover:text-[#2f261e]"
                          >
                            <span className="research-hand truncate pr-4">
                              {item.title}
                            </span>
                            <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7e705d]">
                              {pageNumber(item.number)}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {page.kind === "content" ? (
                    <div className="flex h-full flex-col">
                      {!page.isContinuation && page.title && (
                        <div className="border-b border-black/8 pb-5">
                          <h2 className="research-hand mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2f261e] md:text-5xl">
                            {page.title}
                          </h2>
                        </div>
                      )}

                      <div className="mt-8 flex flex-1 flex-col justify-between">
                        <div className="research-hand text-[14px] leading-[1.82] text-[#55493d] max-w-4xl space-y-4">
                          {Array.isArray(page.explanation) ? (
                            <PortableText value={page.explanation} />
                          ) : typeof page.explanation === "string" && page.explanation ? (
                            <p>{page.explanation}</p>
                          ) : (
                            <>
                              {page.paragraphs?.map((p: string, idx: number) => <p key={idx}>{p}</p>)}
                              {page.notes && page.notes.length > 0 && (
                                <ul className="list-disc pl-5 mt-4 space-y-2">
                                  {page.notes.map((n: string, idx: number) => <li key={idx}>{n}</li>)}
                                </ul>
                              )}
                            </>
                          )}
                        </div>

                        {page.image && (
                           <div className="mt-8 relative aspect-[16/10] overflow-hidden rounded-lg bg-black/5 shadow-sm border border-black/5">
                             <img 
                               src={page.image} 
                               alt={page.title || "Illustration"}
                               className="h-full w-full object-cover"
                             />
                           </div>
                        )}
                      </div>
                    </div>
                  ) : null}


                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                    <span
                      className={`research-hand text-[14px] font-medium tracking-[0.18em] ${
                        page.kind === "cover" ? "text-white/48" : "text-[#7e705d]"
                      }`}
                    >
                      {pageNumber(page.number)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
      <style>{`
        .research-book {
          background:
            radial-gradient(circle at 12% 10%, rgba(255, 255, 255, 0.36), transparent 20%),
            radial-gradient(circle at 88% 18%, rgba(137, 120, 95, 0.08), transparent 24%),
            radial-gradient(circle at 24% 74%, rgba(122, 104, 80, 0.05), transparent 18%),
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.04) 0px,
              rgba(255,255,255,0.04) 1px,
              transparent 1px,
              transparent 5px
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.18), transparent 18%),
            #efe7da;
        }

        .research-spread::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.45;
          background-image:
            linear-gradient(rgba(122, 104, 80, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(122, 104, 80, 0.03) 1px, transparent 1px),
            radial-gradient(circle at 20% 30%, rgba(122, 104, 80, 0.06) 0 1px, transparent 1px),
            radial-gradient(circle at 78% 68%, rgba(122, 104, 80, 0.05) 0 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 26px 26px, 34px 34px;
          mix-blend-mode: multiply;
        }

        .research-page::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.12), transparent 12%, transparent 88%, rgba(90,74,56,0.05)),
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2), transparent 34%);
          opacity: 0.65;
        }

        .toc-line:hover {
          transform: translateX(4px);
        }

        .research-hand {
          font-family: "Segoe Print", "Bradley Hand", "Marker Felt", "Comic Sans MS", cursive;
          letter-spacing: 0.01em;
        }
      `}</style>
    </div>
  );
}
