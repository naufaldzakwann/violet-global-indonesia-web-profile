import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LocaleInitializer } from "@/components/i18n/LocaleInitializer";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: t("siteTitle"), template: "%s | Violet Global Indonesia" },
    description: t("siteDescription"),
    openGraph: { title: t("siteTitle"), description: t("siteDescription"), locale: locale === "id" ? "id_ID" : "en_US" },
    twitter: { title: t("siteTitle"), description: t("siteDescription") },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "id" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleInitializer locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
