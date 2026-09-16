import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PackageCheck, Server, ShieldCheck, Network, KeyRound } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Card } from "@/components/Section";

export const metadata: Metadata = {
  title: "Procurement",
  description:
    "Professional IT procurement services — hardware, software, security appliances, network, servers, and licensing by Violet Global Indonesia.",
};

const cats = [
  { icon: Server, title: "Hardware & software", desc: "End-to-end sourcing with genuine licensing and warranty discipline." },
  { icon: ShieldCheck, title: "Security equipment & appliances", desc: "Firewalls, IDS/IPS, EDR, SIEM appliances, and HSMs." },
  { icon: Network, title: "Network infrastructure", desc: "Switching, routing, wireless, and structured cabling at enterprise grade." },
  { icon: PackageCheck, title: "Server & storage solutions", desc: "Compute, storage, backup, and hyperconverged platforms." },
  { icon: KeyRound, title: "Licensing & subscription", desc: "Lifecycle management for renewals, true-ups, and compliance." },
];

export default function ProcurementPage() {
  return (
    <>
      <PageHero
        eyebrow="Procurement"
        title="Professional procurement, without the procurement pain"
        lede="PT Violet Global Indonesia provides professional procurement services for IT infrastructure and security solutions — specified correctly, sourced genuinely, delivered and documented."
      >
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
          Request a quotation <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Categories"
              title="What we procure"
              lede="Five categories covering the full enterprise stack — each with specification support and vendor evaluation."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 0.05, 0.2)}>
                <Card className="h-full">
                  <c.icon className="h-7 w-7 text-violet-700" />
                  <h3 className="mt-3 font-display font-bold text-slate-950">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{c.desc}</p>
                </Card>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-slate-950 p-6 text-white">
                <div>
                  <h3 className="font-display font-bold">How we run it</h3>
                  <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                    {["Requirements & specification", "Vendor evaluation & BoQ", "Commercial proposal & timeline", "Delivery, installation & BAST", "Warranty & after-sales support"].map((s, idx) => (
                      <li key={s} className="flex gap-3">
                        <span className="font-bold text-violet-300">{idx + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                </div>
                <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-white">
                  Send your BoQ / RFP <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Ecosystem"
              title="ISP & infrastructure partners"
              lede="We collaborate with internet and infrastructure providers to support platform operations and deployments."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["ISP", "Telkom Indonesia, Biznet, CBN, FirstMedia"],
              ["Data Center", "DCI Indonesia, NTT Indonesia, Equinix"],
              ["Cloud Provider", "AWS, Google Cloud Platform, Alibaba Cloud"],
            ].map(([k, v]) => (
              <Reveal key={k}>
                <Card className="h-full">
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-700">{k}</p>
                  <p className="mt-2 font-medium leading-6 text-slate-800">{v}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
