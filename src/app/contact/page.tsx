import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Card } from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { Mail, MapPin, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PT Violet Global Indonesia — Jakarta Barat. Intelligence, cybersecurity, consulting, and green-energy inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your mandate"
        lede="Share your mission, RFP, or BoQ — we respond with a scoped approach, timeline, and commercial model."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              <Card>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-violet-700" />
                  <h2 className="font-display font-bold text-slate-950">Company information</h2>
                </div>
                <dl className="mt-4 space-y-3 text-sm leading-6">
                  <div><dt className="font-semibold text-slate-900">Company</dt><dd className="text-slate-600">{site.name}</dd></div>
                  <div><dt className="font-semibold text-slate-900">Business field</dt><dd className="text-slate-600">IT Solutions, Cybersecurity, Digital Intelligence</dd></div>
                  <div><dt className="font-semibold text-slate-900">Website</dt><dd className="text-violet-700">www.vgi.web.id</dd></div>
                </dl>
              </Card>
              <Card>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-violet-700" />
                  <h2 className="font-display font-bold text-slate-950">Address</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{site.address}</p>
                <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-semibold text-violet-700 hover:text-violet-900">
                  View on Google Maps →
                </a>
              </Card>
              <Card>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-violet-700" />
                  <h2 className="font-display font-bold text-slate-950">Email</h2>
                </div>
                <a href={`mailto:${site.email}`} className="mt-3 block font-semibold text-violet-700 hover:text-violet-900">
                  {site.email}
                </a>
                <p className="mt-1 text-xs text-slate-500">For fastest response include subject: Inquiry — [Topic] — [Organization]</p>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
