import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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
  const isId = locale === "id";
  return {
    title: {
      default: isId
        ? "Violet Global Indonesia — One-Stop IT & Digital Solution"
        : "Violet Global Indonesia — One-Stop IT & Digital Solution",
      template: "%s | Violet Global Indonesia",
    },
    description: isId
      ? "Violet Global Indonesia adalah perusahaan IT & digital one-stop solution. Layanan: Web Development, Cybersecurity, Digital Marketing, Data Analytics, dan lebih banyak lagi."
      : "Violet Global Indonesia is a trusted one-stop IT & digital solution company. Services: Web Development, Cybersecurity, Digital Marketing, Data Analytics, and more.",
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
