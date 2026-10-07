"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";
import { PageHeroDotGrid } from "@/components/ui/PageHeroDotGrid";
import { formatDate } from "@/lib/utils";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  category: string;
  categoryLabel: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime?: string;
  tags?: string[];
};

export function BlogContent({ posts, locale, categories, categoryLabels }: {
  posts: Post[];
  locale: string;
  categories: string[];
  categoryLabels: Record<string, Record<string, string>>;
}) {
  const t = useTranslations("blog");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = posts.filter((post) => {
    const matchCat = activeCategory === "all" || post.category === activeCategory;
    const matchSearch = !search
      || post.title.toLowerCase().includes(search.toLowerCase())
      || post.excerpt.toLowerCase().includes(search.toLowerCase())
      || post.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="blog-content-shell">
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
                {locale === "id" ? "Wawasan" : "Tech"}
              </span>
              <br />
              <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.25)]">
                {locale === "id" ? "& Berita" : "& Insights"}
              </span>
            </h1>
          </AnimateOnView>

          <AnimateOnView delay={200}>
            <p className="text-white/50 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </AnimateOnView>
        </div>

        {/* The Curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none">
            <path className="page-hero-curve" d="M0 60L1440 60L1440 10C1200 50 720 0 0 40L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Search + Filter + Grid */}
      <section className="section-padding bg-white">
        <div className="section-container">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search")}
              className="form-input pl-11"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
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
                {categoryLabels[cat]?.[locale] || cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((post, i) => (
                <AnimateOnView key={post.id} delay={i * 70}>
                  <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
                    <article className="flex flex-col h-full bg-white transition-all duration-500">
                      {/* Image Frame */}
                      <div className="blog-card-image-frame relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                        />
                        
                        {/* Floating Category Tag */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white bg-violet-600/90 backdrop-blur-md shadow-lg shadow-violet-600/20">
                            {post.categoryLabel}
                          </span>
                        </div>

                        {/* Read Time Overlay */}
                        {post.readTime && (
                           <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <Icon name="Clock" size={12} />
                            {post.readTime} {t("readTime")}
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col flex-1 px-2">
                        {/* Meta */}
                        <div className="flex items-center gap-2 text-[10px] font-bold text-violet-500 uppercase tracking-widest mb-3">
                          <span>{formatDate(post.publishedAt, locale)}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-slate-400 font-medium lowercase italic">by {post.author}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4 leading-[1.3] group-hover:text-violet-600 transition-colors line-clamp-2" style={{ fontFamily: "var(--font-poppins)" }}>
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-light">
                          {post.excerpt}
                        </p>

                        {/* Footer / Interaction */}
                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div className="blog-author-avatar w-8 h-8 rounded-full border border-slate-100 overflow-hidden relative shadow-sm">
                               {post.authorAvatar ? (
                                 <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" />
                               ) : (
                                 <div className="w-full h-full flex items-center justify-center text-slate-400">
                                   <Icon name="User" size={16} />
                                 </div>
                               )}
                            </div>
                            <span className="text-xs font-semibold text-slate-800">{post.author}</span>
                          </div>
                          
                          <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:border-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                            <Icon name="ArrowRight" size={16} />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimateOnView>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
              <p>{t("noResults")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
