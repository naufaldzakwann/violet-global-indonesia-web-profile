import { PortfolioContent } from "./PortfolioContent";
import { getCategoryLabel } from "@/lib/data/services";
import { portfolios } from "@/lib/data/portfolio";
import {
  buildProjectHighlight,
  buildProjectSummary,
  sanitizePortfolioText,
} from "@/lib/portfolio-utils";

const CATEGORIES = [
  "all",
  "web-app",
  "data-analytics",
  "ecommerce",
  "design-branding",
  "automation",
  "cybersecurity",
] as const;

type PortfolioListItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  thumbnail: string;
  client: string;
  year: number | string;
  summary: string;
  outcome: string;
  featured: boolean;
  status: string;
  statusTone: "green" | "yellow" | "red";
  updatedTime: string;
};

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const statusVariants = [
    { id: "Live", en: "Live", tone: "green" as const },
    { id: "Review", en: "Review", tone: "yellow" as const },
    { id: "Archive", en: "Archive", tone: "red" as const },
  ];

  const projects: PortfolioListItem[] = portfolios
    .map((project) => {
      const isId = locale === "id";
      const problem = sanitizePortfolioText(isId ? project.problem : project.problemEn);
      const solution = sanitizePortfolioText(isId ? project.solution : project.solutionEn);
      const result = sanitizePortfolioText(isId ? project.result : project.resultEn);
      
      const idString = String(project.id);
      const seed = idString.includes("-") 
        ? (Number(idString.split("-").pop()) || 1)
        : (idString.length || 1);

      // Local portfolio entries declare their own `year`, so the card date and the
      // displayed year both come from that field.
      const yearNum = project.year;
      const finalDate = new Date(yearNum, 0, 1);
      const statusVariant = statusVariants[seed % statusVariants.length];

      return {
        id: idString,
        slug: project.slug,
        title: isId ? project.title : project.titleEn,
        category: project.category,
        categoryLabel: isId ? project.categoryLabel : project.categoryLabelEn,
        thumbnail: project.thumbnail,
        client: sanitizePortfolioText(project.client || "Client"),
        year: yearNum,

        summary: buildProjectSummary(solution, problem),
        outcome: buildProjectHighlight(result, solution),
        featured: !!project.featured,
        status: isId ? statusVariant.id : statusVariant.en,
        statusTone: statusVariant.tone,
        updatedTime: new Intl.DateTimeFormat(isId ? "id-ID" : "en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(finalDate),
      };
    })

    .sort((left, right) => {
      if (right.year !== left.year) return Number(right.year) - Number(left.year);
      return String(right.id).localeCompare(String(left.id));
    });



  const categoryOptions = CATEGORIES.map((category) => ({
    value: category,
    label: category === "all" ? null : getCategoryLabel(category, locale),
    count:
      category === "all"
        ? projects.length
        : projects.filter((project) => project.category === category).length,
  })).filter((category) => category.value === "all" || category.count > 0);

  return (
    <main className="portfolio-page portfolio-atmosphere bg-white pt-20">
      <PortfolioContent projects={projects} locale={locale} categoryOptions={categoryOptions} />
    </main>
  );
}
