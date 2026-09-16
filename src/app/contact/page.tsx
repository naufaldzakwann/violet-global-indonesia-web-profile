import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { site, img } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PT Violet Global Indonesia — Jakarta Barat. Intelligence, cybersecurity, consulting, and green-energy inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="07"
        eyebrow="Contact"
        title="State your"
        accent="mandate."
        lede="Share your mission, RFP, or BoQ — we respond with a scoped approach, timeline, and commercial model."
        image={img.aiGradient}
      />

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-px border border-white/12 bg-white/12">
              <div className="bg-[#0a0a0b] p-7">
                <Eyebrow>Entity</Eyebrow>
                <p className="font-display mt-3 text-2xl uppercase tracking-wide text-[#f4f1eb]">{site.name}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">IT Solutions · Cybersecurity · Digital Intelligence</p>
              </div>
              <div className="bg-[#0a0a0b] p-7">
                <Eyebrow>Address</Eyebrow>
                <p className="mt-3 text-sm leading-6 text-white/60">{site.address}</p>
                <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="font-tech mt-3 inline-block text-[11px] uppercase tracking-[0.2em] text-violet-300 hover:text-white">
                  Google Maps ↗
                </a>
              </div>
              <div className="bg-[#0a0a0b] p-7">
                <Eyebrow>Direct</Eyebrow>
                <a href={`mailto:${site.email}`} className="font-display mt-3 block break-all text-xl uppercase tracking-wide text-[#f4f1eb] transition-colors hover:text-violet-300 md:text-2xl">
                  {site.email}
                </a>
                <p className="font-tech mt-3 text-[10px] uppercase leading-5 tracking-[0.18em] text-white/40">
                  Subject format — Inquiry / [Topic] / [Organization]
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
