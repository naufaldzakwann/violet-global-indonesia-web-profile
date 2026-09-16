"use client";

import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site, img } from "@/lib/site";

export default function ContactContent() {
  const { d } = useLanguage();
  const c = d.contact;

  return (
    <>
      <PageHero
        index="07"
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        accent={c.heroAccent}
        lede={c.heroLede}
        image={img.aiGradient}
        crumbHome={d.index}
        localeTag={d.localeTag}
      />

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-px border border-white/12 bg-white/12">
              <div className="bg-[#0a0a0b] p-7">
                <Eyebrow>{c.entityLabel}</Eyebrow>
                <p className="font-display mt-3 text-2xl uppercase tracking-wide text-[#f4f1eb]">{site.name}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{c.entitySub}</p>
              </div>
              <div className="bg-[#0a0a0b] p-7">
                <Eyebrow>{c.addressLabel}</Eyebrow>
                <p className="mt-3 text-sm leading-6 text-white/60">{site.address}</p>
                <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="font-tech mt-3 inline-block text-[11px] uppercase tracking-[0.2em] text-violet-300 hover:text-white">
                  Google Maps ↗
                </a>
              </div>
              <div className="bg-[#0a0a0b] p-7">
                <Eyebrow>{c.directLabel}</Eyebrow>
                <a href={`mailto:${site.email}`} className="font-display mt-3 block break-all text-xl uppercase tracking-wide text-[#f4f1eb] transition-colors hover:text-violet-300 md:text-2xl">
                  {site.email}
                </a>
                <p className="font-tech mt-3 text-[10px] uppercase leading-5 tracking-[0.18em] text-white/40">
                  {c.subjectHint}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
