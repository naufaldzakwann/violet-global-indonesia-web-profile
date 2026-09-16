import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  BrainCircuit,
  Radar,
  Leaf,
  Eye,
  Layers,
  Zap,
  Lock,
  Gauge,
  Building2,
  CheckCircle2,
  Server,
  Network,
  Fingerprint,
  Bug,
  Siren,
  Microscope,
  ShoppingCart,
  LineChart,
  Cpu,
  Handshake,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { SectionHeading, Card } from "@/components/Section";
import { site, pillars } from "@/lib/site";

const values = [
  { icon: Gauge, title: "Accuracy", desc: "High precision in analysis, monitoring, and detection — no noise, only signal." },
  { icon: Zap, title: "Speed", desc: "Real-time monitoring and responsive execution when seconds matter." },
  { icon: BrainCircuit, title: "Intelligence", desc: "AI-powered insights rather than raw data alone." },
  { icon: Lock, title: "Security", desc: "Strong protection for data, systems, and operational assets." },
  { icon: Radar, title: "Actionable", desc: "Every insight maps to a practical decision or action." },
  { icon: Leaf, title: "Sustainability", desc: "Technology and infrastructure that create measurable long-term value." },
];

const platforms = [
  {
    icon: Eye,
    name: "Narativa-X",
    tag: "Social Media Intelligence Platform",
    desc: "AI-based media intelligence for monitoring, analyzing, and responding to public conversations — with native Indonesian language support.",
    points: [
      "Multi-platform monitoring: social, news portals, dark web",
      "AI sentiment analysis tuned for Indonesian",
      "Early detection of misinformation & negative campaigns",
      "Network mapping & key-actor identification",
      "Real-time dashboard & automated reporting",
    ],
  },
  {
    icon: Layers,
    name: "Cryptocurrency Analytics",
    tag: "Blockchain Intelligence & Compliance",
    desc: "Transaction monitoring, forensic investigation, and regulatory compliance across major blockchains.",
    points: [
      "Real-time multi-blockchain transaction monitoring",
      "Network analysis & wallet clustering",
      "Suspicious-activity detection: laundering, fraud",
      "Forensic tooling with court-ready evidence",
      "Integration with i2 Analyst Notebook",
    ],
  },
  {
    icon: Cpu,
    name: "Enterprise Automation",
    tag: "Secure Social Media Automation",
    desc: "A secure, scalable automation platform for enterprise communications and engagement operations.",
    points: [
      "Tens of thousands of accounts from one dashboard",
      "Smart engagement with natural patterns",
      "Video & live-stream amplification",
      "Growth & engagement ROI analytics",
      "Automated bulk content reporting",
    ],
  },
];

const security = [
  { icon: Bug, title: "AI-Powered Penetration Testing", desc: "AI-assisted vulnerability identification across apps, networks, and APIs." },
  { icon: Microscope, title: "AI Exploit Research", desc: "Controlled exploit R&D to validate defenses before adversaries do." },
  { icon: Siren, title: "Security Operations Center", desc: "24/7 monitoring, triage, and escalation by analysts." },
  { icon: Fingerprint, title: "Incident Response & Forensics", desc: "Containment, eradication, forensic analysis, and lessons learned." },
];

const infra = [
  { title: "SIEM Implementation", desc: "SIEM deployment, tuning, and managed detection rules." },
  { title: "Network Security", desc: "Segmentation, firewalling, IDS/IPS, and secure architecture." },
  { title: "Endpoint Protection", desc: "EDR rollout, hardening, and response playbooks." },
  { title: "Identity Management", desc: "IAM, MFA, privileged access, and lifecycle governance." },
];

const consulting = [
  {
    no: "01",
    icon: LineChart,
    title: "Market Entry Consultant",
    sub: "Open market-entry doors with the right strategy",
    points: ["Data & AI-driven market research", "Regulatory, licensing & compliance mapping", "Positioning & penetration strategy", "Go-to-market roadmap & execution support"],
  },
  {
    no: "02",
    icon: Server,
    title: "Strategic Technology Consultant",
    sub: "Architecture for competitive advantage",
    points: ["IT strategy & transformation roadmap", "Enterprise architecture assessment", "AI/ML & data infrastructure strategy", "Cloud, security & compliance advisory"],
  },
  {
    no: "03",
    icon: Building2,
    title: "Business Development Consultant",
    sub: "Accelerate sustainable growth",
    points: ["Pipeline development & lead generation", "Partnership & alliance building", "Tender & enterprise proposal support", "Revenue & pricing strategy"],
  },
  {
    no: "04",
    icon: Handshake,
    title: "Prospective Market Enabler",
    sub: "Activate untapped potential",
    points: ["Opportunity identification & validation", "Ecosystem & stakeholder mapping", "Pilot & proof-of-concept design", "Public-Private Partnership facilitation"],
  },
];

const whyUs = [
  { title: "Experienced Team", desc: "Proven track record in complex analytics systems for demanding institutions." },
  { title: "Local Technology", desc: "AI specifically trained for Indonesian language and context." },
  { title: "Proven Platform", desc: "Narativa is operational and production-tested." },
  { title: "Enterprise Ready", desc: "Scalable infrastructure for large data volumes." },
  { title: "24/7 Support", desc: "Responsive team for mission-critical operations." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B0618]">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[70rem] -translate-x-1/2 rounded-full bg-violet-700/30 blur-[130px]" aria-hidden="true" />
        <div className="absolute top-40 -left-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-violet-200 uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              PT Violet Global Indonesia — Deep Tech
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-6xl sm:leading-[1.05]">
              Orchestrating Intelligence, Defining the Future
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-9">
              A digital ecosystem architect integrating AI, data infrastructure,
              cybersecurity, and sustainable infrastructure — helping government
              institutions and corporations protect assets, improve efficiency,
              and decide with confidence.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-950/50 transition hover:bg-violet-500"
              >
                Explore our solutions <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk to our team <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-10 flex flex-wrap gap-2">
              {pillars.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["24/7", "Security monitoring"],
                ["ID-Native", "Indonesian NLP"],
                ["Multi-source", "OSINT coverage"],
                ["Gov + Enterprise", "Deployment ready"],
              ].map(([k, v]) => (
                <div key={v} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <dt className="font-display text-xl font-bold text-white sm:text-2xl">{k}</dt>
                  <dd className="mt-1 text-xs text-slate-400 sm:text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* PARTNERS STRIP */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
            Operating on Indonesia&apos;s leading infrastructure
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-500">
            {["Telkom Indonesia", "Biznet", "CBN", "DCI Indonesia", "NTT Indonesia", "AWS", "Google Cloud", "Alibaba Cloud"].map((p) => (
              <span key={p} className="whitespace-nowrap">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Company overview"
                title="About PT Violet Global Indonesia"
                lede="A deep-tech company and digital transformation consultant focused on advanced AI, strategic data infrastructure, cybersecurity, digital intelligence, and technology-enabled sustainable infrastructure."
              />
              <p className="mt-5 leading-7 text-slate-600">
                Violet acts as a <strong>Digital Ecosystem Architect</strong> —
                integrating technology, data, infrastructure, and strategic
                partnerships to support complex decision-making and long-term
                transformation.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
              >
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-700 via-violet-800 to-[#2A1656] p-7 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <Leaf className="h-6 w-6 text-emerald-300" />
                  <h3 className="font-display text-lg font-bold">Green & Renewable Energy Expansion</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-violet-100">
                  Violet is developing an integrated Green & Renewable Energy
                  sector connecting digital intelligence with energy and
                  environmental infrastructure — renewable power, waste-to-energy,
                  energy management, circular economy, and data-driven
                  environmental monitoring.
                </p>
                <p className="mt-3 text-sm leading-6 text-violet-100">
                  Objective: connected projects where digital technology improves
                  planning, monitoring, efficiency, security, and scalability of
                  sustainable infrastructure.
                </p>
                <Link
                  href="/green-energy"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-50"
                >
                  Explore green energy <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Core values"
              title="What drives us"
              align="center"
              lede="Six operating principles behind every deployment — from intelligence missions to energy infrastructure."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i * 0.06, 0.3)}>
                <Card className="h-full">
                  <v.icon className="h-7 w-7 text-violet-700" />
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-950">{v.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{v.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="bg-[#0B0618]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Digital intelligence, AI & platforms"
              title="Our platform solutions"
              lede="Production-grade platforms for intelligence, compliance, and enterprise operations — deployable on-premise or in sovereign cloud."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {platforms.map((p, i) => (
              <Reveal key={p.name} delay={Math.min(i * 0.08, 0.24)} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <p.icon className="h-8 w-8 text-violet-300" />
                  <h3 className="mt-4 font-display text-xl font-bold text-white">{p.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">{p.tag}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{p.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm leading-6 text-slate-300">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8">
              <Link href="/platforms" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-violet-100">
                Full platform details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CYBER */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Cybersecurity services"
              title="Comprehensive security solutions"
              lede="Offensive testing, 24/7 defense, and enterprise hardening — aligned to ISO 27001 and PCI-DSS expectations."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {security.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.06, 0.24)}>
                <Card className="h-full">
                  <s.icon className="h-7 w-7 text-violet-700" />
                  <h3 className="mt-4 font-semibold text-slate-950">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-violet-700" />
                  <h3 className="font-display font-bold text-slate-950">Enterprise security infrastructure</h3>
                </div>
                <dl className="mt-4 space-y-3">
                  {infra.map((x) => (
                    <div key={x.title} className="flex justify-between gap-4 border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                      <dt className="text-sm font-semibold text-slate-900">{x.title}</dt>
                      <dd className="max-w-[60%] text-right text-sm text-slate-600">{x.desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-violet-700" />
                  <h3 className="font-display font-bold text-slate-950">Security education & compliance</h3>
                </div>
                <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-700">
                  {["Security assessment & audit", "Risk assessment & compliance (ISO 27001, PCI-DSS)", "Security awareness training", "Technical skill development"].map((t) => (
                    <li key={t} className="flex gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-violet-700" /> {t}
                    </li>
                  ))}
                </ul>
                <Link href="/cybersecurity" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
                  Explore cybersecurity <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONSULTING */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Consulting"
              title="Strategic consulting services"
              lede="From market entry to technology architecture — senior advisors backed by data and AI."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {consulting.map((c, i) => (
              <Reveal key={c.no} delay={Math.min(i * 0.06, 0.2)}>
                <Card className="h-full">
                  <div className="flex items-center justify-between">
                    <c.icon className="h-7 w-7 text-violet-700" />
                    <span className="font-display text-3xl font-bold text-violet-200">{c.no}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-950">{c.title}</h3>
                  <p className="text-sm font-medium text-violet-700">{c.sub}</p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-slate-600">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-violet-500" aria-hidden="true">✦</span> {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/consulting" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">
              Consulting details <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* GREEN ENERGY */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Green & renewable energy"
                title="Technology-enabled energy solutions"
                lede="Violet complements its AI, cybersecurity, and smart-waste capabilities with technology-enabled energy development — supporting decarbonization, resource recovery, and energy resilience."
              />
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
                Projects below are Violet&apos;s target development opportunities and
                business-development pipeline concepts — not completed or
                commissioned projects unless separately stated.
              </div>
              <Link href="/green-energy" className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
                Green energy pipeline <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["01", "Identify", "Assess demand, feedstock, site, infrastructure & stakeholders."],
                ["02", "Design", "Technical concepts & roadmaps with qualified partners."],
                ["03", "Integrate", "Connect assets to IoT, AI, cybersecurity & data platforms."],
                ["04", "Finance & Partner", "PPP structures & project-financing pathways."],
                ["05", "Implement", "Development, procurement & commissioning support."],
                ["06", "Monitor", "Digital monitoring & performance management."],
              ].map(([no, t, d], i) => (
                <Reveal key={t} delay={Math.min(i * 0.05, 0.25)}>
                  <Card className="h-full border-emerald-100">
                    <p className="text-xs font-bold text-emerald-700">{no}</p>
                    <h3 className="mt-1 font-display font-bold text-slate-950">{t}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{d}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCUREMENT + WHY */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-slate-950 p-7 text-white">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6 text-violet-300" />
                  <h3 className="font-display text-xl font-bold">IT Procurement Services</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Professional procurement for IT infrastructure and security —
                  hardware & software, security appliances, network
                  infrastructure, servers & storage, and licensing.
                </p>
                <Link href="/procurement" className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500">
                  Procurement details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-7">
                <h3 className="font-display text-xl font-bold text-slate-950">Why choose Violet</h3>
                <ul className="mt-4 space-y-3">
                  {whyUs.map((w) => (
                    <li key={w.title} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                      <div>
                        <p className="text-sm font-bold text-slate-950">{w.title}</p>
                        <p className="text-sm text-slate-600">{w.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B0618]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-800 to-[#2A1656] p-8 sm:p-12">
              <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-white text-balance sm:text-4xl">
                    Let&apos;s discuss your intelligence, security, or energy mandate.
                  </h2>
                  <p className="mt-3 max-w-xl leading-7 text-violet-100">
                    Share your mission or RFP — we respond with a scoped approach,
                    timeline, and commercial model. Jakarta-based, nationwide deployment.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-violet-900 hover:bg-violet-50">
                    Contact us <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
