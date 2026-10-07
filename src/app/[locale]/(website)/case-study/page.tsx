import { caseStudies } from "@/lib/data/case-studies";
import { CaseStudyShelf } from "./CaseStudyShelf";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CaseStudyPage({ params }: Props) {
  const { locale } = await params;
  const isId = locale === "id";

  return (
    <main className="case-study-page portfolio-atmosphere min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fcfbf8_0%,#f3ede5_46%,#f8f4ef_100%)] pt-14">
      <section className="case-study-content-shell bg-transparent mx-auto flex h-[calc(100svh-3.5rem)] w-full max-w-[96rem] flex-col justify-center overflow-hidden px-3 py-8 sm:px-3.5 lg:max-w-none lg:px-4 lg:py-10">
        <div className="mb-6 max-w-4xl space-y-3 pt-4 lg:pt-8">
          <h1 className="case-study-page-title text-4xl font-semibold tracking-[-0.05em] text-black md:text-5xl">
            {isId ? "Perpustakaan Riset" : "Research Library"}
          </h1>
        </div>

        <div className="flex-1">
          <div className="flex h-full min-h-[31rem] flex-col pt-2 lg:pt-4">
            <div className="case-study-meta mb-4 flex items-center justify-between gap-4 px-1 pr-4 text-[11px] uppercase tracking-[0.18em] text-black/38 lg:pr-8">
              <span>{isId ? `${caseStudies.length} Arsip Riset` : `${caseStudies.length} Research Volumes`}</span>
              <span>{isId ? "Geser ke samping" : "Scroll sideways"}</span>
            </div>
            <CaseStudyShelf studies={caseStudies} locale={locale} isId={isId} />
          </div>
        </div>
      </section>
    </main>
  );
}
