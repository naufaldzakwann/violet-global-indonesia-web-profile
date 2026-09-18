"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

const copy = {
  en: {
    eyebrow: "Legal",
    title: "Terms of",
    accent: "use.",
    lede: "The ground rules for using this website and reading its content.",
    blocks: [
      ["Purpose", "This website presents PT Violet Global Indonesia and invites inquiries. Nothing here is an offer, a binding proposal, or investment advice."],
      ["Pipeline concepts", "Green energy and infrastructure concepts described here are development targets, not completed projects, unless the page says otherwise."],
      ["Intellectual property", "Text, layout, and the Violet mark belong to PT Violet Global Indonesia or its licensors. Photography belongs to its respective owners. Do not copy site content for commercial reuse without written permission."],
      ["Acceptable use", "Do not misuse the inquiry form, probe the site for vulnerabilities without authorization, or misrepresent your identity when contacting us."],
      ["Liability", "Content is provided as is, without warranties. To the extent permitted by law, we are not liable for decisions taken solely on the basis of website content."],
      ["Changes", "We may update this page as the site evolves. Continued use means acceptance of the current version."],
    ] as Array<[string, string]>,
  },
  id: {
    eyebrow: "Legal",
    title: "Ketentuan",
    accent: "penggunaan.",
    lede: "Aturan dasar penggunaan situs ini dan pembacaan kontennya.",
    blocks: [
      ["Tujuan", "Situs ini memperkenalkan PT Violet Global Indonesia dan mengundang inquiry. Tidak ada bagian di sini yang merupakan penawaran, proposal mengikat, atau nasihat investasi."],
      ["Konsep pipeline", "Konsep energi hijau dan infrastruktur yang dijelaskan di sini adalah target pengembangan, bukan proyek selesai, kecuali halaman menyatakan sebaliknya."],
      ["Kekayaan intelektual", "Teks, tata letak, dan merek Violet milik PT Violet Global Indonesia atau pemberi lisensinya. Fotografi milik pemiliknya masing-masing. Jangan salin konten situs untuk dipakai ulang secara komersial tanpa izin tertulis."],
      ["Penggunaan wajar", "Jangan menyalahgunakan formulir inquiry, menguji kerentanan situs tanpa otorisasi, atau memalsukan identitas saat menghubungi kami."],
      ["Tanggung jawab", "Konten disediakan apa adanya, tanpa jaminan. Sepanjang diizinkan hukum, kami tidak bertanggung jawab atas keputusan yang diambil semata berdasar konten situs."],
      ["Perubahan", "Kami dapat memperbarui halaman ini seiring perkembangan situs. Penggunaan berkelanjutan berarti penerimaan atas versi terkini."],
    ] as Array<[string, string]>,
  },
};

export default function TermsContent() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} accent={t.accent} lede={t.lede} image={img.city} crumbHome={lang === "id" ? "Indeks" : "Index"} />
      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-4xl px-5 py-20 md:px-10 md:py-28">
          {t.blocks.map(([title, body], i) => (
            <Reveal key={title}>
              <div className="border-t border-stone-900/10 py-8 last:border-b dark:border-white/12">
                <p className="font-tech text-[11px] uppercase tracking-[0.25em] text-violet-700 dark:text-violet-400">0{i + 1}</p>
                <h2 className="font-display mt-2 text-2xl uppercase tracking-wide text-[#141419] md:text-3xl dark:text-[#f4f1eb]">{title}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-stone-600 dark:text-white/60">{body}</p>
              </div>
            </Reveal>
          ))}
          <Link href="/contact" className="mt-10 inline-flex items-center gap-2 bg-[#17171d] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-600 dark:bg-[#f4f1eb] dark:text-black dark:hover:bg-violet-500 dark:hover:text-white">
            {lang === "id" ? "Hubungi kami" : "Contact us"} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
