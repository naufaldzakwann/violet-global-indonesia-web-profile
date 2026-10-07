# Edit konten website tanpa database

Semua konten website lives di repository ini. Tidak ada Sanity, CMS, atau database
eksternal yang perlu diakses — cukup edit file TypeScript/JSON di bawah, lalu
build ulang.

## 1. Di mana konten berada

| Koleksi | File | Ekspor | Tipe |
|---|---|---|---|
| Layanan | `src/lib/data/services.ts` | `services`, `getCategoryLabel` | `Service` |
| Blog | `src/lib/data/blog.ts` | `blogPosts` | `BlogPost` |
| Testimoni, tim, FAQ, stats, core values | `src/lib/data/general.ts` | `testimonials`, `teamMembers`, `faqs`, `stats`, `coreValues` | `Testimonial`, `TeamMember`, `FAQItem`, `Stat` |
| Portfolio | `src/lib/data/portfolio.ts` | `portfolios` | `Portfolio` |
| Case study | `src/lib/data/case-studies.ts` | `caseStudies`, `CaseStudyItem` | `CaseStudyItem` |
| Bentuk data (field wajib) | `src/types/index.ts` | — | — |
| Navigasi/footer link layanan | `src/components/layout/Footer.tsx`, `HeroSection.tsx` | — | — |
| Copy UI (label, badge, subtitle) | `src/messages/id.json`, `src/messages/en.json` | — | — |

Halaman membaca file-file ini secara langsung:

- `/{locale}/services` dan `/{locale}/services/{slug}` → `src/lib/data/services.ts`
- `/{locale}/blog` dan `/{locale}/blog/{slug}` → `src/lib/data/blog.ts`
- `/{locale}/portfolio` dan `/{locale}/portfolio/{slug}` → `src/lib/data/portfolio.ts`
- `/{locale}/case-study` dan `/{locale}/case-study/{slug}` → `src/lib/data/case-studies.ts`
- `/{locale}/faq` → `faqs` di `src/lib/data/general.ts`
- Testimoni di home/about → `testimonials` di `src/lib/data/general.ts`

## 2. Dua bahasa

Setiap field yang ditampilkan punya pasangan Bahasa Indonesia dan Inggris:

| Indonesia | Inggris |
|---|---|
| `title` | `titleEn` |
| `excerpt` | `excerptEn` |
| `content` | `contentEn` |
| `description` | `descriptionEn` |
| `shortDesc` | `shortDescEn` |
| `features` | `featuresEn` |
| `summary` | `summaryEn` |
| `problem` / `solution` / `result` | `problemEn` / `solutionEn` / `resultEn` |
| `question` / `answer` | `questionEn` / `answerEn` |
| `text` (testimoni) | `textEn` |
| `categoryLabel` | `categoryLabelEn` |
| `bullets` (halaman case study) | `bulletsEn` |
| `intro` / `note` (halaman case study) | `introEn` / `noteEn` |

Locale route adalah `id` (default) dan `en`. Field tanpa pasangan `*En` akan
tampil sama di kedua bahasa — Hindari itu kecuali memang kontennya sama.

## 3. Menambah entry

### Blog post

```ts
{
  id: "blog-0xx",              // unik, stabil
  slug: "judul-artikel",       // unik, URL: /{locale}/blog/judul-artikel
  title: "Judul Bahasa Indonesia",
  titleEn: "English Title",
  excerpt: "Ringkasan 1–2 kalimat untuk kartu dan meta description.",
  excerptEn: "One or two sentence summary.",
  content: "# Subjudul\n\nParagraf...",
  contentEn: "# Subheading\n\nParagraph...",
  category: "teknologi",       // salah satu: tips-bisnis | teknologi | digital-marketing | keamanan-siber | desain
  categoryLabel: "Teknologi",
  categoryLabelEn: "Technology",
  thumbnail: "/migrated/blog/teknologi-1.jpg",
  author: "Nama Penulis",
  authorAvatar: "https://ui-avatars.com/api/?name=Nama+Penulis&background=7c3aed&color=fff",
  publishedAt: "2025-05-01",    // YYYY-MM-DD
  readTime: 8,                  // menit
  tags: ["tag1", "tag2"],
}
```

`category` harus salah satu dari key yang sudah dipakai agar filter kategori di
halaman blog ikut bekerja. Tipe `content`/`contentEn` adalah `RichText` dari
`src/types/index.ts`: boleh string sederhana (baris `# `, `## `, `### ` dan
paragraf dirender sebagai heading/paragraph) atau array blok Portable Text bila
butuh rich text. Keduanya lolos typecheck tanpa perlu mengubah tipe.

### Portfolio

```ts
{
  id: "portfolio-0xx",
  slug: "nama-project",
  title: "Nama Project", titleEn: "Project Name",
  category: "web-app",          // web-app | data-analytics | ecommerce | design-branding | automation | cybersecurity
  categoryLabel: "Website & Aplikasi",
  categoryLabelEn: "Website & App",
  thumbnail: "/migrated/portfolio/nama-project-1.jpg",
  images: ["/migrated/portfolio/nama-project-1.jpg"],  // galeri, minimal 1
  client: "Nama Klien",
  year: 2025,                   // dipakai untuk kartu dan urutan
  problem: "...", problemEn: "...",
  solution: "...", solutionEn: "...",
  result: "...", resultEn: "...",
  technologies: ["Next.js", "PostgreSQL"],
  liveUrl: "https://contoh.com",   // opsional
  featured: true,
}
```

Field tambahan opsional yang tetap dirender bila diisi: `overview`/`overviewEn`,
`projectType`/`projectTypeEn`, `role`/`roleEn`, `skills`/`skillsEn`,
`designContent`/`designContentEn` (`RichText`), `colorPalette` (`[{ hex, name }]`),
`structure` (array string), `pageExplanations`
(`[{ pageTitle, pageTitleEn, explanation, explanationEn, image }]`, `explanation`
bertipe `RichText` dan `image` path lokal). Semua field ini dideklarasikan pada
interface `Portfolio` di `src/types/index.ts`, jadi menambahkannya ke
`src/lib/data/portfolio.ts` tidak memicu error TypeScript. Bila tidak diisi,
halaman memakai preset berdasarkan `category` — jadi entri basic tetap tampil
utuh.

### Layanan

```ts
{
  id, slug,
  title, titleEn,
  shortDesc, shortDescEn,
  description, descriptionEn,
  features: ["..."], featuresEn: ["..."],
  category: "web-app",
  icon: "Code",                 // nama ikon dari lucide-react
  content, contentEn,   // opsional, RichText (string atau Portable Text)
}
```

`content`/`contentEn` bersifat opsional pada interface `Service`

(`src/types/index.ts`) dan dirender di halaman detail layanan bila diisi.

### Case study

```ts
{
  id, slug,
  title, titleEn,
  category, categoryEn,
  year, yearEn, month, monthEn,
  pageCount,                      // dipakai untuk ukuran buku di shelf
  summary, summaryEn,
  cardSummary, cardSummaryEn,     // opsional, tampil di cover
  spineTone, accentTone,          // warna sampul
  insight, insightEn,
  pages: [
    {
      title, titleEn,
      intro, introEn,
      bullets: ["..."], bulletsEn: ["..."],
      note, noteEn,
    },
  ],
}
```

Per halaman case study boleh tambahan `explanation`/`explanationEn` (`RichText`)
dan `image` (path lokal) — keduanya dirender bila ada, dan dideklarasikan pada
`CaseStudyPageItem` di `src/lib/data/case-studies.ts`.

### FAQ dan testimoni

```ts
// src/lib/data/general.ts
{ id, question, questionEn, answer, answerEn, category, categoryEn }
{ id, name, position, company, avatar, rating, text, textEn, service }
```

## 4. Slug dan URL

- Slug wajib unik **di dalam koleksi**-nya, dan hanya memakai `a-z`, `0-9`, `-`.
- URL: `/{locale}/blog/{slug}`, `/{locale}/services/{slug}`,
  `/{locale}/portfolio/{slug}`, `/{locale}/case-study/{slug}`.
- Slug yang sudah terbit tidak boleh diubah kecuali URL lama ikut
  dialihkan (redirect), karena tautan eksternal dan backlink bisa rusak.
- Setelah menambah entry, slug-nya otomatis ikut ter-*generate* saat build
  (`generateStaticParams` untuk services; route lain dirender on-demand).

## 5. Gambar

- Aset hasil migrasi disimpan di `public/migrated/**`, dipanggil dari root:
  `/migrated/portfolio/nama-project-1.jpg`. Jangan menulis URL Sanity
  (`cdn.sanity.io`) — build harus tetap jalan tanpa Sanity.
- Gambar kartu & hero layanan dipetakan lewat
  `src/lib/data/service-images.ts` (`serviceImages`, `serviceFallbackImage`,
  `serviceDetailHero`) — bukan URL mentah di komponen.
- `public/migrated/fallbacks/neutral-content.jpg` adalah gambar netral yang
  dipakai untuk aset yang tidak dapat dipulihkan (mis. thumbnail blog
  microservices dan galeri portfolio invoice automation). Ganti isinya bila ada
  aset asli, tanpa perlu mengubah komponen.
- Kualitas/ukuran: untuk kartu gunakan lebar ±800px, untuk galeri/hero ±1600px.
  Format WebP atau JPEG. Sertakan nama file yang deskriptif.
- `next/image` dipakai di sebagian halaman. Host yang boleh dimuat sudah
  terdaftar di `next.config.ts` → `images.remotePatterns`. Host baru harus
  ditambahkan di sana, atau lebih baik: simpan gambarnya lokal di
  `public/migrated/**` supaya tidak bergantung pada domain pihak ketiga.
- Kalau gambar hilang, halaman tetap jalan (fallback), tapi tampil tanpa foto —
  jadi sinkronkan gambar dengan konten, jangan dibiarkan menggantung.

## 6. Copy antarmuka (bukan konten koleksi)

Label tombol, badge, judul seksi, dan subtitle berasal dari
`src/messages/id.json` dan `src/messages/en.json`. Ubah di kedua file agar
konsisten.

## 7. Validasi sebelum deploy ke Vercel

Jalankan dari root repository:

```bash
npm install
npx tsc --noEmit     # typecheck
npm run lint         # eslint
npm run build        # build produksi (wajib lolos)
npm start            # cek manual localhost:3000
```

Yang perlu dicek manual setelah `npm start`:

1. `/{locale}/` , `/id/`, `/en/` — home, nav, footer, testimoni.
2. Halaman list: `/id/services`, `/id/blog`, `/id/portfolio`, `/id/case-study`,
   `/id/faq` — lalu ulangi untuk `/en/...`.
3. Satu halaman detail dari tiap list, kedua locale: isi artikel, gambar
   portfolio, halaman case study.
4. Metadata browser (title + description) tiap halaman detail.
5. Tautan internal (klik beberapa nav + kartu, tidak boleh 404).
6. Tidak ada entri duplikat (slug sama tampil dua kali) dan tidak ada placeholder
   yang terlewat.
7. `grep -ri "cdn.sanity.io\|api.sanity.io" .next` → harus kosong.

Kalau `npm run build` gagal, jangan deploy. Build di Vercel memakai perintah
`npm run build` yang sama, tanpa environment variable Sanity apa pun.

## 8. Tidak ada environment variable Sanity

`NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` sudah tidak
dipakai dan tidak perlu diset di Vercel. Kalau suatu saat muncul permintaan
konten dari Sanity, itu bug — konten harus datang dari `src/lib/data/**`.
