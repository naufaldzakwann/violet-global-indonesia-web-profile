import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import ServiceDetailPage from "../src/app/[locale]/(website)/services/[slug]/page";
import {
  SERVICE_CONTENT_PORTABLE_EN,
  SERVICE_CONTENT_STRING_ID,
  SERVICE_DESC_EN,
  SERVICE_DESC_ID,
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

vi.mock("@/lib/data/services", async () => {
  const fixtures = await import("./fixtures/rich-text-fixtures");
  return { services: fixtures.serviceFixtures };
});

vi.mock("@/lib/data/portfolio", () => ({ portfolios: [] }));

vi.mock("@/lib/data/service-images", () => ({
  serviceImages: {},
  serviceFallbackImage: "/fixtures/service-fallback.jpg",
  serviceDetailHero: "/fixtures/service-detail-hero.jpg",
}));

async function renderServiceDetail(slug: string, locale: "id" | "en") {
  const element = await ServiceDetailPage({ params: Promise.resolve({ locale, slug }) });
  return renderToStaticMarkup(element);
}

describe("halaman detail layanan — render RichText", () => {
  it("menampilkan content string dan tidak tertimpa description (id)", async () => {
    const html = await renderServiceDetail("fixture-rich-service", "id");

    expect(html).toContain(SERVICE_CONTENT_STRING_ID);
    expect(html).not.toContain(SERVICE_DESC_ID);
  });

  it("menampilkan content Portable Text dan tidak tertimpa description (en)", async () => {
    const html = await renderServiceDetail("fixture-rich-service", "en");

    expect(html).toContain(SERVICE_CONTENT_PORTABLE_EN);
    expect(html).not.toContain(SERVICE_DESC_EN);
    expect(html).not.toContain("[object Object]");
  });

  it("memakai description saat content tidak diisi (id & en)", async () => {
    const idHtml = await renderServiceDetail("fixture-rich-service-empty", "id");
    expect(idHtml).toContain(SERVICE_DESC_ID);

    const enHtml = await renderServiceDetail("fixture-rich-service-empty", "en");
    expect(enHtml).toContain(SERVICE_DESC_EN);
  });

  it("memanggil notFound untuk slug yang tidak dikenal", async () => {
    await expect(renderServiceDetail("slug-tidak-ada", "id")).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
