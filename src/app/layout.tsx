import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PT Violet Global Indonesia — Orchestrating Intelligence, Defining the Future",
    template: "%s — Violet Global Indonesia",
  },
  description: site.description,
  keywords: [
    "Violet Global Indonesia",
    "AI Indonesia",
    "digital intelligence",
    "cybersecurity Indonesia",
    "SOC Indonesia",
    "penetration testing",
    "blockchain analytics",
    "social media intelligence",
    "green energy Indonesia",
    "waste to energy",
    "IT consulting Jakarta",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "PT Violet Global Indonesia — Orchestrating Intelligence, Defining the Future",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Violet Global Indonesia",
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  slogan: site.tagline,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Arjuna Building, Jl. Arjuna Utara No.28 Kav.11, Tanjung Duren Selatan",
    addressLocality: "Jakarta Barat",
    postalCode: "11470",
    addressCountry: "ID",
  },
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#080412] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
