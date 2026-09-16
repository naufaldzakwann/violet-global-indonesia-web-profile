"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", email: "", topic: "Platforms & Intelligence", message: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry — ${form.topic} — ${form.org || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nOrganization: ${form.org}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-emerald-400/30 bg-emerald-400/[0.06] p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
        <h2 className="font-display mt-4 text-2xl uppercase tracking-wide text-[#f4f1eb]">Draft ready — check your mail app</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/60">
          Your client should have opened with a pre-filled message to {site.email}.
          If not, email us directly — response within 1–2 business days.
        </p>
        <button
          onClick={() => setSent(false)}
          className="font-tech mt-6 border border-white/25 px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:border-violet-500 hover:bg-violet-600"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const input =
    "w-full border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-500 focus:bg-white/[0.06]";
  const label = "font-tech mb-2 block text-[10px] uppercase tracking-[0.22em] text-white/50";

  return (
    <form onSubmit={onSubmit} className="border border-white/12 bg-[#0d0d10] p-7 md:p-10">
      <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-violet-400">[ Transmission ]</p>
      <h2 className="font-display mt-3 text-3xl uppercase tracking-wide text-[#f4f1eb] md:text-4xl">Send an inquiry</h2>
      <p className="mt-3 text-sm leading-6 text-white/55">
        Static site — submitting opens your mail client addressed to {site.email}. Nothing is stored here.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Full name *</label>
          <input id="cf-name" required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cf-org" className={label}>Organization</label>
          <input id="cf-org" className={input} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="Ministry / Company" autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Work email *</label>
          <input id="cf-email" required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@org.go.id" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="cf-topic" className={label}>Topic</label>
          <select id="cf-topic" className={`${input} [&>option]:bg-[#0d0d10]`} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
            {["Platforms & Intelligence", "Cybersecurity", "Consulting", "Green Energy & Waste", "IT Procurement", "Other"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-msg" className={label}>Message *</label>
          <textarea id="cf-msg" required rows={6} className={input} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Mandate, timeline, scope…" />
        </div>
      </div>
      <button type="submit" className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-violet-600 px-8 py-4 font-tech text-[11px] uppercase tracking-[0.25em] text-white transition-colors hover:bg-violet-500 sm:w-auto">
        <Send className="h-3.5 w-3.5" /> Transmit via email
      </button>
    </form>
  );
}
