import type { Metadata } from "next";
import { ThemeInitializer } from "@/components/theme/ThemeInitializer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://violetglobal.id"),
  title: {
    default: "Violet Global Indonesia - One-Stop IT & Digital Solution",
    template: "%s | Violet Global Indonesia",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  description:
    "Violet Global Indonesia adalah perusahaan IT & digital one-stop solution terpercaya. Layanan: Web Development, Cybersecurity, Digital Marketing, Data Analytics, Branding, dan lebih banyak lagi.",
  keywords: ["IT solution", "web development", "cybersecurity", "digital marketing", "Indonesia", "VGI"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://violetglobal.id",
    siteName: "Violet Global Indonesia",
    title: "Violet Global Indonesia - One-Stop IT & Digital Solution",
    description: "Solusi IT & Digital terlengkap untuk bisnis Anda.",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630, alt: "Violet Global Indonesia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Violet Global Indonesia",
    description: "Solusi IT & Digital terlengkap untuk bisnis Anda.",
    images: ["/og/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
