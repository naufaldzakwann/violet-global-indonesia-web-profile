import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Page not found",
  description: "The page you requested does not exist on vgi.web.id.",
};

export default function NotFound() {
  return (
    <section className="noise relative overflow-hidden bg-[#FAF6EE] dark:bg-[#0a0a0b]">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-32 md:px-10 md:py-44">
        <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-violet-700 dark:text-violet-400">
          404
        </p>
        <h1 className="font-display mt-5 max-w-4xl text-5xl uppercase leading-[0.92] tracking-wide text-[#141419] sm:text-7xl dark:text-[#f4f1eb]">
          Nothing here. <em className="font-serif-accent normal-case tracking-normal text-violet-700 dark:text-violet-300">We will get you back.</em>
        </h1>
        <p className="mt-6 max-w-xl leading-7 text-stone-600 dark:text-white/60">
          The page moved or never existed. Start from the index, or tell us what you were looking for.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center gap-2 bg-[#17171d] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-600 dark:bg-[#f4f1eb] dark:text-black dark:hover:bg-violet-500 dark:hover:text-white">
            Back to index <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-stone-900/25 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-stone-900 transition-all hover:border-violet-500 hover:bg-violet-600 hover:text-white dark:border-white/25 dark:text-white">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
