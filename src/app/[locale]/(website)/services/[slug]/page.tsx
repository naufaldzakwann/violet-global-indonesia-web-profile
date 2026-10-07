import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services as staticServices } from "@/lib/data/services";
import { portfolios } from "@/lib/data/portfolio";
import { serviceDetailHero } from "@/lib/data/service-images";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Icon } from "@/components/ui/Icon";
import { RichTextContent } from "@/components/ui/RichTextContent";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return staticServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const svc = staticServices.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: locale === "id" ? svc.title : svc.titleEn,
    description: locale === "id" ? svc.shortDesc : svc.shortDescEn,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const svc = staticServices.find((s) => s.slug === slug);
  if (!svc) notFound();

  const entry = svc;
  const title = locale === "id" ? entry.title : entry.titleEn || entry.title;
  const desc = locale === "id" 
    ? (entry.description || entry.shortDesc) 
    : (entry.descriptionEn || entry.shortDescEn || entry.description || entry.shortDesc);
  const features = locale === "id" 
    ? (entry.features || []) 
    : (entry.featuresEn || entry.features || []);
  const content = locale === "id" ? entry.content : (entry.contentEn ?? entry.content);
  const category = entry.category || "default";

  // Filter relevant portfolio items
  const relevantPortfolio = portfolios.filter(p => p.category === category).slice(0, 3);

  return (
    <div className="pt-24 bg-white selection:bg-violet-100 selection:text-violet-900 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        
        {/* COMPACT BREADCRUMB */}
        <header className="mb-12">
          <AnimateOnView className="flex items-center gap-4 mb-10">
            <Link href={`/${locale}/services`} className="text-[10px] font-bold text-violet-600 uppercase tracking-widest hover:text-slate-900 transition-colors">
              ← {locale === "id" ? "Layanan" : "Services"}
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {category.replace('-', ' ')}
            </div>
          </AnimateOnView>

          <AnimateOnView delay={100}>
            <h1 className="text-4xl md:text-6xl font-medium text-slate-950 tracking-tighter leading-tight mb-10" style={{ fontFamily: "var(--font-poppins)" }}>
              {title}
            </h1>
          </AnimateOnView>

          {/* Feature Image (Compact) */}
          <AnimateOnView delay={200} className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50">
             <Image 
               src={serviceDetailHero}
               alt={title}
               fill
               className="object-cover opacity-90"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
          </AnimateOnView>
        </header>

        {/* LONG NARRATIVE SECTION */}
        <section className="mb-20">
           <AnimateOnView delay={300}>
              <div className="text-slate-600 text-lg md:text-xl font-light leading-relaxed mb-10 space-y-8">
                 <RichTextContent
                   value={content}
                   className="portable-text-container prose prose-violet max-w-none prose-p:leading-relaxed"
                   fallback={<p>{desc}</p>}
                 />
                  
                  {/* Supplementary Narrative */}
                  <p className="text-slate-400 text-base italic border-l-2 border-violet-100 pl-6 py-2">
                    {locale === "id" 
                      ? "Kami percaya bahwa setiap solusi digital haruslah menjadi investasi strategis, bukan sekadar pelengkap operasional. Dengan pendekatan yang fokus pada skalabilitas dan keamanan, kami memastikan layanan ini mampu berevolusi seiring dengan pertumbuhan target bisnis Anda."
                      : "We believe every digital solution should be a strategic investment, not just an operational addition. With a focus on scalability and security, we ensure this service evolves alongside your business growth targets."}
                  </p>
                  
                  <p>
                    {locale === "id"
                      ? "Melalui metodologi yang tajam, tim kami menggali potensi terdalam dari kebutuhan Anda, menggabungkan desain yang berpusat pada pengguna dengan performa teknis kelas dunia. Hasilnya adalah sebuah ekosistem digital yang responsif, efisien, dan siap menghadapi tantangan pasar yang dinamis."
                      : "Through a sharp methodology, our team extracts the deepest potential of your needs, combining user-centric design with world-class technical performance. The result is a digital ecosystem that is responsive, efficient, and ready to face dynamic market challenges."}
                  </p>
              </div>
           </AnimateOnView>
        </section>

        {/* CAPABILITIES & ADVANTAGES GRID */}
        <div className="grid md:grid-cols-2 gap-16 border-t border-slate-100 pt-20 mb-24">
           <AnimateOnView delay={400}>
              <h4 className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                {locale === "id" ? "Keunggulan Strategis" : "Key Strategic Benefits"}
              </h4>
              <div className="space-y-8">
                 {[
                   { t: locale === "id" ? "Metodologi Teruji" : "Proven Methodology", d: locale === "id" ? "Proses kerja yang transparan dan terukur dari awal hingga akhir." : "Transparent and measurable workflow from start to finish." },
                   { t: locale === "id" ? "Skalabilitas Tinggi" : "High Scalability", d: locale === "id" ? "Solusi yang dirancang untuk tumbuh bersama volume bisnis Anda." : "Solutions designed to scale with your business volume." },
                   { t: locale === "id" ? "Dukungan Berkelanjutan" : "Continuous Support", d: locale === "id" ? "Pemeliharaan rutin dan respons cepat untuk keamanan sistem." : "Routine maintenance and fast response for system security." }
                 ].map((adv, i) => (
                   <div key={i} className="group">
                      <h5 className="text-base font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">{adv.t}</h5>
                      <p className="text-sm text-slate-400 font-light leading-relaxed">{adv.d}</p>
                   </div>
                 ))}
              </div>
           </AnimateOnView>

           <AnimateOnView delay={500}>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                {locale === "id" ? "Output Layanan" : "Service Deliverables"}
              </h4>
              <ul className="space-y-3">
                 {features.map((f: string) => (
                   <li key={f} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-[13px] text-slate-600 hover:bg-white hover:border-violet-100 transition-all">
                      <div className="text-violet-600 shrink-0">
                         <Icon name="Check" size={14} />
                      </div>
                      <span className="font-medium">{f}</span>
                   </li>
                 ))}
              </ul>
           </AnimateOnView>
        </div>

        {/* NARRATIVE REFERENCES: Success stories from Portfolio */}
        {relevantPortfolio.length > 0 && (
           <section className="border-t border-slate-100 pt-20">
              <AnimateOnView className="mb-14">
                 <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {locale === "id" ? "Bukti Kualitas" : "Proof of Excellence"}
                 </h2>
                 <h3 className="text-3xl font-medium text-slate-900 tracking-tight leading-tight mb-6" style={{ fontFamily: "var(--font-poppins)" }}>
                    {locale === "id" ? `${title} yang Berhasil Kami Wujudkan.` : `Successfully delivered ${title} projects.`}
                 </h3>
                 <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                    {locale === "id" 
                      ? "Setiap proyek di bawah ini mewakili dedikasi kami untuk memberikan solusi yang berdampak langsung bagi bisnis klien. Berikut adalah beberapa referensi terpilih yang mencerminkan kapabilitas kami."
                      : "Each project below represents our dedication to delivering solutions that directly impact our clients' business. Here are selected references reflecting our capabilities."}
                 </p>
              </AnimateOnView>

              <div className="grid gap-10">
                 {relevantPortfolio.map((project, idx) => (
                    <AnimateOnView key={project.id} delay={idx * 100}>
                       <Link href={`/${locale}/portfolio/${project.slug}`} className="group grid md:grid-cols-12 gap-8 items-center p-6 rounded-[2rem] border border-slate-100 hover:border-violet-100 hover:bg-violet-50/10 transition-all">
                          <div className="md:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg">
                             <Image 
                               src={project.thumbnail}
                               alt={project.title}
                               fill
                               className="object-cover group-hover:scale-105 transition-transform duration-700"
                             />
                          </div>
                          <div className="md:col-span-7">
                             <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-3">{project.client}</div>
                             <h4 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 mb-3 transition-colors">
                                {locale === "id" ? project.title : project.titleEn}
                             </h4>
                             <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                                {locale === "id" ? project.problem : project.problemEn}
                             </p>
                             <div className="flex flex-wrap gap-2">
                                {project.technologies.slice(0, 3).map(t => (
                                  <span key={t} className="text-[9px] font-bold text-slate-400 uppercase border border-slate-200 px-2 py-0.5 rounded-full">{t}</span>
                                ))}
                             </div>
                          </div>
                          <div className="md:col-span-1 flex justify-end pr-4">
                             <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-violet-600 group-hover:border-violet-600 transition-all">
                                <Icon name="ArrowRight" size={16} />
                             </div>
                          </div>
                       </Link>
                    </AnimateOnView>
                 ))}
              </div>
              
              <AnimateOnView delay={300} className="mt-12 text-center">
                 <Link href={`/${locale}/portfolio`} className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors">
                    {locale === "id" ? "Lihat Seluruh Arsip Portofolio →" : "View Entire Portfolio Archive →"}
                 </Link>
              </AnimateOnView>
           </section>
        )}

        <footer className="mt-32 border-t border-slate-50 pt-12 text-center">
           <AnimateOnView className="opacity-10 select-none pointer-events-none">
              <span className="text-[9px] font-bold uppercase tracking-[1.5em]">VIOLET GLOBAL INDONESIA • {new Date().getFullYear()}</span>
           </AnimateOnView>
        </footer>

      </div>
    </div>
  );
}
