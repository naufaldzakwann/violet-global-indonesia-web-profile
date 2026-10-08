import { useTranslations } from "next-intl";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";

export function WhyUsSection() {
  const t = useTranslations("why");
  const points = t.raw("points") as { icon: string; title: string; desc: string }[];

  const iconNames = ["Package", "Award", "Clock", "Headphones", "TrendingUp", "Shield"];

  return (
    <section className="section-padding bg-violet-50/70 theme-section">
      <div className="section-container max-w-6xl mx-auto">
        {/* Extremely Minimalist & Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {points.map((point, i) => (
            <AnimateOnView key={i} delay={i * 80 + 200}>
              <div className="group flex flex-col h-full border-t border-violet-200/80 pt-6 hover:border-violet-400 transition-colors duration-500">
                
                {/* Header (Icon + Title) */}
                <div className="flex items-center gap-4 mb-4">
                  <Icon name={iconNames[i]} size={22} className="text-violet-600/80 group-hover:text-violet-800 transition-colors duration-500" />
                  <h4 className="theme-title text-[1.15rem] font-semibold tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                    {point.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="theme-body max-w-[95%] text-sm leading-relaxed">
                  {point.desc}
                </p>

              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
