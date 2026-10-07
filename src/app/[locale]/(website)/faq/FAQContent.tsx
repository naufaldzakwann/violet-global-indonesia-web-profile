"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";
import { PageHeroDotGrid } from "@/components/ui/PageHeroDotGrid";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export function FAQContent({ initialFaqs, locale }: { initialFaqs: FAQ[]; locale: string }) {
  const t = useTranslations("faq");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(initialFaqs.map((f) => f.category)))];

  const filtered = initialFaqs.filter((faq) => {
    const matchCat = activeCategory === "all" || faq.category === activeCategory;
    const matchSearch = !search
      || faq.question.toLowerCase().includes(search.toLowerCase())
      || faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="faq-content-shell">
      {/* Centered Spotlight Hero */}
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
                {locale === "id" ? "Bantuan &" : "Help &"}
              </span>
              <br />
              <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.25)]">
                {locale === "id" ? "Pertanyaan" : "Support"}
              </span>
            </h1>
          </AnimateOnView>

          <AnimateOnView delay={200}>
            <p className="text-white/50 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed mb-8">
              {t("subtitle")}
            </p>
          </AnimateOnView>

          {/* Search in hero */}
          <AnimateOnView delay={300}>
            <div className="relative max-w-lg mx-auto">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search")}
                className="w-full px-4 py-3 pl-11 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          </AnimateOnView>
        </div>

        {/* The Curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none">
            <path className="page-hero-curve" d="M0 60L1440 60L1440 10C1200 50 720 0 0 40L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-violet-50 hover:text-violet-700"
                }`}
                style={activeCategory === cat ? { background: "var(--gradient-brand)" } : {}}
              >
                {cat === "all" ? t("filterAll") : cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filtered.length > 0 ? filtered.map((faq, i) => {
              const isOpen = activeId === faq.id;

              return (
                <AnimateOnView key={faq.id} delay={i * 50}>
                  <div className={`rounded-2xl overflow-hidden border transition-all ${isOpen ? "border-violet-200 shadow-md" : "border-gray-100"}`}>
                    <button
                      onClick={() => setActiveId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-violet-50 transition-colors"
                    >
                      <span className="font-semibold text-navy pr-4" style={{ fontFamily: "var(--font-poppins)" }}>
                        {faq.question}
                      </span>
                      <Icon
                        name="ChevronDown"
                        size={20}
                        className={`text-violet-600 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
                    >
                      <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm border-t border-violet-50 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </AnimateOnView>
              );
            }) : (
              <div className="text-center py-16 text-gray-400">
                <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
                <p>{t("noResults")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
