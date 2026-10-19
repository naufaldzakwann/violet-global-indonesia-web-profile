import { getTranslations } from "next-intl/server";

type Page = "home" | "landing" | "services" | "about" | "contact" | "portfolio" | "faq";

export async function getPageMetadata(locale: string, page: Page) {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t(`${page}Title`),
    description: t(page === "home" || page === "landing" || page === "services" ? `${page}Description` : "siteDescription"),
  };
}
