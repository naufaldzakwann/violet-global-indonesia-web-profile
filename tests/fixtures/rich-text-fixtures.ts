import type { PortableTextBlock } from "@portabletext/react";
import type { Portfolio, Service } from "@/types";

// ── Penanda konten ───────────────────────────────────────────────────────────
// String unik dipakai test untuk memastikan konten benar-benar muncul di HTML.
export const DESIGN_STRING_ID = "Konten desain string fixture ID tampil.";
export const DESIGN_PORTABLE_EN = "Portable design fixture EN content appears.";
export const EXPLANATION_PORTABLE_ID = "Portable penjelasan fixture ID tampil.";
export const EXPLANATION_STRING_ID = "Penjelasan string fixture ID tampil.";
export const EXPLANATION_STRING_EN = "String explanation fixture EN appears.";
export const EMPTY_PAGE_FALLBACK_ID = "Halaman halaman kosong dirancang untuk menampilkan informasi utama secara jelas";
export const EMPTY_PAGE_FALLBACK_EN = "The empty page page is designed to present key information clearly";
export const PRESET_NARRATIVE_ID = "Tema yang dipilih untuk project ini adalah modern product system.";
export const PRESET_NARRATIVE_EN = "The chosen theme for this project is modern product system.";

export const SERVICE_CONTENT_STRING_ID = "Konten layanan string fixture ID tampil.";
export const SERVICE_CONTENT_PORTABLE_EN = "Portable service fixture EN content appears.";
export const SERVICE_DESC_ID = "Deskripsi layanan fixture fallback ID tampil.";
export const SERVICE_DESC_EN = "Fixture service fallback description EN appears.";

function portableBlock(key: string, text: string, style: "normal" | "h2" = "normal"): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  };
}

function portfolioFixture(overrides: Partial<Portfolio>): Portfolio {
  return {
    id: "portfolio-fixture-001",
    slug: "fixture-rich-text",
    title: "Fixture Rich Text",
    titleEn: "Rich Text Fixture",
    category: "web-app",
    categoryLabel: "Website & Aplikasi",
    categoryLabelEn: "Website & App",
    thumbnail: "/fixtures/portfolio-thumb.jpg",
    images: [],
    client: "Fixture Client",
    year: 2026,
    problem: "Masalah proyek fixture.",
    problemEn: "Fixture project problem.",
    solution: "Solusi proyek fixture.",
    solutionEn: "Fixture project solution.",
    result: "Hasil proyek fixture.",
    resultEn: "Fixture project result.",
    technologies: ["Next.js"],
    featured: false,
    ...overrides,
  };
}

function serviceFixture(overrides: Partial<Service>): Service {
  return {
    id: "svc-fixture-001",
    slug: "fixture-rich-service",
    icon: "Monitor",
    title: "Layanan Fixture",
    titleEn: "Fixture Service",
    shortDesc: "Deskripsi singkat fixture ID.",
    shortDescEn: "Fixture service short description EN.",
    description: SERVICE_DESC_ID,
    descriptionEn: SERVICE_DESC_EN,
    features: ["Fitur fixture ID"],
    featuresEn: ["Fixture feature EN"],
    category: "web-app",
    ...overrides,
  };
}

export const portfolioFixtures: Portfolio[] = [
  portfolioFixture({
    designContent: `# Desain Fixture ID\n\n${DESIGN_STRING_ID}`,
    designContentEn: [portableBlock("design-en-1", DESIGN_PORTABLE_EN)],
    pageExplanations: [
      {
        pageTitle: "Halaman Portable",
        pageTitleEn: "Portable Page",
        explanation: [portableBlock("explanation-id-1", EXPLANATION_PORTABLE_ID)],
        explanationEn: EXPLANATION_STRING_EN,
      },
      {
        pageTitle: "Halaman String",
        pageTitleEn: "String Page",
        explanation: EXPLANATION_STRING_ID,
      },
      {
        pageTitle: "Halaman Kosong",
        pageTitleEn: "Empty Page",
      },
    ],
  }),
  portfolioFixture({
    id: "portfolio-fixture-002",
    slug: "fixture-rich-text-empty",
  }),
];

export const serviceFixtures: Service[] = [
  serviceFixture({
    content: `# Layanan Fixture ID\n\n${SERVICE_CONTENT_STRING_ID}`,
    contentEn: [portableBlock("service-en-1", SERVICE_CONTENT_PORTABLE_EN)],
  }),
  serviceFixture({
    id: "svc-fixture-002",
    slug: "fixture-rich-service-empty",
  }),
];
