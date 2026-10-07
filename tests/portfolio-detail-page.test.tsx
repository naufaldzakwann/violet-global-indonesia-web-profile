import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import PortfolioDetailPage from "../src/app/[locale]/(website)/portfolio/[slug]/page";
import {
  DESIGN_PORTABLE_EN,
  DESIGN_STRING_ID,
  EMPTY_PAGE_FALLBACK_EN,
  EMPTY_PAGE_FALLBACK_ID,
  EXPLANATION_PORTABLE_ID,
  EXPLANATION_STRING_EN,
  EXPLANATION_STRING_ID,
  PRESET_NARRATIVE_EN,
  PRESET_NARRATIVE_ID,
} from "./fixtures/rich-text-fixtures";

vi.mock("next/image", async () => {
  const React = await import("react");
  return {
    default: ({ src, alt }: { src?: unknown; alt?: string }) =>
      React.createElement("img", {
        src: typeof src === "string" ? src : undefined,
        alt: alt ?? "",
      }),
  };
});

vi.mock("next/link", () => ({ default: "a" }));

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

vi.mock("@/lib/data/portfolio", async () => {
  const fixtures = await import("./fixtures/rich-text-fixtures");
  return { portfolios: fixtures.portfolioFixtures };
});

async function renderPortfolioDetail(slug: string, locale: "id" | "en") {
  const element = await PortfolioDetailPage({ params: Promise.resolve({ locale, slug }) });
  return renderToStaticMarkup(element);
}

describe("halaman detail portfolio — render RichText", () => {
  it("menampilkan designContent string dan page explanation Portable Text (id)", async () => {
    const html = await renderPortfolioDetail("fixture-rich-text", "id");

    expect(html).toContain(DESIGN_STRING_ID);
    expect(html).toContain(EXPLANATION_PORTABLE_ID);
    expect(html).toContain(EXPLANATION_STRING_ID);
    expect(html).toContain(EMPTY_PAGE_FALLBACK_ID);
    expect(html).not.toContain("[object Object]");
  });

  it("menampilkan designContent Portable Text dan page explanation string (en)", async () => {
    const html = await renderPortfolioDetail("fixture-rich-text", "en");

    expect(html).toContain(DESIGN_PORTABLE_EN);
    expect(html).toContain(EXPLANATION_STRING_EN);
    expect(html).toContain(EMPTY_PAGE_FALLBACK_EN);
    expect(html).not.toContain("[object Object]");
  });

  it("memakai preset dan deskripsi halaman saat konten tidak diisi", async () => {
    const idHtml = await renderPortfolioDetail("fixture-rich-text-empty", "id");
    expect(idHtml).toContain(PRESET_NARRATIVE_ID);
    expect(idHtml).not.toContain(DESIGN_STRING_ID);

    const enHtml = await renderPortfolioDetail("fixture-rich-text-empty", "en");
    expect(enHtml).toContain(PRESET_NARRATIVE_EN);
    expect(enHtml).not.toContain(DESIGN_PORTABLE_EN);
  });
});
