# Task hellyeah — konten lokal dan pelepasan Sanity

Bekerja pada branch `hellyeah` yang melacak `origin/hellyeah`, dalam checkout terpisah. Baca README dan AGENTS.md. Prioritaskan MCP graph untuk discovery; baca panduan Next.js relevan di `node_modules/next/dist/docs/` sebelum menulis kode.

## Pekerjaan

1. Audit seluruh jalur Sanity: loader `src/lib/sanity-data.ts`, `sanity-portfolio.ts`, `sanity-case-studies.ts`, consumer route/komponen, renderer rich text dan gambar, Studio, schema, konfigurasi, env, dan dependency. Beberapa loader menggabungkan Sanity dan fallback; jangan sekadar mematikan fetch lalu menganggap konten sudah lengkap.
2. Ganti semua consumer agar membaca ekspor lokal `src/lib/data/**`. Pertahankan perilaku dua bahasa, slug, detail, metadata/SEO, urutan, rich text, gambar, dan not-found. Bila mengganti nama loader, perbarui seluruh import. Jangan edit data atau aset milik mike.
3. Mike sedang memulihkan konten publik dari https://violetglobalindonesia.com tanpa login. Pakai kontrak data existing dan baca laporan mike saat tersedia. Pertahankan rendering untuk field tambahan yang diperlukan. Konten yang belum terpulihkan harus tercatat sebagai blocker, bukan diganti teks rekaan.
4. Setelah replacement siap, hapus client/query/image helper Sanity, Studio, schema, konfigurasi dan dependency yang tidak lagi digunakan; perbarui lockfile melalui package manager repository. Audit penggunaan `@portabletext/react` dahulu: pertahankan jika diperlukan untuk rich text lokal, atau ganti renderer dengan tetap mempertahankan konten. Bersihkan env/config/image allowlist Sanity yang tidak dibutuhkan.
5. Tulis `docs/sanity-migration/content-editing.md`: lokasi file konten, cara menambah entry/halaman, field bahasa, gambar lokal, slug dan validasi sebelum deploy Vercel. File repository adalah sumber konten; tidak perlu database eksternal.
6. Kerjakan integrasi awal dengan data existing, tetapi verifikasi final baru setelah REY review dan merge PR mike ke main. Bawa main terbaru ke branch hellyeah tanpa mengubah file milik mike. Jangan menyatakan migrasi final siap bila inventaris konten masih memiliki kekurangan yang belum disetujui REY.
7. Jalankan build, typecheck dan lint sesuai project; periksa route list/detail dua bahasa, metadata, internal link, duplikat, rich text, dan gambar. Buktikan build/runtime tidak mengambil konten atau aset dari Sanity, termasuk saat akses Sanity diblokir. Catat kegagalan baseline secara terpisah.
8. Tulis `docs/sanity-migration/hellyeah-report.md` berisi perubahan, hasil pemeriksaan, batasan, dan prasyarat deployment. Commit/push serta buat PR ke main untuk REY setelah konten mike terintegrasi dan verifikasi final selesai. Jangan merge atau deploy produksi.

Kepemilikan: kode aplikasi selain `src/lib/data/**`, konfigurasi, dependency/lockfile, laporan hellyeah, dan panduan content-editing. Dilarang mengubah `public/migrated/**` dan laporan mike. Jika ada kebutuhan lintas kepemilikan, catat untuk REY dan tunggu koordinasi.
