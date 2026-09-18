"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";

export default function ContactForm() {
  const { d } = useLanguage();
  const c = d.contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", email: "", topic: c.topics[0], message: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry - ${form.topic} - ${form.org || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nOrganization: ${form.org}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-emerald-600/30 bg-emerald-500/[0.08] p-10 text-center dark:border-emerald-400/30 dark:bg-emerald-400/[0.06]">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-700 dark:text-emerald-400" />
        <h2 className="font-display mt-4 text-2xl uppercase tracking-wide text-[#141419] dark:text-[#f4f1eb]">{c.sentTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-600 dark:text-white/60">{c.sentBody}</p>
        <button
          onClick={() => setSent(false)}
          className="font-tech mt-6 cursor-pointer border border-stone-900/25 px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-stone-800 transition-colors hover:border-violet-500 hover:bg-violet-600 hover:text-white dark:border-white/25 dark:text-white"
        >
          {c.sendAnother}
        </button>
      </div>
    );
  }

  const input =
    "w-full border border-stone-900/15 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-violet-600 focus:ring-2 focus:ring-violet-200 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:focus:ring-violet-900";
  const label = "font-tech mb-2 block text-[10px] uppercase tracking-[0.22em] text-stone-500 dark:text-white/50";

  return (
    <form onSubmit={onSubmit} className="border border-stone-900/10 bg-white p-7 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.25)] md:p-10 dark:border-white/12 dark:bg-[#0d0d10] dark:shadow-none">
      <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-violet-700 dark:text-violet-400">{c.formKicker}</p>
      <h2 className="font-display mt-3 text-3xl uppercase tracking-wide text-[#141419] md:text-4xl dark:text-[#f4f1eb]">{c.formTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-white/55">{c.formNote}</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>{c.name} *</label>
          <input id="cf-name" required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cf-org" className={label}>{c.org}</label>
          <input id="cf-org" className={input} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>{c.email} *</label>
          <input id="cf-email" required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="cf-topic" className={label}>{c.topic}</label>
          <select id="cf-topic" className={`${input} [&>option]:bg-white dark:[&>option]:bg-[#0d0d10]`} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
            {c.topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-msg" className={label}>{c.message} *</label>
          <textarea id="cf-msg" required rows={6} className={input} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </div>
      </div>
      <button type="submit" className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-violet-700 px-8 py-4 font-tech text-[11px] uppercase tracking-[0.25em] text-white transition-colors hover:bg-violet-600 sm:w-auto dark:bg-violet-600 dark:hover:bg-violet-500">
        <Send className="h-3.5 w-3.5" /> {c.submit}
      </button>
    </form>
  );
}
