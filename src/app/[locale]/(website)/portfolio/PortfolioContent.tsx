"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Bot,
  ChevronDown,
  Globe,
  LayoutGrid,
  List,
  PenTool,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

type Project = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
  categoryLabel: string;
  client: string;
  year: number | string;
  summary: string;
  outcome: string;
  featured: boolean;
  status: string;
  statusTone: "green" | "yellow" | "red";
  updatedTime: string;
};

type CategoryOption = {
  value: string;
  label: string | null;
  count: number;
};

type PortfolioContentProps = {
  projects: Project[];
  locale: string;
  categoryOptions: CategoryOption[];
};

export function PortfolioContent({ projects, locale, categoryOptions }: PortfolioContentProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"thumbnail" | "list">("thumbnail");

  const imagePositions: Record<string, string> = {
    "sistem-erp-manufaktur-jaya": "center center",
    "dashboard-bi-retail-chain": "center 42%",
    "platform-ecommerce-fashion": "center 38%",
    "rebrand-perusahaan-logistik": "center 42%",
    "automasi-hr-perusahaan-tbk": "center 30%",
    "penetration-testing-bank-bpr": "center 32%",
    "portal-procurement-b2b-demo": "center 40%",
    "sales-command-center-demo": "center 36%",
    "marketplace-omnichannel-furniture-demo": "center 48%",
    "brand-refresh-fnb-chain-demo": "center 42%",
    "invoice-automation-enterprise-demo": "center 46%",
    "security-hardening-saas-demo": "center 34%",
    "customer-self-service-portal-demo": "center 42%",
    "marketing-performance-hub-demo": "center 52%",
    "premium-residence-sales-site-demo": "center 44%",
  };

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  const activeFilterOption = categoryOptions.find((category) => category.value === activeFilter) ?? categoryOptions[0];

  const getMosaicClasses = (index: number, total: number) => {
    const isLast = index === total - 1;
    const pos = index % 6;

    // Pattern for the 6-item mosaic
    const pattern = [
      "lg:col-span-7 lg:row-span-2",
      "lg:col-span-5 lg:row-span-1",
      "lg:col-span-5 lg:row-span-1",
      "lg:col-span-4 lg:row-span-1",
      "lg:col-span-4 lg:row-span-1",
      "lg:col-span-4 lg:row-span-1",
    ];

    // Adaptive logic for last items to fill the row
    if (isLast) {
      if (pos === 0) return "lg:col-span-12 lg:row-span-2"; // Lone item in new row -> Full width
      if (pos === 3) return "lg:col-span-12 lg:row-span-1"; // Only 1 small item -> Full width
      if (pos === 4) return "lg:col-span-8 lg:row-span-1";  // 2 small items -> Last one takes remaining 8
    }

    return pattern[pos];
  };


  const getAspectClasses = (index: number) => {
    const pattern = [
      "aspect-[16/14] lg:aspect-auto",
      "aspect-[16/10] lg:aspect-auto",
      "aspect-[16/10] lg:aspect-auto",
      "aspect-[4/4.4] lg:aspect-auto",
      "aspect-[4/4.4] lg:aspect-auto",
      "aspect-[4/4.4] lg:aspect-auto",
    ];

    return pattern[index % pattern.length];
  };

  const getImagePosition = (slug: string) => imagePositions[slug] || "center center";

  const filterButtonClass = (isActive: boolean) =>
    isActive
      ? "border border-black bg-black text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]"
      : "border border-black/8 bg-white/68 text-neutral-700 shadow-[0_12px_30px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-0.5 hover:border-black/12 hover:bg-white/88 hover:text-black hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]";

  const viewButtonClass = (isActive: boolean) =>
    isActive
      ? "border border-black bg-black text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]"
      : "border border-black/8 bg-white/62 text-neutral-600 shadow-[0_12px_28px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.88)] hover:-translate-y-0.5 hover:bg-white/86 hover:text-black hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)]";

  const listLabels = {
    viewBy: locale === "id" ? "View by" : "View by",
    thumbnail: locale === "id" ? "Thumbnail" : "Thumbnail",
    list: locale === "id" ? "List" : "List",
    projectName: locale === "id" ? "Nama Project" : "Project Name",
    preview: locale === "id" ? "Preview" : "Preview",
    category: locale === "id" ? "Kategori" : "Category",
    status: locale === "id" ? "Status" : "Status",
    updated: locale === "id" ? "Update Time" : "Update Time",
  };

  const categoryIcon = (category: string) => {
    const iconClass = "h-[0.95rem] w-[0.95rem] stroke-[1.8]";

    switch (category) {
      case "web-app":
        return <Globe className={iconClass} />;
      case "data-analytics":
        return <BarChart3 className={iconClass} />;
      case "ecommerce":
        return <ShoppingBag className={iconClass} />;
      case "design-branding":
        return <PenTool className={iconClass} />;
      case "automation":
        return <Bot className={iconClass} />;
      case "cybersecurity":
        return <ShieldCheck className={iconClass} />;
      default:
        return <Globe className={iconClass} />;
    }
  };

  const statusClass = (tone: Project["statusTone"]) => {
    switch (tone) {
      case "green":
        return "border-emerald-500/18 bg-emerald-500/12 text-emerald-700";
      case "yellow":
        return "border-amber-500/18 bg-amber-500/14 text-amber-700";
      case "red":
        return "border-rose-500/18 bg-rose-500/12 text-rose-700";
      default:
        return "border-black/8 bg-black/6 text-black/70";
    }
  };

  return (
    <section className="portfolio-content-shell bg-[linear-gradient(180deg,#fcfbf8_0%,#f4efe8_46%,#f7f3ee_100%)]">
      <div className="mx-auto w-full max-w-[92rem] px-3 py-12 sm:px-3.5 lg:px-4 lg:py-16">
        <div className="portfolio-enter relative z-30 mb-8 flex flex-col gap-6 lg:mb-10">
          <h1 className="portfolio-page-title text-4xl font-semibold tracking-[-0.05em] text-black md:text-5xl">Project</h1>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative sm:hidden">
              <button
                type="button"
                onClick={() => setMobileFilterOpen((open) => !open)}
                className="portfolio-mobile-filter-toggle flex w-full items-center justify-between gap-3 rounded-[1.1rem] border border-black/8 bg-white/72 px-4 py-3 text-left shadow-[0_16px_36px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-sm transition-all duration-300"
                aria-expanded={mobileFilterOpen}
                aria-label={locale === "id" ? "Buka filter kategori" : "Open category filter"}
              >
                <span className="min-w-0">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-black/42">
                    {locale === "id" ? "Filter kategori" : "Category filter"}
                  </span>
                  <span className="mt-1 block truncate text-[13px] font-medium text-black">
                    {activeFilterOption?.value === "all" ? "All" : activeFilterOption?.label}
                  </span>
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/6 bg-white/80 text-black/72">
                  <ChevronDown className={`h-[0.95rem] w-[0.95rem] transition-transform duration-300 ${mobileFilterOpen ? "rotate-180" : ""}`} />
                </span>
              </button>

              {mobileFilterOpen ? (
                <div className="portfolio-mobile-filter-menu absolute left-0 right-0 top-[calc(100%+0.55rem)] z-20 overflow-hidden rounded-[1.15rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,238,0.96))] p-2 shadow-[0_22px_48px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                  <div className="grid grid-cols-2 gap-1.5 min-[430px]:grid-cols-3">
                    {categoryOptions.map((category) => {
                      const isActive = activeFilter === category.value;

                      return (
                        <button
                          key={category.value}
                          type="button"
                          onClick={() => {
                            setActiveFilter(category.value);
                            setMobileFilterOpen(false);
                          }}
                          className={`portfolio-mobile-filter-option flex min-w-0 items-center justify-between gap-2 rounded-[0.95rem] px-3 py-2.5 text-left text-[12px] font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-black text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
                              : "bg-white/72 text-neutral-700 hover:bg-white hover:text-black"
                          }`}
                        >
                          <span className="truncate">{category.value === "all" ? "All" : category.label}</span>
                          <span
                            className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                              isActive
                                ? "border border-white/10 bg-white/12 text-white"
                                : "border border-black/8 bg-white/90 text-neutral-700"
                            }`}
                          >
                            {category.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="hidden -mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] sm:block lg:mx-0 lg:overflow-visible lg:px-0">
              <div className="flex min-w-max gap-2.5 lg:min-w-0 lg:flex-wrap lg:gap-3">
                {categoryOptions.map((category) => {
                  const isActive = activeFilter === category.value;

                  return (
                    <button
                      key={category.value}
                      onClick={() => setActiveFilter(category.value)}
                      className={`portfolio-filter-button group relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-3 py-2 text-[12px] font-medium whitespace-nowrap transition-all duration-300 sm:text-[13px] ${filterButtonClass(isActive)}`}
                    >
                      <span
                        className={`absolute inset-0 ${
                          isActive
                            ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_34%,transparent_68%,rgba(255,255,255,0.03))]"
                            : "bg-[linear-gradient(135deg,rgba(255,255,255,0.94),transparent_34%,transparent_70%,rgba(15,23,42,0.04))]"
                        } opacity-90`}
                      />
                      <span
                        className={`absolute inset-x-[10%] top-[1px] h-[42%] rounded-full blur-md ${
                          isActive ? "bg-white/8" : "bg-white/70"
                        }`}
                      />
                      <span className="relative">{category.value === "all" ? "All" : category.label}</span>
                      <span
                        className={`relative inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold transition-all duration-300 ${
                          isActive
                            ? "border border-white/10 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                            : "border border-black/8 bg-white/86 text-neutral-700 shadow-[0_6px_18px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] group-hover:bg-white group-hover:text-black"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="portfolio-view-shell flex w-full items-center justify-between gap-3 rounded-[1.1rem] border border-black/6 bg-white/44 px-3 py-2 shadow-[0_14px_34px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-sm sm:w-auto sm:justify-start sm:rounded-full sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none lg:pt-0.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/46 sm:text-[11px] sm:tracking-[0.2em]">
                {listLabels.viewBy}
              </span>
              <div className="portfolio-view-toggle flex items-center gap-2 rounded-full border border-black/6 bg-white/48 p-1 shadow-[0_14px_34px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-sm">
                <button
                  onClick={() => setViewMode("thumbnail")}
                  aria-label={listLabels.thumbnail}
                  title={listLabels.thumbnail}
                  className={`portfolio-view-button rounded-full p-2 transition-all duration-300 sm:p-2.5 ${viewButtonClass(viewMode === "thumbnail")}`}
                >
                  <LayoutGrid className="h-[0.95rem] w-[0.95rem]" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label={listLabels.list}
                  title={listLabels.list}
                  className={`portfolio-view-button rounded-full p-2 transition-all duration-300 sm:p-2.5 ${viewButtonClass(viewMode === "list")}`}
                >
                  <List className="h-[0.95rem] w-[0.95rem]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {viewMode === "thumbnail" ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:auto-rows-[14rem] lg:grid-cols-12">
            {filtered.map((project, index) => (
              <Link
                key={project.id}
                href={`/${locale}/portfolio/${project.slug}`}
                className={getMosaicClasses(index, filtered.length)}
              >

                <article
                  className="portfolio-enter portfolio-thumb-card relative h-full overflow-hidden rounded-[1.05rem] bg-white/24 shadow-[0_20px_48px_rgba(15,23,42,0.10)] ring-1 ring-black/6 backdrop-blur-sm"
                  style={{ animationDelay: `${120 + index * 55}ms` }}
                >
                  <div className={`relative h-full overflow-hidden ${getAspectClasses(index)}`}>
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover saturate-[0.96]"
                      style={{ objectPosition: getImagePosition(project.slug) }}
                      sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/12 to-transparent" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_24%,transparent_70%,rgba(255,255,255,0.05))]" />
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent" />

                    <div className="absolute left-3 top-3">
                      <span className="rounded-full border border-white/18 bg-black/28 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-3.5 md:p-4">
                      <h2 className="max-w-[72%] text-[13px] font-medium tracking-[-0.02em] text-white md:text-[14px]">
                        {project.title}
                      </h2>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="portfolio-list-header hidden grid-cols-[1.45fr_1.55fr_1.08fr_0.85fr_1fr] items-center gap-6 px-6 pb-1 lg:grid">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/42">
                {listLabels.projectName}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/42">
                {listLabels.preview}
              </span>
              <span className="pl-[70px] text-[11px] font-medium uppercase tracking-[0.18em] text-black/42">
                {listLabels.category}
              </span>
              <span className="pl-[70px] text-[11px] font-medium uppercase tracking-[0.18em] text-black/42">
                {listLabels.status}
              </span>
              <span className="pl-[70px] text-[11px] font-medium uppercase tracking-[0.18em] text-black/42">
                {listLabels.updated}
              </span>
            </div>

            {filtered.map((project, index) => (
              <Link
                key={project.id}
                href={`/${locale}/portfolio/${project.slug}`}
                className="group block"
              >
                <article className="portfolio-enter portfolio-list-card grid gap-3.5 rounded-[1.35rem] border border-white/68 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62))] px-4 py-3.5 shadow-[0_22px_52px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl md:px-5 lg:grid-cols-[1.45fr_1.55fr_1.08fr_0.85fr_1fr] lg:items-center lg:gap-6 lg:px-6 lg:py-4" style={{ animationDelay: `${120 + index * 55}ms` }}>
                  <div className="min-w-0">
                    <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-black/34 lg:hidden">
                      {listLabels.projectName}
                    </span>
                    <h2 className="text-[17px] font-normal leading-[1.14] tracking-[-0.03em] text-black/58 md:text-[18px]">
                      {project.title}
                    </h2>
                  </div>

                  <div>
                    <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-black/34 lg:hidden">
                      {listLabels.preview}
                    </span>
                    <div className="portfolio-list-preview relative aspect-[16/7.2] overflow-hidden rounded-[1.05rem] bg-black/4 shadow-[0_18px_38px_rgba(15,23,42,0.09)] ring-1 ring-black/6">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                        style={{ objectPosition: getImagePosition(project.slug) }}
                        sizes="(max-width:1024px) 100vw, 30vw"
                      />
                    </div>
                  </div>

                  <div className="min-w-0 lg:pl-[70px]">
                    <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-black/34 lg:hidden">
                      {listLabels.category}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] text-black/70 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
                        {categoryIcon(project.category)}
                      </span>
                      <p className="text-[13px] text-black/72">{project.categoryLabel}</p>
                    </div>
                  </div>

                  <div className="min-w-0 lg:pl-[70px]">
                    <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-black/34 lg:hidden">
                      {listLabels.status}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusClass(project.statusTone)}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="min-w-0 lg:pl-[70px]">
                    <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-black/34 lg:hidden">
                      {listLabels.updated}
                    </span>
                    <p className="text-[13px] text-black/60">{project.updatedTime}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .portfolio-enter {
          opacity: 0;
          transform: translate3d(0, 18px, 0) scale(0.992);
          animation: portfolio-enter 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes portfolio-enter {
          0% {
            opacity: 0;
            transform: translate3d(0, 18px, 0) scale(0.992);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
