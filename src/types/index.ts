import type { PortableTextBlock } from "@portabletext/react";

// ─── Rich text ───────────────────────────────────────────────────────────────
// Konten rich text boleh berupa string sederhana (markdown-lite: baris `# `,
// `## `, `### ` dan paragraf) atau array blok Portable Text. Lihat
// docs/sanity-migration/content-editing.md untuk contoh penulisannya.
export type RichText = string | PortableTextBlock[];

// ─── Service ───────────────────────────────────────────────────────────────
export interface ServiceProduct {
  icon: string;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  capabilities: string[];
  capabilitiesEn: string[];
  /** Path internal tanpa prefix locale, mis. "/smart-waste-management". */
  href?: string;
}

export interface ServiceProcessStep {
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
}

export interface Service {
  id: string;
  slug: string;
  icon: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  shortDescEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  category: ServiceCategory;
  /** Produk/platform di dalam kategori layanan (halaman detail). */
  products?: ServiceProduct[];
  /** "Layanan ini cocok untuk siapa?" — bahasa sederhana untuk orang awam. */
  audience?: string[];
  audienceEn?: string[];
  /** "Cara kami bekerja" — langkah-langkah sederhana. */
  process?: ServiceProcessStep[];
  /** Rich text opsional yang dirender di halaman detail layanan. */
  content?: RichText;
  contentEn?: RichText;
}

export type ServiceCategory =
  | "it-develop"
  | "consultan-service"
  | "green-energy-tech"
  | "web-app"
  | "consulting"
  | "cybersecurity"
  | "social-media"
  | "digital-marketing"
  | "design-branding"
  | "ecommerce"
  | "data-analytics"
  | "automation";

// ─── Portfolio ──────────────────────────────────────────────────────────────
export interface PortfolioColor {
  hex: string;
  name: string;
}

export interface PortfolioPageExplanation {
  pageTitle?: string;
  pageTitleEn?: string;
  explanation?: RichText;
  explanationEn?: RichText;
  /** Path gambar lokal, mis. /migrated/portfolio/nama-project-1.jpg */
  image?: string;
  /** Alias lama untuk `image`; diutamakan `image` bila keduanya ada. */
  imageUrl?: string;
}

export interface Portfolio {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  category: ServiceCategory;
  categoryLabel: string;
  categoryLabelEn: string;
  thumbnail: string;
  images: string[];
  client: string;
  year: number;
  problem: string;
  problemEn: string;
  solution: string;
  solutionEn: string;
  result: string;
  resultEn: string;
  technologies: string[];
  liveUrl?: string;
  featured: boolean;
  // ── Field opsional konten migrasi. Halaman detail merender bila diisi dan
  //    memakai preset berdasarkan `category` bila kosong.
  overview?: string;
  overviewEn?: string;
  summary?: string;
  summaryEn?: string;
  projectType?: string;
  projectTypeEn?: string;
  role?: string;
  roleEn?: string;
  tools?: string[];
  skills?: string[];
  skillsEn?: string[];
  designContent?: RichText;
  designContentEn?: RichText;
  structure?: string[];
  infrastructure?: string[];
  colorPalette?: PortfolioColor[];
  /** Alias lama untuk `colorPalette` berupa pasangan [hex, nama]. */
  palette?: Array<[string, string]>;
  pageExplanations?: PortfolioPageExplanation[];
}

// ─── Blog ───────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: RichText;
  contentEn: RichText;
  category: BlogCategory;
  categoryLabel: string;
  categoryLabelEn: string;
  thumbnail: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export type BlogCategory =
  | "tips-bisnis"
  | "teknologi"
  | "digital-marketing"
  | "keamanan-siber"
  | "desain";

// ─── Testimonial ────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  textEn: string;
  service: string;
}

// ─── Team Member ────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  positionEn: string;
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
export interface FAQItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  category: string;
  categoryEn: string;
}

// ─── Contact Form ───────────────────────────────────────────────────────────
export interface ContactFormData {
  // Step 1
  fullName: string;
  email: string;
  phone: string;
  // Step 2
  services: string[];
  budget: string;
  // Step 3
  message: string;
  agreeTerms: boolean;
}

// ─── Stats ──────────────────────────────────────────────────────────────────
export interface Stat {
  value: string;
  label: string;
  labelEn: string;
  suffix?: string;
}
