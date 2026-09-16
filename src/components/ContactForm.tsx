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
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h2 className="mt-3 font-display text-xl font-bold text-slate-950">Thank you — your email draft is ready</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          Your mail client should have opened with a pre-filled message to {site.email}.
          If not, email us directly — we respond within 1–2 business days.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold text-slate-950">Send an inquiry</h2>
      <p className="mt-1 text-sm text-slate-600">
        Static site — submitting opens your email client addressed to {site.email}. No data is stored on this website.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold text-slate-800">Full name *</label>
          <input id="cf-name" required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="cf-org" className="mb-1.5 block text-sm font-semibold text-slate-800">Organization</label>
          <input id="cf-org" className={input} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="Ministry / Company" />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold text-slate-800">Work email *</label>
          <input id="cf-email" required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@org.go.id" />
        </div>
        <div>
          <label htmlFor="cf-topic" className="mb-1.5 block text-sm font-semibold text-slate-800">Topic</label>
          <select id="cf-topic" className={input} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
            {["Platforms & Intelligence", "Cybersecurity", "Consulting", "Green Energy & Waste", "IT Procurement", "Other"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-msg" className="mb-1.5 block text-sm font-semibold text-slate-800">Message *</label>
          <textarea id="cf-msg" required rows={6} className={input} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your mandate, timeline, and scope…" />
        </div>
      </div>
      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-700 px-6 py-3 text-sm font-bold text-white hover:bg-violet-600 sm:w-auto">
        <Send className="h-4 w-4" /> Send via email
      </button>
    </form>
  );
}
