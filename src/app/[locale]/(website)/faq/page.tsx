import { faqs as staticFaqs } from "@/lib/data/general";
import { FAQContent } from "./FAQContent";
import { CTASection } from "@/components/sections/CTASection";

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const faqs = staticFaqs.map((f) => ({
    id: f.id,
    question: locale === 'id' ? f.question : f.questionEn,
    answer: locale === 'id' ? f.answer : f.answerEn,
    category: locale === 'id' ? f.category : f.categoryEn,
  }));

  return (
    <main className="faq-page portfolio-atmosphere pt-20">
      <FAQContent initialFaqs={faqs} locale={locale} />
    </main>
  );
}
