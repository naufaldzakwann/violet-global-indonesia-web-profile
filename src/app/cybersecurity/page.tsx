import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bug, Microscope, Siren, Fingerprint, ShieldCheck, GraduationCap } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Card } from "@/components/Section";

export const metadata: Metadata = {
  title: "Cybersecurity",
  description:
    "AI-powered penetration testing, exploit research, SOC 24/7, incident response, and enterprise security infrastructure by Violet Global Indonesia.",
};

const services = [
  {
    icon: Bug,
    title: "AI-Powered Penetration Testing",
    desc: "Security testing using AI for vulnerability identification across web, mobile, API, network, and cloud — with manual validation and executive-ready reporting.",
    points: ["Black / grey / white-box testing", "OWASP, NIST-aligned methodology", "Retest and remediation verification"],
  },
  {
    icon: Microscope,
    title: "AI Exploit Research",
    desc: "Controlled research and development of exploits for defense validation — proving impact so defenses are prioritized by real risk, not CVSS alone.",
    points: ["Proof-of-concept in isolated labs", "Detection-rule development", "Patch-validation support"],
  },
  {
    icon: Siren,
    title: "Security Operations Center",
    desc: "24/7 security monitoring with triage, escalation, and monthly threat briefs — your extended team, not a black-box alert feed.",
    points: ["SIEM monitoring & tuning", "Incident triage & escalation", "Threat-hunting sprints"],
  },
  {
    icon: Fingerprint,
    title: "Incident Response & Forensics",
    desc: "Rapid containment, eradication, and forensic analysis with chain-of-custody discipline — plus post-incident hardening.",
    points: ["Remote & on-site response", "Disk, memory & log forensics", "Post-incident report & roadmap"],
  },
];

export default function CybersecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Cybersecurity"
        title="Offense-informed defense for critical operations"
        lede="Test like an adversary, defend like an institution. Violet combines AI-assisted offensive testing with 24/7 operations and enterprise hardening."
      >
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
          Request security assessment <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Comprehensive security solutions"
              lede="Four core practices covering the full lifecycle — find weakness, prove impact, monitor continuously, respond decisively."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.06, 0.2)}>
                <Card className="h-full">
                  <s.icon className="h-7 w-7 text-violet-700" />
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-950">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="text-violet-500">✓</span>{p}</li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Systems & infrastructure"
                title="Enterprise security infrastructure"
                lede="Design, deploy, and operate the controls your auditors and boards expect."
              />
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {[
                  ["SIEM Implementation", "Implementation, tuning, and managed detection engineering."],
                  ["Network Security", "Segmentation, firewalling, IDS/IPS, Zero-Trust pathways."],
                  ["Endpoint Protection", "EDR rollout, hardening baselines, response playbooks."],
                  ["Identity Management", "IAM, MFA, PAM, and access-lifecycle governance."],
                ].map(([t, d]) => (
                  <div key={t} className="flex flex-col gap-1 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-slate-950">{t}</p>
                    <p className="max-w-md text-sm text-slate-600">{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl bg-slate-950 p-7 text-white">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-violet-300" />
                  <h3 className="font-display text-xl font-bold">Consulting & training</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Security education & compliance for teams that must prove due diligence.
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
                  {[
                    ["Security assessment & audit", "Baseline your posture against a clear control set."],
                    ["Risk assessment & compliance", "ISO 27001 and PCI-DSS readiness, risk registers, remediation plans."],
                    ["Security awareness training", "Phishing-resistant culture for non-technical staff."],
                    ["Technical skill development", "Hands-on upskilling for SOC, IT, and developer teams."],
                  ].map(([t, d]) => (
                    <li key={t} className="flex gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <div><p className="font-semibold text-white">{t}</p><p className="text-slate-300">{d}</p></div>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
                  Discuss your scope <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
