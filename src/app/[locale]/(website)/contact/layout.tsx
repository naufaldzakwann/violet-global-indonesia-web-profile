import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata(locale, "contact");
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
