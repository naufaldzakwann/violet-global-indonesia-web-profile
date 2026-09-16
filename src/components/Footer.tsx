import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="noise relative overflow-hidden border-t border-white/10 bg-[#08070c]">
      {/* Giant CTA */}
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-violet-400">
          [ Working — Worldwide ]
        </p>
        <Link href="/contact" className="group mt-4 block" aria-label="Contact us">
          <span className="font-display block text-[19vw] uppercase leading-[0.85] text-[#f4f1eb] transition-colors duration-300 group-hover:text-violet-300 md:text-[11rem] lg:text-[13rem]">
            Let&apos;s Talk
          </span>
          <span className="mt-4 flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-600">
              <ArrowUpRight className="h-5 w-5 text-white" />
            </span>
            <span className="font-tech text-xs uppercase tracking-[0.25em] text-white/60">
              Enquire — response within 1–2 business days
            </span>
          </span>
        </Link>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <div className="leading-none">
                <p className="font-display text-xl tracking-wide">VIOLET</p>
                <p className="font-tech mt-1 text-[9px] tracking-[0.28em] text-white/50">GLOBAL INDONESIA</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              AI-powered solutions, digital intelligence, cybersecurity, and
              technology-enabled sustainable infrastructure.
            </p>
          </div>
          <div>
            <h3 className="font-tech text-[11px] uppercase tracking-[0.25em] text-white/40">Solutions</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link className="transition-colors hover:text-white" href="/platforms">Narativa-X Intelligence</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/platforms">Blockchain Analytics</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/cybersecurity">Cybersecurity</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/consulting">Consulting</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/green-energy">Green Energy</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/procurement">Procurement</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-tech text-[11px] uppercase tracking-[0.25em] text-white/40">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {nav.map((n) => (
                <li key={n.href}><Link className="transition-colors hover:text-white" href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-tech text-[11px] uppercase tracking-[0.25em] text-white/40">Enquiries</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a className="text-violet-300 hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li className="leading-6 text-white/55">{site.address}</li>
              <li><a href={site.mapsUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">Google Maps ↗</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-5 py-5 font-tech text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>© {new Date().getFullYear()} {site.name} — All rights reserved</p>
          <p>vgi.web.id — Jakarta, Indonesia</p>
          <a href="#top" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
