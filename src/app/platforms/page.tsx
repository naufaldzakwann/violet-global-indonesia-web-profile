import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Eye, Layers, Cpu, Server, Lock, FileText } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Platforms",
  description:
    "Narativa-X social intelligence, blockchain analytics, and enterprise automation — AI platforms by Violet Global Indonesia.",
};

function PlatformDetail({
  icon: Icon,
  name,
  tag,
  desc,
  capabilities,
  useCases,
  deployment,
  flip = false,
}: {
  icon: typeof Eye;
  name: string;
  tag: string;
  desc: string;
  capabilities: string[];
  useCases: string[];
  deployment: string[];
  flip?: boolean;
}) {
  return (
    <div className={`grid gap-8 lg:grid-cols-2 lg:items-start ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <Reveal>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
          <Icon className="h-9 w-9 text-violet-300" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{tag}</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white">{name}</h3>
          <p className="mt-3 leading-7 text-slate-300">{desc}</p>
          <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-white">Key capabilities</h4>
          <ul className="mt-3 space-y-2.5">
            {capabilities.map((c) => (
              <li key={c} className="flex gap-2 text-sm leading-6 text-slate-300">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <FileText className="h-4 w-4 text-violet-300" /> Typical use cases
            </h4>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {useCases.map((u) => (
                <li key={u} className="flex gap-2"><span className="text-violet-400">—</span>{u}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <Server className="h-4 w-4 text-violet-300" /> Deployment
            </h4>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {deployment.map((d) => (
                <li key={d} className="flex gap-2"><Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400" />{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        eyebrow="Platforms"
        title="Production-grade AI platforms for intelligence and compliance"
        lede="Three platforms — social intelligence, blockchain analytics, and enterprise automation — deployable on-premise or in sovereign cloud, with Indonesian-language AI at the core."
      >
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
          Request a demo <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="bg-[#0B0618]">
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
          <PlatformDetail
            icon={Eye}
            name="Narativa-X"
            tag="Social Media Intelligence Platform"
            desc="An AI-based media intelligence platform for monitoring, analyzing, and responding to public conversations. Built for institutions that must understand narrative risk early — elections, policy rollouts, brand crises, and coordinated campaigns."
            capabilities={[
              "Multi-platform monitoring: social media, news portals, dark web",
              "AI-based sentiment analysis with Indonesian language support",
              "Early detection of misinformation and negative campaigns",
              "Network mapping and key-actor identification",
              "Real-time dashboard and automated reporting system",
            ]}
            useCases={[
              "Government communications: track policy sentiment and hoax spread in real time",
              "Corporate reputation: detect coordinated attacks before they trend",
              "Security: map amplification networks and bot-like behavior",
              "Campaigns: daily narrative briefs with actor-level attribution",
            ]}
            deployment={[
              "On-premise for classified environments, or private cloud",
              "Role-based access, audit logs, and data-retention controls",
              "Analyst onboarding and Bahasa Indonesia query training",
            ]}
          />
          <PlatformDetail
            flip
            icon={Layers}
            name="Cryptocurrency Analytics Platform"
            tag="Blockchain Intelligence & Compliance"
            desc="Blockchain analytics for transaction monitoring, forensic investigation, and regulatory compliance. Designed for FIUs, exchanges, banks, and law enforcement handling crypto-related cases."
            capabilities={[
              "Real-time multi-blockchain transaction monitoring",
              "Network analysis and wallet clustering",
              "Suspicious-activity detection (money laundering, fraud)",
              "Forensic investigation tools with court-ready evidence",
              "Integration with i2 Analyst Notebook",
            ]}
            useCases={[
              "AML/KYC: screen wallets and transactions against risk typologies",
              "Investigations: trace fund flows across hops, mixers, and bridges",
              "Compliance: STR-ready exports and case documentation",
              "Supervision: ongoing monitoring of VASPs and high-risk entities",
            ]}
            deployment={[
              "Investigator workstations + shared case server options",
              "Evidence chain-of-custody and export controls",
              "Training for analysts and investigators",
            ]}
          />
          <PlatformDetail
            icon={Cpu}
            name="Enterprise Automation"
            tag="Secure Social Media Automation"
            desc="A secure, scalable automation platform for enterprise communications operations — managing large account fleets, engagement, amplification, and reporting from one dashboard."
            capabilities={[
              "Manage tens of thousands of accounts from one dashboard",
              "Smart engagement — likes, comments, shares with natural patterns",
              "Massive video / live-stream view increase",
              "Analytics dashboard for growth and engagement ROI",
              "Automated bulk content reporting",
            ]}
            useCases={[
              "Public communications: coordinated, compliant amplification",
              "Launches: synchronized publishing and engagement",
              "Operations: centralized governance over distributed teams",
              "Reporting: account-level performance and takedown workflows",
            ]}
            deployment={[
              "Hardened infrastructure with ISP and data-center partners",
              "Granular permissions and operational audit trails",
              "Playbooks for safe, policy-compliant use",
            ]}
          />

          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-800 to-[#2A1656] p-7 text-white">
              <SectionHeading
                dark
                eyebrow="Engagement"
                title="How platform projects run"
                lede="Discovery → scoped pilot → production deployment → managed operations with training and 24/7 support."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/cybersecurity" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-violet-900 hover:bg-violet-50">
                  Pair with cybersecurity
                </Link>
                <Link href="/contact" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                  Scope your use case
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
