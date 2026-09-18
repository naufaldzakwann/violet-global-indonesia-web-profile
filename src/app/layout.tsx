import type { Metadata } from "next";
import { Anton, Space_Grotesk, Source_Serif_4, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";

const sans = Space_Grotesk({ variable: "--font-sans-base", subsets: ["latin"], display: "swap" });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", display: "swap" });
const editorial = Source_Serif_4({ variable: "--font-editorial", subsets: ["latin"], style: ["italic", "normal"], weight: ["400", "500"], display: "swap" });
const tech = Share_Tech_Mono({ variable: "--font-tech", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PT Violet Global Indonesia - Orchestrating Intelligence, Defining the Future",
    template: "%s - Violet Global Indonesia",
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
    title: "PT Violet Global Indonesia - Orchestrating Intelligence, Defining the Future",
    description: site.description,
    locale: "en_US",
    images: [{ url: "/logo-violet-indonesia.png", width: 240, height: 236, alt: site.name }],
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
    streetAddress: "Jl. Lempongsari Timur IV No. 302 K, Gajah Mungkur",
    addressLocality: "Semarang",
    postalCode: "50231",
    addressCountry: "ID",
  },
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${anton.variable} ${editorial.variable} ${tech.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#FAF6EE] font-sans text-[#17171d] dark:bg-[#0a0a0b] dark:text-[#f4f1eb]">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('vgi-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <LanguageProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-violet-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to content
            </a>
            <ScrollToTop />
            <Navbar />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
