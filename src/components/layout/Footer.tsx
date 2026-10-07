"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/data/services";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isPortfolioDetail = segments[0] === locale && segments[1] === "portfolio" && segments.length >= 3;
  const isCaseStudyRoute = segments[0] === locale && segments[1] === "case-study";

  if (isPortfolioDetail || isCaseStudyRoute) {
    return null;
  }

  const companyLinks = [
    { label: tc("about"), href: `/${locale}/about` },
    { label: tc("portfolio"), href: `/${locale}/portfolio` },
    { label: tc("blog"), href: `/${locale}/blog` },
    { label: tc("faq"), href: `/${locale}/faq` },
    { label: tc("contact"), href: `/${locale}/contact` },
  ];

  const socialLinks = [
    { name: "Instagram", icon: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com" },
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com" },
    { name: "YouTube", icon: "Youtube", href: "https://youtube.com" },
  ];

  return (
    <footer className="border-t border-violet-400/16 bg-[linear-gradient(180deg,#1a0d27_0%,#140a21_48%,#0c0615_100%)] text-white">
      <div className="section-container py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
          <div className="max-w-sm">
            <Link href={`/${locale}/home`} className="mb-5 inline-flex items-center">
              <Image
                src="/VGI_Logo_Horizontal.PNG"
                alt="Violet Global Indonesia"
                width={340}
                height={78}
                className="h-[3.55rem] w-auto rounded-[1rem] md:h-[4rem]"
              />
            </Link>

            <p className="mb-6 text-sm leading-7 text-violet-100/64">{t("tagline")}</p>

            <div className="flex gap-2.5">
              {socialLinks.map(({ name, icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/18 bg-violet-300/[0.09] text-violet-100/78 transition-all duration-200 hover:border-violet-300/44 hover:bg-violet-300/[0.16] hover:text-white"
                >
                  <Icon name={icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-violet-50">{t("services")}</h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((svc) => (
                <li key={svc.id}>
                  <Link
                    href={`/${locale}/services/${svc.slug}`}
                    className="text-sm text-violet-100/68 transition-colors hover:text-violet-200"
                  >
                    {locale === "id" ? svc.title : svc.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-violet-50">{t("company")}</h4>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-violet-100/68 transition-colors hover:text-violet-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-violet-50">{t("contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icon name="Phone" size={15} className="mt-0.5 shrink-0 text-violet-300" />
                <span className="text-sm leading-6 text-violet-100/68">+62 851-6641-5046</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Mail" size={15} className="mt-0.5 shrink-0 text-violet-300" />
                <span className="text-sm leading-6 text-violet-100/68">hello@violetglobal.id</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={15} className="mt-0.5 shrink-0 text-violet-300" />
                <span className="text-sm leading-6 text-violet-100/68">
                  Jl. Teknologi Digital No. 1,
                  <br />
                  Jakarta Selatan 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-violet-300/16 pt-5 text-sm text-violet-100/46 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright")}</p>
          <div className="flex gap-5">
            <Link href={`/${locale}/home`} className="transition-colors hover:text-violet-200">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}/home`} className="transition-colors hover:text-violet-200">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
