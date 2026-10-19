import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <main className="section-container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="text-sm font-semibold text-violet-500">404</span>
      <h1 className="section-title">{t("title")}</h1>
      <p className="theme-body">{t("description")}</p>
      <Link href={`/${locale}/home`} className="btn-primary">{t("back")}</Link>
    </main>
  );
}
