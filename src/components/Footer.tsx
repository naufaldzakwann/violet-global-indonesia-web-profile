import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080412] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <div className="leading-tight">
              <p className="text-base font-bold text-white">VIOLET</p>
              <p className="text-[11px] tracking-[0.18em] text-violet-300">
                GLOBAL INDONESIA
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            AI-powered solutions, digital intelligence, cybersecurity, and
            technology-enabled sustainable infrastructure.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Orchestrating Intelligence, Defining the Future.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Solutions
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-white" href="/platforms">Narativa-X Intelligence</Link></li>
            <li><Link className="hover:text-white" href="/platforms">Blockchain Analytics</Link></li>
            <li><Link className="hover:text-white" href="/cybersecurity">Cybersecurity Services</Link></li>
            <li><Link className="hover:text-white" href="/consulting">Strategic Consulting</Link></li>
            <li><Link className="hover:text-white" href="/green-energy">Green & Renewable Energy</Link></li>
            <li><Link className="hover:text-white" href="/procurement">IT Procurement</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="hover:text-white" href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <address className="mt-4 space-y-3 text-sm not-italic leading-6 text-slate-400">
            <p>{site.address}</p>
            <p>
              <a href={`mailto:${site.email}`} className="text-violet-300 hover:text-white">
                {site.email}
              </a>
            </p>
            <p>
              <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">
                View on Google Maps
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>vgi.web.id — Jakarta, Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
