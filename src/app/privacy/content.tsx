"use client";

import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";
import { site } from "@/lib/site";

const copy = {
  en: {
    eyebrow: "Legal",
    title: "Privacy",
    accent: "notice.",
    lede: "How PT Violet Global Indonesia handles information when you use this website or contact us.",
    blocks: [
      ["What we collect", "When you send an inquiry, your mail application shares the details you type: name, organization, email address, topic, and message. This website itself stores nothing. Your language and theme preferences are kept only in your own browser."],
      ["How we use it", "Inquiry details are used for one purpose: responding to your message and scoping potential work. We do not sell, rent, or share your details with third parties for marketing."],
      ["Retention", "Correspondence is retained as long as needed for the conversation and any resulting engagement, then removed on request."],
      ["Your rights", "You may ask what we hold about you, correct it, or request deletion at any time by writing to the address below."],
      ["Contact", "Questions about this notice go to the same inbox as everything else."],
    ] as Array<[string, string]>,
  },
  id: {
    eyebrow: "Legal",
    title: "Pemberitahuan",
    accent: "privasi.",
    lede: "Bagaimana PT Violet Global Indonesia menangani informasi saat Anda menggunakan situs ini atau menghubungi kami.",
    blocks: [
      ["Yang kami kumpulkan", "Saat Anda mengirim inquiry, aplikasi email Anda membagikan detail yang Anda ketik: nama, organisasi, alamat email, topik, dan pesan. Situs ini sendiri tidak menyimpan apa pun. Preferensi bahasa dan tema hanya tersimpan di browser Anda sendiri."],
      ["Cara penggunaan", "Detail inquiry dipakai untuk satu tujuan: merespons pesan Anda dan melingkupi potensi pekerjaan. Kami tidak menjual, menyewakan, atau membagikan detail Anda ke pihak ketiga untuk pemasaran."],
      ["Penyimpanan", "Korespondensi disimpan selama diperlukan untuk percakapan dan potensi kerja sama, lalu dihapus atas permintaan."],
      ["Hak Anda", "Anda dapat menanyakan data apa yang kami pegang tentang Anda, mengoreksinya, atau meminta penghapusan kapan saja lewat alamat di bawah."],
      ["Kontak", "Pertanyaan tentang pemberitahuan ini kirimkan ke alamat yang sama seperti hal lainnya."],
    ] as Array<[string, string]>,
  },
};

export default function PrivacyContent() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} accent={t.accent} lede={t.lede} image={img.matrix} crumbHome={lang === "id" ? "Indeks" : "Index"} />
      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-4xl px-5 pt-10 pb-20 md:px-10 md:pt-14 md:pb-28">
          {t.blocks.map(([title, body], i) => (
            <Reveal key={title}>
              <div className="border-t border-stone-900/10 py-8 last:border-b dark:border-white/12">
                <p className="font-tech text-[11px] uppercase tracking-[0.25em] text-violet-700 dark:text-violet-400">0{i + 1}</p>
                <h2 className="font-display mt-2 text-2xl uppercase tracking-wide text-[#141419] md:text-3xl dark:text-[#f4f1eb]">{title}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-stone-600 dark:text-white/60">{body}</p>
              </div>
            </Reveal>
          ))}
          <p className="mt-10 text-sm text-stone-500 dark:text-white/45">
            {lang === "id" ? "Terakhir diperbarui: September 2026." : "Last updated: September 2026."}{" "}
            <a className="text-violet-700 underline underline-offset-4 dark:text-violet-300" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
