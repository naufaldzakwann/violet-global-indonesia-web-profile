"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";
import { PageHeroDotGrid } from "@/components/ui/PageHeroDotGrid";
import { services } from "@/lib/data/services";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  fullName: "", email: "", phone: "",
  service: "", message: "",
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="contact-page portfolio-atmosphere pt-20 min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-6">
          <AnimateOnView>
            <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-violet-200">
              <Icon name="Check" size={32} />
            </div>
            <h2 className="text-3xl font-medium text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
              {t("form.successTitle")}
            </h2>
            <p className="text-slate-500 mb-10 font-light leading-relaxed">{t("form.successMsg")}</p>
            <button onClick={() => setStatus("idle")} className="text-violet-600 font-semibold hover:underline">
              Send another message
            </button>
          </AnimateOnView>
        </div>
      </div>
    );
  }

  return (
    <main className="contact-page portfolio-atmosphere pt-20 bg-white selection:bg-violet-100 selection:text-violet-900">
      {/* 1. Spotlight Hero */}
      <section className="relative overflow-hidden py-24 bg-[#06040a]">
        <PageHeroDotGrid />

        <div className="section-container relative z-10 text-center">
          <AnimateOnView>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-6 bg-violet-500/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400">
                {t("badge")}
              </span>
              <div className="h-px w-6 bg-violet-500/30" />
            </div>
          </AnimateOnView>

          <AnimateOnView delay={100}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.2]">
              <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                {locale === "id" ? "Hubungi" : "Connect"}
              </span>
              <br />
              <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.25)]">
                {locale === "id" ? "Kami" : "With Us"}
              </span>
            </h1>
          </AnimateOnView>

          <AnimateOnView delay={200}>
            <p className="text-white/50 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </AnimateOnView>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none">
            <path className="page-hero-curve" d="M0 60L1440 60L1440 10C1200 50 720 0 0 40L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      <div className="contact-content-shell max-w-6xl mx-auto px-4 pb-24">
        {/* 2. Contact Information Grid */}
        <section className="py-16 sm:py-20">
          <div className="grid md:grid-cols-3 gap-12 sm:gap-0 items-start">
            {/* Call Us */}
            <AnimateOnView className="flex flex-col items-center text-center px-8 relative">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 transition-transform hover:scale-110 duration-300">
                <Icon name="Phone" size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Call Us</h3>
              <p className="text-xs text-slate-400 mb-4 font-medium">WhatsApp Available</p>
              <a href={`tel:${t("info.phoneVal")}`} className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors">{t("info.phoneVal")}</a>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-slate-100" />
            </AnimateOnView>

            {/* Instagram */}
            <AnimateOnView delay={100} className="flex flex-col items-center text-center px-8 relative">
              <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mb-6 transition-transform hover:scale-110 duration-300">
                <Icon name="Instagram" size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Instagram</h3>
              <p className="text-xs text-slate-400 mb-4 font-medium">@violetglobal.id</p>
              <a href="https://instagram.com/violetglobal.id" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-900 hover:text-pink-600 transition-colors">Follow Us</a>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-slate-100" />
            </AnimateOnView>

            {/* Email Us */}
            <AnimateOnView delay={200} className="flex flex-col items-center text-center px-8">
              <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 mb-6 transition-transform hover:scale-110 duration-300">
                <Icon name="Mail" size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Email Us</h3>
              <p className="text-xs text-slate-400 mb-4 font-medium">Available 24/7</p>
              <a href={`mailto:${t("info.emailVal")}`} className="text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">{t("info.emailVal")}</a>
            </AnimateOnView>
          </div>
        </section>

        {/* 3. The Form Card (Refined Sharp Elegant Version) */}
        <AnimateOnView delay={300}>
          <div className="contact-form-card max-w-5xl mx-auto relative rounded-2xl overflow-hidden border border-violet-500/30 bg-[linear-gradient(145deg,#43206b_0%,#5f2f8c_48%,#4B0082_100%)] px-6 py-12 shadow-[0_28px_90px_rgba(75,0,130,0.28),0_10px_24px_rgba(15,23,42,0.12)] sm:px-16 sm:py-16">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)]" />
            <div className="absolute inset-[1px] rounded-[calc(1rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)]" />
            <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-violet-300/25 blur-3xl" />
            <div className="absolute -bottom-24 left-0 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />
            <div className="relative z-10 text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                {locale === "id" ? "Kirim Pesan" : "Send a Message"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">{t("form.fullName")}</label>
                  <input
                    type="text" required value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Name"
                    className="w-full bg-white border-none rounded-lg px-5 py-4 focus:ring-4 focus:ring-white/20 outline-none transition-all text-slate-900 placeholder:text-slate-300 text-sm shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Email Address</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    className="w-full bg-white border-none rounded-lg px-5 py-4 focus:ring-4 focus:ring-white/20 outline-none transition-all text-slate-900 placeholder:text-slate-300 text-sm shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">{t("form.phone")}</label>
                  <input
                    type="tel" required value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone"
                    className="w-full bg-white border-none rounded-lg px-5 py-4 focus:ring-4 focus:ring-white/20 outline-none transition-all text-slate-900 placeholder:text-slate-300 text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">{t("form.message")}</label>
                <textarea
                  required value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white border-none rounded-lg px-5 py-4 focus:ring-4 focus:ring-white/20 outline-none transition-all text-slate-900 placeholder:text-slate-300 text-sm min-h-[160px] resize-none shadow-sm"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit" disabled={status === "loading"}
                  className="inline-flex items-center gap-3 px-16 py-4 rounded-lg bg-white text-violet-700 font-bold hover:bg-slate-50 transition-all duration-300 shadow-2xl shadow-black/20 disabled:opacity-50"
                >
                  {status === "loading" ? "..." : t("form.submit")}
                  <Icon name="ArrowRight" size={18} />
                </button>
              </div>
            </form>
          </div>
        </AnimateOnView>

        {/* 4. Address & Map Section */}
        <section className="mt-24">
          <AnimateOnView delay={400} className="text-center mb-12">
            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-[0.5em] mb-4 block">Visit Our Studio</span>
            <h3 className="text-xl md:text-2xl font-medium text-slate-800 tracking-tight leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "var(--font-poppins)" }}>
              {t("info.addressVal")}
            </h3>
          </AnimateOnView>

          <AnimateOnView delay={500} className="rounded-2xl overflow-hidden border border-slate-100 h-[450px] shadow-2xl shadow-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJalan%20Teknologi!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </AnimateOnView>
        </section>
      </div>
    </main>
  );
}
