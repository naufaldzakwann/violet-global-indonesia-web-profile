import Image from "next/image";
import { useTranslations } from "next-intl";
import { clients } from "@/lib/data/clients";
import { AnimateOnView } from "@/components/ui/AnimateOnView";

export function ClientsSection() {
  const t = useTranslations("clients");
  return (
    <section
      aria-labelledby="our-client-title"
      className="section-padding bg-violet-50/70 theme-section dark-starfield"
    >
      <div className="dark-starfield-overlay" aria-hidden="true" />
      <div className="section-container">
        <AnimateOnView className="mb-10 text-center sm:mb-12">
          <h2 id="our-client-title" className="section-title">{t("title")}</h2>
        </AnimateOnView>

        <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4 sm:gap-6">
          {clients.map((client, index) => (
            <li key={client.id} className="w-full sm:w-[calc((100%_-_1.5rem)/2)] lg:w-[calc((100%_-_3rem)/3)]">
              <AnimateOnView delay={(index % 3) * 80}>
                <div className="flex h-44 items-center justify-center rounded-2xl border border-violet-100 bg-[#fff] px-8 py-7 shadow-sm sm:h-48 sm:px-6">
                  <Image
                    src={client.logo}
                    alt={client.id === "pemprov-jateng" ? t("pemprovName") : client.name}
                    width={client.width}
                    height={client.height}
                    sizes="256px"
                    className="h-28 w-full max-w-64 object-contain"
                  />
                </div>
              </AnimateOnView>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
