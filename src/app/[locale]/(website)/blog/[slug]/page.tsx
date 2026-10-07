import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts as staticPosts } from "@/lib/data/blog";
import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import type { BlogPost } from "@/types";

type Props = { params: Promise<{ locale: string; slug: string }> };

type BlogPostViewModel = {
  author: string;
  authorAvatar: string;
  category: string;
  content: unknown;
  excerpt?: string;
  publishedAt: string;
  readTime?: string | number;
  tags?: string[];
  thumbnail: string;
  title: string;
};

function fromStaticPost(post: BlogPost, locale: string): BlogPostViewModel {
  const contentStr = locale === "id" ? post.content : post.contentEn;
  const wordCount = typeof contentStr === "string" && contentStr ? contentStr.split(/\s+/).length : 0;
  const authorName = post.author || "Tim Violet";

  return {
    author: authorName,
    authorAvatar: post.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=7c3aed&color=fff&bold=true`,
    category: locale === "id" ? post.categoryLabel : post.categoryLabelEn,
    content: contentStr,
    excerpt: locale === "id" ? post.excerpt : post.excerptEn,
    publishedAt: post.publishedAt,
    readTime: post.readTime || (wordCount ? Math.max(1, Math.ceil(wordCount / 200)) : 1),
    tags: post.tags,
    thumbnail: post.thumbnail,
    title: locale === "id" ? post.title : post.titleEn,
  };
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;

  const post = staticPosts.find((entry) => entry.slug === slug);
  if (!post) return {};

  const metadataPost = fromStaticPost(post, locale);

  return {
    title: metadataPost.title,
    description: metadataPost.excerpt,
    openGraph: {
      images: [{ url: metadataPost.thumbnail }],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  const staticPost = staticPosts.find((p) => p.slug === slug);
  if (!staticPost) notFound();

  const post = fromStaticPost(staticPost, locale);

  const shareUrl = encodeURIComponent(`https://violetglobal.id/${locale}/blog/${slug}`);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <Image src={post.thumbnail} alt={post.title} fill className="object-cover" priority />
        
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />

        <div className="section-container relative z-10 h-full flex flex-col justify-end pb-16">
          {/* Back Button (Floating Top Left) */}
          <div className="absolute top-10 left-6 md:left-10">
             <Link href={`/${locale}/blog`} 
               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl group">
               <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
               {locale === "id" ? "Kembali" : "Back to Blog"}
             </Link>
          </div>

          <div className="max-w-5xl">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200 bg-violet-600/40 border border-violet-400/30 mb-6 backdrop-blur-md">
                 {post.category}
               </span>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
               <h1 className="text-5xl md:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tighter mb-8" style={{ fontFamily: "var(--font-poppins)" }}>
                 {post.title}
               </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Meta & Author */}
            <div className="flex flex-wrap items-center gap-6 mb-16 pb-10 border-b border-gray-100">
              <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                {post.authorAvatar ? (
                  <Image src={post.authorAvatar} alt={post.author} width={56} height={56} className="rounded-full" />
                ) : (
                  <Icon name="User" size={24} className="text-violet-600" />
                )}
              </div>
              <div>
                <div className="font-bold text-navy text-lg leading-none mb-2">{post.author}</div>
                <div className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                  {formatDate(post.publishedAt, locale)} {post.readTime ? `· ${post.readTime} ${locale === "id" ? "menit baca" : "min read"}` : ''}
                </div>
              </div>
              
              <div className="ml-auto flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mr-2">{locale === "id" ? "Bagikan" : "Share"}</span>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all">
                  <Icon name="Twitter" size={16} />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all">
                  <Icon name="Linkedin" size={16} />
                </a>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-xl prose-slate max-w-none prose-headings:font-poppins prose-headings:text-navy prose-h2:text-4xl prose-h2:tracking-tight prose-a:text-violet-600 prose-p:leading-relaxed prose-p:text-slate-600 prose-img:rounded-3xl shadow-none">
              {Array.isArray(post.content) ? (
                <PortableText value={post.content} />
              ) : (
                typeof post.content === 'string' && post.content.split("\n").map((line: string, i: number) => {
                  if (line.startsWith("# ")) return <h1 key={i} className="text-5xl font-bold text-navy mt-12 mb-6 tracking-tight">{line.slice(2)}</h1>;
                  if (line.startsWith("## ")) return <h2 key={i} className="text-4xl font-bold text-navy mt-12 mb-6 tracking-tight">{line.slice(3)}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} className="text-2xl font-bold text-navy mt-8 mb-4 tracking-tight">{line.slice(4)}</h3>;
                  if (line.trim()) return <p key={i} className="mb-6">{line}</p>;
                  return null;
                })
              )}
            </div>

            {/* Tags (Bottom) */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-20 pt-10 border-t border-gray-100">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-xs font-medium hover:bg-violet-50 hover:text-violet-600 transition-colors cursor-default">
                    # {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
