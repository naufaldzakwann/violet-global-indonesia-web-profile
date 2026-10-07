# Laporan Mike — Migrasi Konten & Aset ke Repository

- **Branch:** `mike` (baseline `f3f86e9`, sudah merge brief `304b5ef` dari `origin/main`)
- **Tanggal:** 26 September 2026
- **Sumber:** https://violetglobalindonesia.com — **tanpa login Sanity**
- **Lingkup file yang diubah:** `src/lib/data/**`, `public/migrated/**`, laporan ini

## 1. Ringkasan

- Seluruh route publik dua bahasa berhasil diinventaris: 16 halaman utama/list + 80 halaman detail = **96 URL**, semuanya merespons `200`. Root `/` mengarah ke locale `en`; prefix `/id` dan `/en` sama-sama aktif.
- **Tidak ditemukan konten Sanity di website publik.** Tidak ada referensi `cdn.sanity.io`/`apicdn.sanity.io` di 96 halaman maupun chunk JS utama. Jumlah item setiap koleksi publik identik dengan data lokal.
- **161 referensi aset** dialihkan dari URL eksternal ke **52 file lokal** di `public/migrated/**` (12,02 MB): 36 foto Unsplash + 9 avatar UI-Avatars (+ salinan lintas koleksi).
- **2 gambar unik (5 referensi) tidak dapat dipulihkan**: 404 di Unsplash dan 404 juga di image optimizer situs publik. Dicatat sebagai kekurangan, tidak dikarang.
- `npx tsc --noEmit` dan `npx eslint src/lib/data` lolos. Slug unik per koleksi. Semua path lokal yang direferensikan data ada.
- Tidak ada dependency, lockfile, route, loader, schema, maupun komponen yang diubah.

## 2. Akses dan metode

- Crawl HTTP memakai `Invoke-WebRequest` (PowerShell) dan `fetch` (Node) ke semua route `/id/*` dan `/en/*`, termasuk isi RSC payload.
- `robots.txt` menunjuk `Sitemap: https://violetglobal.id/sitemap.xml`; `https://violetglobalindonesia.com/sitemap.xml` merespons 404 dan `https://violetglobal.id/sitemap.xml` gagal transport. Discovery route dilakukan lewat navigasi + halaman list tiap koleksi, bukan sitemap.
- Pencarian bukti Sanity: `cdn.sanity.io`, `apicdn.sanity.io`, dan `sanity`/`projectId` pada chunk JS — tidak ada konten dari CMS. `src/sanity/lib/client.ts` memakai fallback `'your-project-id'` dan tidak ada `.env.local` di repo, sehingga dataset Sanity tidak dapat diverifikasi dari sisi ini.
- Situs yang ter-deploy merender data fallback lokal (`src/lib/data/**`) untuk semua halaman yang diperiksa.

## 3. Inventaris halaman publik

### 3.1 Halaman utama dan list

| Halaman | URL ID | URL EN | Konten/data terkait | Status |
|---|---|---|---|---|
| Home | /id/home | /en/home | Hero, layanan, portfolio unggulan, testimoni, CTA (`messages` + `services` + `portfolios` + `testimonials`) | Lengkap |
| About | /id/about | /en/about | Visi/misi/history (`messages`) + `teamMembers`, `coreValues` | Lengkap |
| Services (list) | /id/services | /en/services | `services` (9) | Lengkap |
| Portfolio (list) | /id/portfolio | /en/portfolio | `portfolios` (15) | Lengkap |
| Case Study (list) | /id/case-study | /en/case-study | `caseStudies` (10) | Lengkap |
| Blog (list) | /id/blog | /en/blog | `blogPosts` (6) | Lengkap |
| FAQ | /id/faq | /en/faq | `faqs` (8) | Lengkap |
| Contact | /id/contact | /en/contact | Form + info kontak (`messages`) | Lengkap |
| Studio Sanity | /id/studio | — | Bukan konten publik; akan dihapus hellyeah | Di luar lingkup |

Catatan: `stats` (4 entri di `general.ts`) tidak terlihat dirender pada halaman publik yang diinventaris; data tetap dipertahankan.

### 3.2 Services (9)

| # | Slug | Judul ID | Judul EN | URL ID | URL EN | Aset |
|---|---|---|---|---|---|---|
| 1 | `pembuatan-website-aplikasi` | Pembuatan Website & Aplikasi | Website & Application Development | /id/services/pembuatan-website-aplikasi | /en/services/pembuatan-website-aplikasi | 1 kartu + hero detail |
| 2 | `konsultasi-it` | Konsultasi IT | IT Consulting | /id/services/konsultasi-it | /en/services/konsultasi-it | 1 kartu + hero detail |
| 3 | `keamanan-siber` | Keamanan Siber | Cybersecurity | /id/services/keamanan-siber | /en/services/keamanan-siber | 1 kartu + hero detail |
| 4 | `social-media-management` | Social Media Management | Social Media Management | /id/services/social-media-management | /en/services/social-media-management | 1 kartu + hero detail |
| 5 | `optimasi-digital` | Optimasi Digital | Digital Optimization | /id/services/optimasi-digital | /en/services/optimasi-digital | 1 kartu + hero detail |
| 6 | `desain-grafis-branding` | Desain Grafis & Branding | Graphic Design & Branding | /id/services/desain-grafis-branding | /en/services/desain-grafis-branding | 1 kartu + hero detail |
| 7 | `ecommerce-marketplace` | E-Commerce & Marketplace | E-Commerce & Marketplace | /id/services/ecommerce-marketplace | /en/services/ecommerce-marketplace | 1 kartu + hero detail |
| 8 | `data-analytics-business-intelligence` | Data Analytics & Business Intelligence | Data Analytics & Business Intelligence | /id/services/data-analytics-business-intelligence | /en/services/data-analytics-business-intelligence | 1 kartu + hero detail |
| 9 | `automasi-integrasi-sistem` | Automasi & Integrasi Sistem | Automation & System Integration | /id/services/automasi-integrasi-sistem | /en/services/automasi-integrasi-sistem | 1 kartu + hero detail |

Aset service saat ini di-hardcode di komponen (milik hellyeah). Salinan lokal sudah disiapkan: `public/migrated/services/<slug>.jpg` + `detail-hero.jpg`, dan tersedia modul kontrak `src/lib/data/service-images.ts`.

### 3.3 Portfolio (15)

| # | Slug | Judul ID | Judul EN | URL ID | URL EN | Aset lokal |
|---|---|---|---|---|---|---|
| 1 | `sistem-erp-manufaktur-jaya` | Sistem ERP Manufaktur Jaya | Manufaktur Jaya ERP System | /id/portfolio/sistem-erp-manufaktur-jaya | /en/portfolio/sistem-erp-manufaktur-jaya | 2 |
| 2 | `dashboard-bi-retail-chain` | Dashboard BI untuk Retail Chain | BI Dashboard for Retail Chain | /id/portfolio/dashboard-bi-retail-chain | /en/portfolio/dashboard-bi-retail-chain | 1 |
| 3 | `platform-ecommerce-fashion` | Platform E-Commerce Fashion Brand | Fashion Brand E-Commerce Platform | /id/portfolio/platform-ecommerce-fashion | /en/portfolio/platform-ecommerce-fashion | 1 |
| 4 | `rebrand-perusahaan-logistik` | Rebranding Perusahaan Logistik | Logistics Company Rebranding | /id/portfolio/rebrand-perusahaan-logistik | /en/portfolio/rebrand-perusahaan-logistik | 1 |
| 5 | `automasi-hr-perusahaan-tbk` | Automasi HR Perusahaan Tbk | HR Automation for Public Company | /id/portfolio/automasi-hr-perusahaan-tbk | /en/portfolio/automasi-hr-perusahaan-tbk | 1 |
| 6 | `penetration-testing-bank-bpr` | Security Audit BPR Regional | Regional BPR Security Audit | /id/portfolio/penetration-testing-bank-bpr | /en/portfolio/penetration-testing-bank-bpr | 1 |
| 7 | `portal-procurement-b2b-demo` | Portal Procurement B2B | B2B Procurement Portal | /id/portfolio/portal-procurement-b2b-demo | /en/portfolio/portal-procurement-b2b-demo | 2 |
| 8 | `sales-command-center-demo` | Sales Command Center Nasional | National Sales Command Center | /id/portfolio/sales-command-center-demo | /en/portfolio/sales-command-center-demo | 2 |
| 9 | `marketplace-omnichannel-furniture-demo` | Omnichannel Furniture Commerce | Furniture Omnichannel Commerce | /id/portfolio/marketplace-omnichannel-furniture-demo | /en/portfolio/marketplace-omnichannel-furniture-demo | 2 |
| 10 | `brand-refresh-fnb-chain-demo` | Brand Refresh F&B Chain | F&B Chain Brand Refresh | /id/portfolio/brand-refresh-fnb-chain-demo | /en/portfolio/brand-refresh-fnb-chain-demo | 2 |
| 11 | `invoice-automation-enterprise-demo` | Invoice Automation Enterprise | Enterprise Invoice Automation | /id/portfolio/invoice-automation-enterprise-demo | /en/portfolio/invoice-automation-enterprise-demo | 1 (+1 tidak terpulihkan) |
| 12 | `security-hardening-saas-demo` | Security Hardening SaaS Platform | SaaS Platform Security Hardening | /id/portfolio/security-hardening-saas-demo | /en/portfolio/security-hardening-saas-demo | 2 |
| 13 | `customer-self-service-portal-demo` | Customer Self-Service Portal | Customer Self-Service Portal | /id/portfolio/customer-self-service-portal-demo | /en/portfolio/customer-self-service-portal-demo | 2 |
| 14 | `marketing-performance-hub-demo` | Marketing Performance Hub | Marketing Performance Hub | /id/portfolio/marketing-performance-hub-demo | /en/portfolio/marketing-performance-hub-demo | 2 |
| 15 | `premium-residence-sales-site-demo` | Premium Residence Sales Site | Premium Residence Sales Site | /id/portfolio/premium-residence-sales-site-demo | /en/portfolio/premium-residence-sales-site-demo | 2 |

### 3.4 Blog (6)

| # | Slug | Judul ID | Judul EN | URL ID | URL EN | Aset lokal |
|---|---|---|---|---|---|---|
| 1 | `panduan-seo-teknis-2025` | Panduan SEO Teknis Lengkap untuk Developer | Complete Technical SEO Guide for Developers | /id/blog/panduan-seo-teknis-2025 | /en/blog/panduan-seo-teknis-2025 | thumbnail + author |
| 2 | `kenapa-bisnis-butuh-keamanan-siber` | Kenapa Bisnis Anda Butuh Keamanan Siber Sekarang | Why Your Business Needs Cybersecurity Now | /id/blog/kenapa-bisnis-butuh-keamanan-siber | /en/blog/kenapa-bisnis-butuh-keamanan-siber | thumbnail + author |
| 3 | `tren-desain-web-2025` | 10 Tren Desain Web yang Mendominasi 2025 | 10 Web Design Trends Dominating 2025 | /id/blog/tren-desain-web-2025 | /en/blog/tren-desain-web-2025 | thumbnail + author |
| 4 | `optimalisasi-konversi-ecommerce` | Meningkatkan Konversi E-commerce dengan Psikologi Warna | Boosting E-commerce Conversion with Color Psychology | /id/blog/optimalisasi-konversi-ecommerce | /en/blog/optimalisasi-konversi-ecommerce | thumbnail + author |
| 5 | `arsitektur-microservices-modern` | Membangun Arsitektur Microservices yang Scalable | Building Scalable Microservices Architecture | /id/blog/arsitektur-microservices-modern | /en/blog/arsitektur-microservices-modern | author (+1 thumbnail tidak terpulihkan) |
| 6 | `pentingnya-zero-trust-security` | Kenapa Zero Trust Adalah Masa Depan Keamanan Siber | Why Zero Trust is the Future of Cybersecurity | /id/blog/pentingnya-zero-trust-security | /en/blog/pentingnya-zero-trust-security | thumbnail + author |

### 3.5 Case Study (10)

| # | Slug | Judul (ID/EN) | URL ID | URL EN | Aset |
|---|---|---|---|---|---|
| 1 | `retail-behavior-map` | Retail Behavior Map | /id/case-study/retail-behavior-map | /en/case-study/retail-behavior-map | Gradien warna dari data |
| 2 | `b2b-dashboard-priorities` | B2B Dashboard Priorities | /id/case-study/b2b-dashboard-priorities | /en/case-study/b2b-dashboard-priorities | Gradien warna dari data |
| 3 | `brand-perception-study` | Brand Perception Study | /id/case-study/brand-perception-study | /en/case-study/brand-perception-study | Gradien warna dari data |
| 4 | `finance-automation-review` | Finance Automation Review | /id/case-study/finance-automation-review | /en/case-study/finance-automation-review | Gradien warna dari data |
| 5 | `security-readiness-index` | Security Readiness Index | /id/case-study/security-readiness-index | /en/case-study/security-readiness-index | Gradien warna dari data |
| 6 | `service-blueprint-review` | Service Blueprint Review | /id/case-study/service-blueprint-review | /en/case-study/service-blueprint-review | Gradien warna dari data |
| 7 | `market-entry-observation` | Market Entry Observation | /id/case-study/market-entry-observation | /en/case-study/market-entry-observation | Gradien warna dari data |
| 8 | `learning-platform-audit` | Learning Platform Audit | /id/case-study/learning-platform-audit | /en/case-study/learning-platform-audit | Gradien warna dari data |
| 9 | `community-engagement-read` | Community Engagement Read | /id/case-study/community-engagement-read | /en/case-study/community-engagement-read | Gradien warna dari data |
| 10 | `mobility-journey-study` | Mobility Journey Study | /id/case-study/mobility-journey-study | /en/case-study/mobility-journey-study | Gradien warna dari data |

### 3.6 Konten umum

| Koleksi | Jumlah | Lokasi data | Terlihat di publik |
|---|---|---|---|
| FAQ | 8 | `src/lib/data/general.ts` | Ya (/id/faq, /en/faq) |
| Testimoni | 5 | `src/lib/data/general.ts` | Ya (home) |
| Tim | 4 | `src/lib/data/general.ts` | Ya (about) |
| Core values | 4 | `src/lib/data/general.ts` | Ya (about) |
| Stats | 4 | `src/lib/data/general.ts` | Tidak terlihat dirender |

## 4. Perbandingan dengan data lokal

| Koleksi | Publik | Lokal | Duplikat | Slug identik |
|---|---|---|---|---|
| Services | 9 | 9 | 0 | Ya |
| Portfolio | 15 | 15 | 0 | Ya |
| Blog | 6 | 6 | 0 | Ya |
| Case Study | 10 | 10 | 0 | Ya |
| FAQ | 8 | 8 | 0 | — |
| Testimoni | 5 | 5 | 0 | — |
| Tim | 4 | 4 | 0 | — |

- Tidak ada item publik yang belum ada di data lokal, sehingga tidak ada konten baru yang perlu ditambahkan. Yang dimigrasikan adalah **aset gambar** (tugas 4 brief).
- Audit otomatis field dua bahasa: 0 field kosong pada seluruh koleksi.
- Pemeriksaan paritas teks 80 halaman detail: 50 pemeriksaan cocok persis; 30 sisanya adalah field `client` pada portfolio yang memang tidak dirender di halaman detail (juga tidak ada di HTML publik) — bukan selisih konten.

## 5. Aset yang dimigrasikan

Semua foto Unsplash diunduh pada varian `auto=format&fit=crop&w=1600&q=80`; avatar UI-Avatars pada `size=240&format=png`. URL sumber di bawah adalah referensi asli pada data/komponen.

| # | Path lokal | URL sumber | Ukuran |
|---|---|---|---|
| 1 | `/migrated/blog/authors/andika-setiawan.png` | https://ui-avatars.com/api/?name=Andika+Setiawan&background=6A0DAD&color=fff | 5 KB |
| 2 | `/migrated/blog/authors/farhan-hidayat.png` | https://ui-avatars.com/api/?name=Farhan+Hidayat&background=1A73E8&color=fff | 1 KB |
| 3 | `/migrated/blog/authors/rizky-pratama.png` | https://ui-avatars.com/api/?name=Rizky+Pratama&background=4B0082&color=fff | 4 KB |
| 4 | `/migrated/blog/authors/sari-dewi.png` | https://ui-avatars.com/api/?name=Sari+Dewi&background=4B0082&color=fff | 5 KB |
| 5 | `/migrated/blog/kenapa-bisnis-butuh-keamanan-siber/thumbnail.jpg` | https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80 | 343 KB |
| 6 | `/migrated/blog/optimalisasi-konversi-ecommerce/thumbnail.jpg` | https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80 | 57 KB |
| 7 | `/migrated/blog/panduan-seo-teknis-2025/thumbnail.jpg` | https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80 | 1851 KB |
| 8 | `/migrated/blog/pentingnya-zero-trust-security/thumbnail.jpg` | https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80 | 234 KB |
| 9 | `/migrated/blog/tren-desain-web-2025/thumbnail.jpg` | https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80 | 403 KB |
| 10 | `/migrated/portfolio/automasi-hr-perusahaan-tbk/01-15731647.jpg` | https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80 | 215 KB |
| 11 | `/migrated/portfolio/brand-refresh-fnb-chain-demo/01-15172481.jpg` | https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80 | 392 KB |
| 12 | `/migrated/portfolio/brand-refresh-fnb-chain-demo/02-14730932.jpg` | https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&pos=1 | 245 KB |
| 13 | `/migrated/portfolio/customer-self-service-portal-demo/01-15163213.jpg` | https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80 | 186 KB |
| 14 | `/migrated/portfolio/customer-self-service-portal-demo/02-14980501.jpg` | https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&pos=1 | 192 KB |
| 15 | `/migrated/portfolio/dashboard-bi-retail-chain/01-15516509.jpg` | https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80 | 199 KB |
| 16 | `/migrated/portfolio/invoice-automation-enterprise-demo/01-14541658.jpg` | https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80 | 232 KB |
| 17 | `/migrated/portfolio/marketing-performance-hub-demo/01-15206071.jpg` | https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80 | 236 KB |
| 18 | `/migrated/portfolio/marketing-performance-hub-demo/02-15512880.jpg` | https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&pos=1 | 196 KB |
| 19 | `/migrated/portfolio/marketplace-omnichannel-furniture-demo/01-15056934.jpg` | https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80 | 493 KB |
| 20 | `/migrated/portfolio/marketplace-omnichannel-furniture-demo/02-14936632.jpg` | https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80&pos=1 | 243 KB |
| 21 | `/migrated/portfolio/penetration-testing-bank-bpr/01-15639867.jpg` | https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80 | 206 KB |
| 22 | `/migrated/portfolio/platform-ecommerce-fashion/01-16070823.jpg` | https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80 | 183 KB |
| 23 | `/migrated/portfolio/portal-procurement-b2b-demo/01-15567407.jpg` | https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&q=80 | 233 KB |
| 24 | `/migrated/portfolio/portal-procurement-b2b-demo/02-15542241.jpg` | https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&pos=1 | 157 KB |
| 25 | `/migrated/portfolio/premium-residence-sales-site-demo/01-14603174.jpg` | https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80 | 259 KB |
| 26 | `/migrated/portfolio/premium-residence-sales-site-demo/02-15056934.jpg` | https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&pos=1 | 493 KB |
| 27 | `/migrated/portfolio/rebrand-perusahaan-logistik/01-16267857.jpg` | https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80 | 227 KB |
| 28 | `/migrated/portfolio/sales-command-center-demo/01-15181862.jpg` | https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80 | 289 KB |
| 29 | `/migrated/portfolio/sales-command-center-demo/02-14609258.jpg` | https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&pos=1 | 189 KB |
| 30 | `/migrated/portfolio/security-hardening-saas-demo/01-15105114.jpg` | https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80 | 131 KB |
| 31 | `/migrated/portfolio/security-hardening-saas-demo/02-15630135.jpg` | https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80&pos=1 | 123 KB |
| 32 | `/migrated/portfolio/sistem-erp-manufaktur-jaya/01-15512880.jpg` | https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80 | 196 KB |
| 33 | `/migrated/portfolio/sistem-erp-manufaktur-jaya/02-14609258.jpg` | https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&pos=1 | 189 KB |
| 34 | `/migrated/services/automasi-integrasi-sistem.jpg` | https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=85 | 294 KB |
| 35 | `/migrated/services/data-analytics-business-intelligence.jpg` | https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=85 | 196 KB |
| 36 | `/migrated/services/desain-grafis-branding.jpg` | https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=600&q=85 | 228 KB |
| 37 | `/migrated/services/detail-hero.jpg` | https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop | 189 KB |
| 38 | `/migrated/services/ecommerce-marketplace.jpg` | https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=85 | 123 KB |
| 39 | `/migrated/services/keamanan-siber.jpg` | https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=85 | 234 KB |
| 40 | `/migrated/services/konsultasi-it.jpg` | https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=85 | 155 KB |
| 41 | `/migrated/services/optimasi-digital.jpg` | https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=600&q=85 | 258 KB |
| 42 | `/migrated/services/pembuatan-website-aplikasi.jpg` | https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=600&q=85 | 114 KB |
| 43 | `/migrated/services/social-media-management.jpg` | https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=85 | 78 KB |
| 44 | `/migrated/team/arief-wibowo.jpg` | https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop | 329 KB |
| 45 | `/migrated/team/bagas-prasetyo.jpg` | https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop | 743 KB |
| 46 | `/migrated/team/nisa-amelia.jpg` | https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop | 252 KB |
| 47 | `/migrated/team/siti-maharani.jpg` | https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop | 493 KB |
| 48 | `/migrated/testimonials/anton-suryadi.png` | https://ui-avatars.com/api/?name=Anton+Suryadi&background=6A0DAD&color=fff&size=120 | 5 KB |
| 49 | `/migrated/testimonials/budi-santoso.png` | https://ui-avatars.com/api/?name=Budi+Santoso&background=4B0082&color=fff&size=120 | 5 KB |
| 50 | `/migrated/testimonials/dewi-rahayu.png` | https://ui-avatars.com/api/?name=Dewi+Rahayu&background=6A0DAD&color=fff&size=120 | 4 KB |
| 51 | `/migrated/testimonials/hendra-wijaya.png` | https://ui-avatars.com/api/?name=Hendra+Wijaya&background=1A73E8&color=fff&size=120 | 4 KB |
| 52 | `/migrated/testimonials/rina-kartika.png` | https://ui-avatars.com/api/?name=Rina+Kartika&background=4B0082&color=fff&size=120 | 4 KB |

Total: 52 file, 12,02 MB. Tidak ada referensi `cdn.sanity.io` (memang tidak pernah ada di sumber publik).

## 6. Aset yang tidak dapat dipulihkan

Dua gambar sumber sudah hilang dari upstream **dan** dari image optimizer situs publik (`/_next/image` mengembalikan 404), sehingga tidak ada salinan yang bisa diunduh:

| Gambar | Terdampak | Bukti |
|---|---|---|
| `photo-1554224154-26032fced8bd` (Unsplash) | `portfolio/invoice-automation-enterprise-demo` images ke-1,3,5,7 (4 referensi) | `images.unsplash.com` → 404; `/id`/`/en` halaman detail menampilkan tile rusak; `_next/image` → 404 |
| `photo-1558494949-ef010cbdcc51` (Unsplash) | `blog/arsitektur-microservices-modern` thumbnail | idem |

Keputusan: referensi asli dibiarkan apa adanya di data (tidak dihapus, tidak diganti teks/gambar rekaan) dan dicatat di sini. Butuh aset pengganti dari pemilik konten; keputusan ada di REY.

## 7. Konten Sanity yang tidak dipublikasikan (tidak diverifikasi)

`scratch/seed-sanity.js` memuat kandidat dokumen Sanity yang **tidak muncul di website publik** dan tidak dimigrasikan (brief: konten privat/draft tidak dapat dibuktikan dari publik, jangan dikarang):

| Tipe | Judul/Slug |
|---|---|
| service | Solusi E-Commerce Modern (`ecommerce-solusi`) |
| faq | Berapa lama waktu pengerjaan proyek? |
| testimonial | Budi Santoso — TechJaya Indonesia |
| project | Rebrand Portal Pembayaran V2 (`payment-portal-rebrand`) |
| caseStudy | Digital Ecosystem Strategy (`digital-ecosystem-2024`) |
| post | Masa Depan AI dalam Pengembangan Web (`ai-web-dev-future`) |

Jika dokumen-dokumen ini benar ada di dataset Sanity, kontennya hanya dapat diambil lewat export/login Sanity yang berada di luar lingkup tugas ini. Catat sebagai risiko/kekurangan untuk REY.

## 8. Catatan lintas kepemilikan (untuk REY & hellyeah)

Referensi gambar eksternal di luar `src/lib/data/**` **tidak diubah** karena di luar kepemilikan mike, tetapi salinan lokalnya sudah disiapkan:

| Lokasi | Isi | Tindakan untuk hellyeah |
|---|---|---|
| `src/app/[locale]/(website)/services/page.tsx` (`serviceGraphics`) dan `src/components/sections/ServicesSection.tsx` | 9 URL Unsplash per layanan | Ganti ke `serviceImages` dari `src/lib/data/service-images.ts` |
| `src/app/[locale]/(website)/services/[slug]/page.tsx` (hero detail) | 1 URL Unsplash | Ganti ke `serviceDetailHero` |
| `src/app/[locale]/(website)/blog/page.tsx`, `blog/[slug]/page.tsx` | fallback `ui-avatars.com` bila `authorAvatar` kosong | Tidak terpicu karena data sudah punya avatar lokal; bisa dibiarkan atau diganti fallback lokal |
| `src/lib/sanity-portfolio.ts` | `via.placeholder.com` pada fallback Sanity | Hilang bersama penghapusan Sanity |

**Kontrak modul baru** `src/lib/data/service-images.ts`:

- `serviceImages: Record<string, string>` — slug layanan → path lokal `/migrated/services/<slug>.jpg`.
- `serviceFallbackImage: string` — cadangan bila slug tidak dikenal.
- `serviceDetailHero: string` — hero halaman detail layanan.

`src/types/index.ts` tidak memiliki field `image` untuk `Service` dan berada di luar kepemilikan mike, sehingga aset layanan disimpan sebagai modul terpisah (sesuai README: konten tanpa consumer disimpan sebagai modul data + kontraknya didokumentasikan).

## 9. Validasi

| Pemeriksaan | Perintah/Metode | Hasil |
|---|---|---|
| Typecheck | `npx tsc --noEmit` | Exit 0, tanpa error |
| Lint data | `npx eslint src/lib/data` | Exit 0 |
| Slug unik | Skrip audit data | services 9/9, blog 6/6, portfolio 15/15, case study 10/10, tanpa duplikat |
| File aset lokal | Cek setiap path `/migrated/**` di data | 52/52 ada, 0 hilang |
| Field dua bahasa | Audit otomatis | 0 field kosong |
| Route publik | Crawl 96 URL (16 utama/list + 80 detail) di /id & /en | Semua HTTP 200 |
| Paritas konten | 80 halaman detail vs data lokal | 50 cocok; 30 "miss" = field `client` yang tidak dirender halaman detail (bukan selisih) |
| Bukti Sanity | Cari `cdn.sanity.io`/`sanity` di HTML + chunk JS | 0 konten CMS |
| Referensi eksternal tersisa | Cari `unsplash`/`ui-avatars` di `src/lib/data` | 5 referensi = 2 gambar rusak pada bagian 6 |

Baris dasar yang dicatat: build/lint menyeluruh repo belum dijalankan mike (di luar lingkup, dan `src/sanity/**` masih ada); verifikasi build final adalah tugas hellyeah setelah PR ini di-merge.

## 10. File yang diubah

| File | Perubahan |
|---|---|
| `src/lib/data/portfolio.ts` | 131 literal URL aset → path lokal `/migrated/portfolio/**` (4 referensi rusak dibiarkan) |
| `src/lib/data/blog.ts` | 11 literal → lokal (1 thumbnail rusak dibiarkan) |
| `src/lib/data/general.ts` | 9 literal avatar → lokal |
| `src/lib/data/service-images.ts` | Baru: kontrak aset layanan (belum dipakai komponen) |
| `public/migrated/**` | Baru: 52 file aset (12,02 MB) |
| `docs/sanity-migration/mike-report.md` | Laporan ini |

Tidak ada perubahan dependency, lockfile, route, loader, komponen, schema, atau konfigurasi.

## 11. Langkah berikutnya

1. REY mereview dan merge PR `mike` ke `main` lebih dulu (PR data ini tidak memutus Sanity; pemutusan dilakukan hellyeah).
2. Hellyeah menarik `main` terbaru, memakai kontrak `service-images.ts`, memindahkan consumer ke `src/lib/data/**`, menghapus Sanity/Studio/schema/konfigurasi/dependency, lalu verifikasi final dua bahasa.
3. REY memutuskan penanganan 2 gambar rusak (bagian 6) dan status 6 kandidat dokumen Sanity (bagian 7).
