# Laporan hellyeah — pelepasan Sanity dan pembacaan konten lokal

Branch: `hellyeah` · Baseline: `f3f86e9` · Integrasi awal: `304b5ef` · Setelah `git merge origin/main` (PR mike #2, `e29b2cd`): `3029743`
Status: **integrasi data mike selesai; revisi review PR #3 (renderer RichText + regression test) selesai; build, typecheck, test, lint, dan route lulus; PR siap direview ulang REY.**

## 1. Ringkasan

Semua pembacaan konten sekarang langsung dari `src/lib/data/**`. Loader Sanity,
Studio, schema, query, seed script, konfigurasi, dan dependensi Sanity sudah
dihapus. Build dan runtime tidak lagi melakukan request ke Sanity, terverifikasi
dengan server yang memblokir koneksi ke `*.sanity.io`.

Setelah PR mike (#2, merge commit `e29b2cd`) masuk ke `main`, `main` di-merge ke
branch ini (`3029743`) dan integrasi final diselesaikan: gambar layanan dialihkan
ke aset lokal via `service-images.ts`, tipe konten bersama dilengkapi untuk rich
text dan field tambahan, serta dua gambar 404 diganti fallback lokal netral.
Hasil verifikasi penuh ada di §8.

## 2. Baseline (sebelum perubahan, `f3f86e9`)

| Pemeriksaan | Hasil |
|---|---|
| `npx tsc --noEmit` | exit 0 |
| `npm run lint` | **gagal** — 80 problems (65 errors, 15 warnings) |
| `npm run build` | exit 0, **tetapi log berisi 404 dari Sanity** (`Dataset "production" not found for project ID "your-project-id"`, request ke `your-project-id.apicdn.sanity.io`) |
| Route list | 15 route, termasuk `/[locale]/studio/[[...index]]` |

Artinya baseline "hijau" pada build hanya karena ada `try/catch` fallback ke data
statis — bukan karena bebas Sanity. Ini yang membuat sekadar mematikan fetch
berbahaya, dan encouraged auditing dilakukan sampai ke consumer.

Catatan: tidak ada `.env` di repository, jadi `NEXT_PUBLIC_SANITY_*` memakai
fallback `your-project-id` dan selalu gagal. Tidak ada env Sanity yang perlu
dibuat di Vercel.

## 3. Perubahan

### 3.1 Dihapus

| File | Alasan |
|---|---|
| `src/lib/sanity-data.ts` | loader hybrid Sanity + fallback (services, service detail, projects, posts, faqs, testimonials) |
| `src/lib/sanity-portfolio.ts` | loader hybrid portfolio |
| `src/lib/sanity-case-studies.ts` | loader hybrid case study |
| `src/sanity/lib/{client,queries,image}.ts` | client GROQ, query, dan image URL builder Sanity |
| `src/sanity/schemas/*.ts` (6 file) | schema Studio |
| `src/app/[locale]/studio/{layout.tsx,[[...index]]/page.tsx}` | route Studio (`NextStudio`) |
| `sanity.config.ts`, `sanity.cli.ts` | konfigurasi Studio/CLI |
| `src/scripts/seed-sanity.ts`, `scratch/seed-sanity.js` | seed script Sanity |

`getProjects()` di `sanity-data.ts` tidak pernah dipakai consumer — ikut hilang.

### 3.2 Consumer diubah membaca data lokal (12 file)

`src/app/[locale]/(website)/`: `services/page.tsx`, `services/[slug]/page.tsx`,
`blog/page.tsx`, `blog/[slug]/page.tsx`, `faq/page.tsx`, `portfolio/page.tsx`,
`portfolio/[slug]/page.tsx`, `case-study/page.tsx`, `case-study/[slug]/page.tsx`;
`src/components/sections/`: `ServicesSection.tsx`, `PortfolioSection.tsx`,
`TestimonialsSection.tsx`.

Semuanya sekarang `import { ... } from "@/lib/data/*"` dan memetakan field
locale di tempat (tanpa `await`, tanpa fetch).

### 3.3 Konfigurasi dan dependensi

- `next.config.ts`: `cdn.sanity.io` dihapus dari `images.remotePatterns`.
  `images.unsplash.com`, `ui-avatars.com`, `via.placeholder.com` **dipertahankan**
  (keputusan bersama; konten lokal masih memakai URL tersebut — lihat §6).
- `package.json` + `package-lock.json`: `sanity`, `next-sanity`, `@sanity/image-url`,
  `@sanity/vision`, `@sanity/color-input` dihapus lewat
  `npm uninstall` (lockfile diperbarui oleh package manager).
- `styled-components` ikut dihapus: **0 pemakaian** di seluruh `src/` dan
  konfigurasi (hanya peer dependency Studio). Mohon konfirmasi REY bila ingin
  dipertahankan.
- `@portabletext/react` **dipertahankan** (sudah diaudit): dipakai 4 halaman
  dan paket ini independen dari Sanity. Konten lokal berbentuk string dirender sebagai
  markdown-lite; blok Portable Text dirender lewat `<PortableText>`. Kedua jalur
  dipertahankan agar konten bermode baru tidak hilang.

### 3.4 Perilaku yang dipertahankan / diperbaiki

- Dua bahasa (id/en) untuk semua koleksi; pasangan `*En` tetap dipakai.
- `generateStaticParams` (services), `generateMetadata` (services, blog, portfolio,
  case study), dan `notFound()` untuk slug tidak dikenal.
- Struktur detail: palette, infrastructure/structure, page explanations, bullets,
  narrative, dan insight tetap dirender; field opsional dari konten migrasi
  (`overview`, `role`, `skills`, `designContent`, `colorPalette`,
  `pageExplanations`, `explanation`, `image`) tetap dikenali dan dirender bila
  ada, dengan fallback ke preset berdasarkan `category`.
- **Perbaikan**: `portfolio/page.tsx` sebelumnya memakai `updatedAt`/`_createdAt`
  Sanity dan jatuh ke `new Date(2024, 0, 1)` untuk data lokal — sehingga tahun
  dan tanggal kartu salah (2024). Sekarang memakai field `year` milik entri.
- **Perbaikan**: duplikasi slug yang dulu muncul dari pola
  `[...sanity, ...static]` tidak mungkin terjadi lagi karena hanya ada satu sumber.

## 4. Hasil validasi

### 4.1 Tooling

| Pemeriksaan | Baseline | Setelah |
|---|---|---|
| `npx tsc --noEmit` | exit 0 | **exit 0** |
| `npm run lint` | 80 problems (65 error, 15 warning) | **19 problems (10 error, 9 warning)** |
| `npm run build` | exit 0 (+ 404 Sanity) | **exit 0, tanpa satu pun log Sanity** |

Semua 19 masalah lint **sudah ada di baseline** (dicek dengan diff
`file + rule` terhadap baseline: **0 masalah baru**). Rincian sisa:
`no-explicit-any` di `portfolio/[slug]/page.tsx` (4), `DotGrid.tsx` (2),
`portfolio-utils.ts` (2), `services/page.tsx` (1); `no-img-element` (4);
`no-unused-vars` (4); `react-hooks/set-state-in-effect` di `HeroSection.tsx` (1);
`react-hooks/exhaustive-deps` di `DotGrid.tsx` (1). Tidak worsened oleh PR ini.

Route hasil build: `/`, `/_not-found`, dan 13 route `[locale]` — route
`/[locale]/studio/[[...index]]` sudah hilang.

Angka final setelah integrasi data mike ada di §8.2: lint turun menjadi
**18 problems (9 error, 9 warning)** karena satu `no-explicit-any` di
`services/page.tsx` ikut dibersihkan saat mengalihkan gambar layanan — bukan
error baru.

### 4.2 Route dan konten (server produksi, `npm start`)

- 26 route list + detail (id & en): **semua 200**.
- Semua slug detail: services 9/9, blog 6/6, portfolio 15/15, case study 10/10 —
  **200 di `id` maupun `en`**.
- Negatif: `/id/blog/tidak-ada-slug`, `/en/services/tidak-ada-slug`,
  `/id/portfolio/tidak-ada-slug`, `/id/case-study/tidak-ada-slug` → **404**;
  `/id/studio` → **404** (Studio sudah tidak ada).
- Link internal: 83 route dirayapi dari halaman list/home, **0 broken**.
- Tiap slug di data punya tautan dari halaman list (services 9, blog 6,
  portfolio 15; case study memakai navigasi client-side `router.push` di
  `CaseStudyShelf`, 10 volume tampil di SSR).
- Metadata: title/description detail terisi di kedua locale (contoh
  `/id/blog/panduan-seo-teknis-2025` → "Panduan SEO Teknis Lengkap untuk
  Developer", `/en/...` → "Complete Technical SEO Guide for Developers").
- Rich text: artikel blog merender heading + paragraf (h1/h2/p);
  `designContent`/Portable Text tetap didukung; case study merender
  6 `page-xx` + `<ul>` bullets; insight tampil di shelf id & en.
- Fallback portfolio: palette, structure, narrative preset, dan tahun 2025
  tampil benar (tidak ada lagi "1 Januari 2024").
- Host gambar yang muncul di HTML: `images.unsplash.com`, `ui-avatars.com`,
  `www.transparenttextures.com` (teksur latar) — **tidak ada `cdn.sanity.io`**.
  (Kondisi sebelum merge mike; setelah integrasi §8, host aset eksternal = 0.)

### 4.3 Bukti tidak ada Sanity saat runtime

Server produksi dijalankan dengan preload Node yang **memblokir dan mencatat**
setiap koneksi ke `*.sanity.io` (dns/https/net), diverifikasi benar-benar aktif
(percobaan `https://cdn.sanity.io/...` → diblokir, `https://example.com` → diizinkan).
Hasil: seluruh route di atas tetap 200 dan log server **tidak memuat satu pun
percobaan koneksi ke Sanity**.

`next/image`:
- `/_next/image?url=https://cdn.sanity.io/...` → **400** (sudah tidak ada di allowlist).
- `/_next/image?url=https://images.unsplash.com/...` → **200 image/jpeg**.

Grep source dan output build: 0 referensi Sanity di `src/`, `public/`,
`next.config.ts`, `package.json`, `package-lock.json`, dan `.next` — satu-satunya
kemunculan kata "Sanity" adalah dua string `technologies: [... "Sanity" ...]`
di `src/lib/data/portfolio.ts` (stack technology klien, file milik mike).

## 5. Dokumentasi

- `docs/sanity-migration/content-editing.md` — lokasi file konten, cara menambah
  entry per koleksi, pasangan field id/en, gambar lokal, aturan slug, dan
  checklist validasi sebelum deploy Vercel.

## 6. Kekurangan, batasan, dan hal yang perlu REY

Catatan: butir 1, 2, dan 5 di bawah adalah kondisi **sebelum** PR mike di-merge;
status terkininya ada di §8.

1. ~~**Konten belum final.**~~ **Selesai** — `origin/main` (PR mike #2) sudah
   di-merge (`3029743`) dan verifikasi final lulus (§8).
2. ~~**Gambar Sanity belum ada di repository / galeri masih Unsplash.**~~
   **Selesai** — aset mike sudah lokal, gambar layanan dialihkan ke
   `service-images.ts`, dan dua gambar 404 diganti fallback lokal (§8.1).
3. **`via.placeholder.com` masih di allowlist** tetapi tidak terpakai.
   `images.unsplash.com` dan `ui-avatars.com` juga kini tidak terpakai di HTML.
   Boleh dibuang pada PR terpisah (§8.5).
4. **`imageUrl` pada `pageExplanations`** dipakai `previewImages()` sebagai
   fallback `image`; konten lokal sebaiknya memakai `image`. Sudah ditandai di
   tipe bersama (`PortfolioPageExplanation`).
5. **Error lint tersisa** adalah baseline (final 9 error, 9 warning — §8.2);
   tidak dibersihkan di PR ini agar diff tetap fokus.
6. Butuh keputusan REY: penghapusan `styled-components` (§3.3), pembersihan
   allowlist host yang tidak terpakai, dan penggantian gambar fallback netral
   bila aset asli tersedia.

## 7. Prasyarat deployment

- `npm run build` harus hijau (sudah terbukti, tanpa env Sanity).
- Tidak ada environment variable Sanity yang perlu diset di Vercel.
- Setelah `npm run build`, `npm start` akan melayani situs penuh dari file repo.
- Deploy produksi tidak dilakukan oleh saya (menunggu instruksi REY).

## 8. Integrasi data mike dan verifikasi final (setelah PR #2)

### 8.1 Perubahan integrasi

**a. Gambar layanan lokal (§tugas 1).** Semua URL Unsplash di komponen diganti
aset lokal yang disiapkan mike lewat kontrak `src/lib/data/service-images.ts`:

| Consumer | Sebelum | Sesudah |
|---|---|---|
| `src/components/sections/ServicesSection.tsx` (homepage) | map `serviceGraphics` 9 URL Unsplash | `serviceImages[slug] ?? serviceFallbackImage` |
| `src/app/[locale]/(website)/services/page.tsx` (daftar) | map `serviceGraphics` 9 URL Unsplash | `serviceImages[slug] ?? serviceFallbackImage` |
| `src/app/[locale]/(website)/services/[slug]/page.tsx` (detail) | 1 URL Unsplash hardcoded | `serviceDetailHero` |

Bonus: `svc: any` di `services/page.tsx` dihapus sehingga satu error lint
baseline ikut hilang (bukan error baru).

**b. Tipe konten bersama (§tugas 2).** `src/types/index.ts` sekarang punya
`RichText = string | PortableTextBlock[]` (tipe blok dari `@portabletext/react`)
dan field opsional yang didokumentasikan di `content-editing.md`:

- `Service`: `content?`, `contentEn?`.
- `BlogPost`: `content`/`contentEn` menjadi `RichText` (sebelumnya hanya `string`).
- `Portfolio`: `overview/overviewEn`, `summary/summaryEn`, `projectType/…`,
  `role/…`, `tools`, `skills/skillsEn`, `designContent/…`, `structure`,
  `infrastructure`, `colorPalette`, `palette`, `pageExplanations`
  (`PortfolioPageExplanation` dengan `image`/`imageUrl` dan `explanation` RichText).
- `CaseStudyPageItem` (`src/lib/data/case-studies.ts`): `explanation/…`,
  `image`, `isContinuation` — penambahan **hanya tipe opsional**, tidak ada
  konten yang diubah.

Consumer disederhanakan memakai tipe bersama (tipe lokal `ServiceEntry`,
`PortfolioEntry`, `CaseStudyPageEntry` dihapus/diganti); perilaku render tetap
sama. Contoh di `content-editing.md` diperbarui mengikuti tipe ini.

**c. Dua gambar 404 (§tugas 3).** Tanpa menunggu REY, dua gambar yang tidak
dapat dipulihkan mike (`mike-report.md` §6) diganti fallback lokal netral
`/migrated/fallbacks/neutral-content.jpg` (salinan aset lokal yang sudah ada,
bukan hasil karangan dan bukan URL eksternal):

| Lokasi | Sebelum (404) | Sesudah |
|---|---|---|
| `src/lib/data/blog.ts` — thumbnail `arsitektur-microservices-modern` | `photo-1558494949-ef010cbdcc51` | `/migrated/fallbacks/neutral-content.jpg` |
| `src/lib/data/portfolio.ts` — `invoice-automation-enterprise-demo` galeri ke-2/4/6/8 | `photo-1554224154-26032fced8bd` | `/migrated/fallbacks/neutral-content.jpg` |

Referensi gambar lain di file data mike tidak diubah, konten teks tidak diubah.
Fallback dicatat di `content-editing.md` §5 agar mudah ditukar bila aset asli
tersedia.

### 8.2 Tooling

| Pemeriksaan | Baseline `f3f86e9` | Integrasi awal | Final (`3029743`) |
|---|---|---|---|
| `npx tsc --noEmit` | exit 0 | exit 0 | **exit 0** |
| `npm run lint` | 80 problems (65 error, 15 warning) | 19 problems (10 error, 9 warning) | **18 problems (9 error, 9 warning)** |
| `npm run build` | exit 0 (+ 404 Sanity) | exit 0, tanpa Sanity | **exit 0, tanpa log Sanity** |

Selisih lint final dibanding integrasi awal: satu error `no-explicit-any`
di `services/page.tsx` hilang; **tidak ada error/warning baru**. Sisa 9 error
semuanya baseline: `portfolio/[slug]/page.tsx` (4), `DotGrid.tsx` (2),
`portfolio-utils.ts` (2), `HeroSection.tsx` `react-hooks/set-state-in-effect` (1).
Tidak dibersihkan agar diff tetap fokus (sesuai brief).

Build: 40 halaman statis, route `/`, `/_not-found`, dan 13 route `[locale]`;
Studio tetap tidak ada.

### 8.3 Route dan konten (server produksi `npm start`)

Hasil crawl otomatis (104 URL: 19 halaman list/home + 80 detail dua bahasa +
5 negatif):

- **19 halaman list/home** (`/`, `/id`, `/en`, about, services, blog, portfolio,
  case-study, faq, contact) → **semua 200**.
- **80 halaman detail** (services 9, blog 6, portfolio 15, case study 10 — id &
  en) → **semua 200**.
- Negatif: `/id/blog/tidak-ada-slug`, `/en/services/tidak-ada-slug`,
  `/id/portfolio/tidak-ada-slug`, `/id/case-study/tidak-ada-slug`,
  `/id/studio` → **semua 404**.
- Tautan internal: **83 tautan** dirayapi dari halaman list/home → **0 broken**.

### 8.4 Gambar

- **44** permintaan `/_next/image` (semua gambar teroptimasi) → **semua 200**.
- **50** aset lokal unik (`/migrated/**`, `/fallbacks` turunan) → **semua 200**.
- **0 host aset eksternal** di HTML yang dirender (tidak ada
  `images.unsplash.com` / `ui-avatars.com` / `via.placeholder.com`).
  Fallback `ui-avatars.com` di halaman blog tetap ada di kode sebagai cabang mati
  (data avatar sudah lokal) dan tidak pernah terpicu.
- Verifikasi langsung: halaman services & home merender path
  `/migrated/services/**`; detail layanan memakai `/migrated/services/detail-hero.jpg`;
  thumbnail microservices dan galeri invoice automation merender
  `/migrated/fallbacks/neutral-content.jpg`.

### 8.5 Tidak ada Sanity

- Grep `src/**` untuk `sanity`: hanya path dokumentasi
  `docs/sanity-migration/content-editing.md`; tidak ada kode/klien/query Sanity.
- Grep output build `.next` untuk `cdn.sanity.io` / `apicdn.sanity.io`: **kosong**.
- `package.json` & `package-lock.json`: **tidak ada** dependency Sanity.
- Tidak ada file `.env*` Sanity; `next.config.ts` tidak punya `cdn.sanity.io`.
- Log `npm run build` dan `npm start`: **tidak ada** percobaan request Sanity.
- Scan HTML semua route: **0 kemunculan** `sanity.io`.

`images.remotePatterns` masih memuat `images.unsplash.com`, `ui-avatars.com`,
`via.placeholder.com` (warisan keputusan bersama). Ketiganya **tidak terpakai** di
HTML saat ini — kandidat pembersihan pada PR terpisah.

### 8.6 File yang berubah pada integrasi ini

`src/types/index.ts`, `src/components/sections/ServicesSection.tsx`,
`src/app/[locale]/(website)/services/page.tsx`,
`src/app/[locale]/(website)/services/[slug]/page.tsx`,
`src/app/[locale]/(website)/portfolio/[slug]/page.tsx`,
`src/app/[locale]/(website)/case-study/[slug]/page.tsx`,
`src/lib/data/blog.ts`, `src/lib/data/portfolio.ts`,
`src/lib/data/case-studies.ts`, `docs/sanity-migration/content-editing.md`,
`public/migrated/fallbacks/neutral-content.jpg` (baru), dan laporan ini.

### 8.7 Masih terbuka / untuk keputusan REY

1. **Gambar fallback netral** untuk 2 aset yang hilang bersifat sementara —
   ganti bila pemilik konten menyediakan aset asli (`content-editing.md` §5).
2. **6 kandidat dokumen Sanity yang tidak dipublikasikan** (`mike-report.md` §7)
   tetap tidak dapat diverifikasi; di luar lingkup tanpa login/export Sanity.
3. **Allowlist `images.remotePatterns`** yang tidak terpakai (§8.5) dan
   penghapusan `styled-components` (§3.3) menunggu keputusan REY.
4. **9 error lint baseline** (§8.2) tidak dibersihkan pada PR ini.

### 8.8 Prasyarat deployment & PR

- `npm run build` hijau tanpa env Sanity (terbukti di §8.2).
- `npm start` melayani seluruh route dari file repo (terbukti di §8.3–8.5).
- Deploy produksi dan merge ke `main` **tidak** dilakukan oleh saya; PR ke `main`
  dibuat untuk review & merge REY.

## 9. Review lokal halaman (susulan)

Review dijalankan dengan `npm run build` lalu `npm start` di `http://localhost:3000`,
menggabungkan: crawl HTTP semua route, script yang membandingkan HTML yang dirender
dengan `src/lib/data/**`, serta pemeriksaan DOM & network di browser sungguhan.

### 9.1 Hasil

| Grup (detail id+en) | Halaman | Lulus |
|---|---|---|
| Services | 18 | 17 + 1 false positive |
| Blog | 12 | 12 |
| Portfolio | 30 | 30 |
| Case study | 20 | 20 |
| List/home/about/faq/contact | 19 | 19 |
| **Total** | **99** | **99** |

- Satu-satunya flag (`/id/services/keamanan-siber`) berasal dari kata
  "Cybersecurity" pada teks sejarah perusahaan di payload RSC — bukan kebocoran
  locale. Jadi efektif **99/99 benar**.
- **Gambar**: 44 `/_next/image` + 50 aset lokal → semua 200; di browser semua
  gambar termuat (`naturalWidth > 0`, 0 broken). **0 host aset eksternal**.
- **Tautan internal**: 83 diperiksa → **0 broken**.
- **Slug tidak dikenal** dan `/id/studio` → **404**.
- **Kelengkapan list**: services 9/9, blog 6/6, portfolio 15/15, case study 10/10
  tampil di list id & en.
- **Locale**: `/en/*` menampilkan teks Inggris, `/id/*` Indonesia, tanpa bocor.
- **Network browser**: hanya `localhost:3000` + Google Fonts (font situs);
  **tidak ada** Sanity/Unsplash/ui-avatars.
- **Rich text** blog (`<h2>`) dan jumlah halaman case study sesuai data.

### 9.2 Temuan pre-existing dan tindak lanjut

1. **`<html lang="id">` hardcoded untuk halaman `/en/*`.** Root layout adalah
   satu-satunya tempat yang boleh mendeklarasikan `<html>` dan tidak menerima
   param `[locale]`, sedangkan route `/` masih butuh root layout. Ditambahkan
   komponen klien `src/components/i18n/LocaleInitializer.tsx` (pola sama dengan
   `ThemeInitializer`) yang menyelaraskan `document.documentElement.lang` dengan
   locale aktif — **diperbaiki** pada PR ini. Catatan batasan: HTML server-side
   tetap default `id`; DOM pada browser (termasuk yang dirender Google) sudah
   benar. Perbaikan server-side penuh butuh menjadikan `app/[locale]/layout.tsx]`
   sebagai root layout + middleware, di luar lingkup dan berisiko di sini.
2. **Landing `/{locale}` (dan `/`) tidak punya `<h1>`** karena `HeroSection`
   adalah splash animasi; halaman home sesungguhnya `/{locale}/home` dan `<h1>`-nya
   benar. Kemungkinan by design — tidak diubah.
3. **Beberapa halaman list** (`/en/portfolio`, `/en/blog`, `/en/case-study`,
   `/en/faq`, `/en/contact`) memakai title metadata default, sedangkan halaman
   detail sudah terlokalisasi. Pre-existing, tidak diubah.
4. Entri `_rsc=...` berstatus "failed" di network adalah prefetch `<Link>` Next
   yang ter-abort saat berpindah halaman; status HTTP-nya 200, bukan error.
5. `favicon.svg` ada dan 200.

### 9.3 File tambahan (susulan review)

`src/components/i18n/LocaleInitializer.tsx` (baru),
`src/app/[locale]/layout.tsx`, dan bagian §9 laporan ini. Typecheck tetap exit 0
dan lint tetap 18 problems (9 error, 9 warning) — tidak ada masalah baru.

## 10. Revisi review PR #3 — renderer RichText dan regression test

Review PR #3 menemukan dua bug renderer. Keduanya diperbaiki di branch
`hellyeah` yang sama, tanpa mengubah konten yang sudah ada.

### 10.1 Bug dan akar masalah

| # | Bug | Akar masalah |
|---|---|---|
| 1 | Penjelasan portfolio Portable Text error render | `pageExplanations[].explanation`/`explanationEn` (bertipe `RichText`) dipasang langsung sebagai child React `<p>{item.text}</p>` — array blok memicu *"Objects are not valid as a React child"* |
| 2 | Konten string diabaikan | `Service.content`/`contentEn` dan `Portfolio.designContent`/`designContentEn` hanya dicek `Array.isArray`; string jatuh ke deskripsi/preset sehingga tidak tampil |

### 10.2 Perbaikan

**a. Satu renderer bersama: `src/components/ui/RichTextContent.tsx` (baru).**

- Array blok → `<PortableText>`.
- String → markdown-lite sesuai `content-editing.md`: baris `# `, `## `, `### `
  menjadi heading, baris lain menjadi paragraf.
- String kosong/spasi saja dan array kosong → fallback; `undefined` → fallback.
- `hasRichText()` (type guard) dipakai bila pemanggil perlu tahu isi konten.
- `fallback` **hanya** dipakai saat konten benar-benar belum diisi, sehingga
  deskripsi/preset tidak pernah menimpa konten string.

**b. `portfolio/[slug]/page.tsx`.** `designContent` dirender lewat
`RichTextContent` dengan fallback narasi preset; `pageExps` menyimpan nilai
`RichText` apa adanya, lalu setiap item dirender lewat komponen yang sama
dengan fallback `pageDescription(title, locale)` bila penjelasan kosong.
`(item: any)` dihapus dan `displayStructure` diberi tipe `string[]` (akibatnya
satu error lint `no-explicit-any` baseline ikut hilang, bukan masalah baru).

**c. `services/[slug]/page.tsx`.** `content` dirender lewat `RichTextContent`
dengan fallback `<p>{desc}</p>` yang hanya muncul bila `content`/`contentEn`
kosong. Tidak ada lagi cabang yang membuang string.

Tidak ada nilai di `src/lib/data/**` yang diubah pada revisi ini.

### 10.3 Regression test (baru)

Repo sebelumnya belum punya test runner. Ditambahkan devDependency
`vitest` + `@vitejs/plugin-react`, script `npm run test`, dan
`vitest.config.mts` (environment `node`, alias `@` → `src`).

| File | Cakupan |
|---|---|
| `tests/rich-text-content.test.tsx` | 4 test: Portable Text, string markdown-lite, fallback untuk `undefined`/`null`/`""`/spasi/array kosong, dan kasus tanpa fallback |
| `tests/portfolio-detail-page.test.tsx` | 3 test: halaman detail portfolio (id & en) dengan `designContent` string/Portable Text, penjelasan array/string/hilang, dan preset saat konten kosong |
| `tests/service-detail-page.test.tsx` | 4 test: halaman detail layanan (id & en) dengan `content` string/Portable Text, fallback deskripsi saat konten kosong, dan `notFound()` untuk slug tidak dikenal |
| `tests/fixtures/rich-text-fixtures.ts` | Data fixture dua bahasa untuk kedua halaman; tidak menyentuh `src/lib/data/**` |

Test memanggil fungsi page async secara langsung lalu merender elemen hasilnya
dengan `renderToStaticMarkup`, karena Vitest belum mendukung async Server
Component secara langsung (lihat panduan testing di `node_modules/next/dist/docs`).
Karena itu verifikasi runtime lewat server sungguhan tetap dilakukan (§10.4).

**Bukti test benar-benar menangkap bug:** dengan dua perbaikan halaman di-stash
(kondisi kode lama), `npm run test` gagal 3/11 — termasuk
`Objects are not valid as a React child` untuk penjelasan Portable Text dan
assertion tidak menemukan konten string layanan. Setelah perbaikan dikembalikan,
11/11 lulus.

### 10.4 Verifikasi runtime konten contoh (id & en, sementara lalu direvert)

Konten contoh ditambahkan sementara ke `src/lib/data/portfolio.ts` (designContent
string id + Portable Text en, pageExplanations Portable Text id + string en +
satu penjelasan kosong) dan `src/lib/data/services.ts` (content string id +
Portable Text en), lalu `npm run build` dan `npm start`. Hasil `curl`:

| URL | Status | Konten yang diverifikasi |
|---|---|---|
| `/id/portfolio/portal-procurement-b2b-demo` | 200 | designContent string, penjelasan Portable Text, penjelasan string, fallback halaman kosong |
| `/en/portfolio/portal-procurement-b2b-demo` | 200 | designContent Portable Text, penjelasan string, fallback halaman kosong |
| `/id/services/pembuatan-website-aplikasi` | 200 | content string |
| `/en/services/pembuatan-website-aplikasi` | 200 | content Portable Text |

Tidak ada `[object Object]` di HTML mana pun. Setelah verifikasi, kedua file data
dikembalikan dengan `git checkout` — `git status` memastikan tidak ada perubahan
konten yang ikut ter-commit.

### 10.5 Tooling final (setelah revert konten contoh)

| Pemeriksaan | Baseline `f3f86e9` | Sebelum revisi | Setelah revisi |
|---|---|---|---|
| `npx tsc --noEmit` | exit 0 | exit 0 | **exit 0** |
| `npm run test` | — (belum ada) | — | **11/11 lulus** |
| `npm run lint` | 80 problems (65 error, 15 warning) | 18 problems (9 error, 9 warning) | **17 problems (8 error, 9 warning)** |
| `npm run build` | exit 0 (+ 404 Sanity) | exit 0 | **exit 0, tanpa log Sanity** |

Perbandingan lint per file+rule dengan baseline: **0 masalah baru**. Satu error
`no-explicit-any` di `portfolio/[slug]/page.tsx` hilang karena `(item: any)`
dihapus. Sisa 17 masalah semuanya baseline dan **tidak diperbaiki di PR ini**
(dicatat terpisah): `no-explicit-any` — `portfolio/[slug]/page.tsx` (3),
`DotGrid.tsx` (2), `portfolio-utils.ts` (2); `no-unused-vars` —
`about/page.tsx`, `case-study/[slug]/page.tsx`, `contact/page.tsx`,
`faq/page.tsx` (masing-masing 1); `@next/next/no-img-element` —
`case-study/[slug]/page.tsx` (1), `services/page.tsx` (1),
`ServicesSection.tsx` (2); `react-hooks/exhaustive-deps` — `DotGrid.tsx` (1);
`react-hooks/set-state-in-effect` — `HeroSection.tsx` (1).

### 10.6 File yang berubah pada revisi ini

`src/components/ui/RichTextContent.tsx` (baru),
`src/app/[locale]/(website)/portfolio/[slug]/page.tsx`,
`src/app/[locale]/(website)/services/[slug]/page.tsx`,
`tests/rich-text-content.test.tsx`, `tests/portfolio-detail-page.test.tsx`,
`tests/service-detail-page.test.tsx`,
`tests/fixtures/rich-text-fixtures.ts`, `vitest.config.mts`,
`package.json`, `package-lock.json`, dan laporan ini. Tidak ada file di
`src/lib/data/**` yang berubah; tidak ada konten yang diubah untuk menghindari
bug.

### 10.7 Cara verifikasi ulang

```bash
npm install
npm run test        # 11 test regresi renderer RichText
npx tsc --noEmit
npm run lint        # 17 problems baseline (bukan regresi)
npm run build
```

Merge ke `main` dan deploy produksi tetap tidak dilakukan.

