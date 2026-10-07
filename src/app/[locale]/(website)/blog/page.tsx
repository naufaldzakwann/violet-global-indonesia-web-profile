import { blogPosts as staticPosts } from "@/lib/data/blog";
import { BlogContent } from "./BlogContent";
import type { BlogPost } from "@/types";

const CATEGORIES = ["all", "teknologi", "digital-marketing", "keamanan-siber", "desain"];

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isId = locale === "id";

  const categoryLabels: Record<string, { id: string; en: string }> = {
    "all":              { id: "Semua", en: "All" },
    "teknologi":        { id: "Teknologi", en: "Technology" },
    "digital-marketing":{ id: "Digital Marketing", en: "Digital Marketing" },
    "keamanan-siber":   { id: "Keamanan Siber", en: "Cybersecurity" },
    "desain":           { id: "Desain", en: "Design" },
  };

  const posts = staticPosts.map((post: BlogPost) => {
    const authorName = post.author || "Tim Violet";

    return {
      id: post.id,
      slug: post.slug,
      title: isId ? post.title : post.titleEn,
      excerpt: isId ? post.excerpt : post.excerptEn,
      thumbnail: post.thumbnail,
      category: post.category,
      categoryLabel: isId ? post.categoryLabel : post.categoryLabelEn,
      author: authorName,
      authorAvatar: post.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=7c3aed&color=fff&bold=true`,
      publishedAt: post.publishedAt,
      readTime: post.readTime ? String(post.readTime) : undefined,
      tags: post.tags,
    };
  });

  return (
    <main className="blog-page portfolio-atmosphere pt-20">
      <BlogContent 
        posts={posts} 
        locale={locale} 
        categories={CATEGORIES} 
        categoryLabels={categoryLabels} 
      />
    </main>
  );
}
