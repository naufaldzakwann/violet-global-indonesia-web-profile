import { getTranslations } from "next-intl/server";
import { testimonials as staticTestimonials } from "@/lib/data/general";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

type TestimonialCard = {
  id: string;
  name: string;
  position: string;
  company?: string;
  content: string;
  rating: number;
};

export async function TestimonialsSection({ locale }: { locale: string }) {
  const t = await getTranslations("testimonials");
  const isId = locale === "id";

  const testimonialsData: TestimonialCard[] = staticTestimonials.map((item, index) => ({
    id: item.id || `testimonial-${index + 1}`,
    name: item.name || "Anonymous",
    position: item.position || "",
    company: item.company || "",
    content: (isId ? item.text : item.textEn) || "",
    rating: Number(item.rating) || 5,
  }));

  return (
    <section className="section-padding bg-violet-50/70 theme-section dark-starfield">
      <div className="dark-starfield-overlay" />
      <div className="section-container">
        <div className="mb-16 text-center">
          <AnimateOnView>
            <span className="badge mb-4">{t("badge")}</span>
          </AnimateOnView>
          <AnimateOnView delay={100}>
            <h2 className="section-title mb-4">{t("title")}</h2>
          </AnimateOnView>
          <AnimateOnView delay={200}>
            <p className="section-subtitle mx-auto">{t("subtitle")}</p>
          </AnimateOnView>
        </div>

        <TestimonialsCarousel testimonials={testimonialsData} />
      </div>
    </section>
  );
}
