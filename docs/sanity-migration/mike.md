# Task mike — migrasi konten dan aset

Bekerja pada branch `mike` yang melacak `origin/mike`, dalam checkout terpisah. Baca `README.md` di folder ini dan AGENTS.md terlebih dahulu. Jangan merge ke main atau deploy produksi.

## Pekerjaan

1. Inventarisasi website publik https://violetglobalindonesia.com melalui browser, sitemap, navigasi, pagination, dan seluruh halaman detail pada locale yang tersedia. Cakup home, about, services, blog, FAQ, testimonials, portfolio, case studies, contact, serta metadata yang terlihat. Tidak perlu dan jangan meminta login Sanity.
2. Buat tabel URL sumber, locale, koleksi, slug/ID, judul, aset, status migrasi, dan kekurangan di `docs/sanity-migration/mike-report.md`. Jika website/tool tidak dapat diakses, coba browser dan catat blocker; jangan menyatakan konten lengkap dari fallback saja.
3. Bandingkan dengan data lokal. Pindahkan konten publik yang belum ada, termasuk isi halaman detail, kedua bahasa yang tersedia, tanggal, caption/alt, gallery, dan metadata. Deduplicate menurut slug/ID; jangan menghapus data lama tanpa mencatat alasan.
4. Simpan gambar/aset Sanity yang dipakai ke `public/migrated/**`, gunakan path lokal, dan catat URL sumber. Jangan meninggalkan referensi Sanity asset object atau URL CDN Sanity. Jangan mengarang terjemahan atau konten yang tidak ditemukan; laporkan field yang kurang.
5. Edit hanya `src/lib/data/**`, `public/migrated/**`, dan laporan mike. Pertahankan ekspor serta bentuk data existing agar integrasi hellyeah dapat memakai data yang sama. Untuk konten yang consumer-nya belum ada, simpan modul baru dalam folder data dan dokumentasikan kontraknya di laporan.
6. Periksa kelengkapan inventaris, slug unik, link internal, file gambar, dan typecheck yang relevan. Laporkan hitungan per koleksi/locale dan URL yang tidak berhasil dipulihkan. Jangan mengubah dependency, lockfile, route, loader, atau komponen.
7. Commit/push ke branch mike dan buat PR ke main untuk REY. Jelaskan bahwa PR ini memasukkan data; pemutusan Sanity dilakukan oleh hellyeah setelah REY merge PR ini. Sertakan laporan migrasi dan bukti pemeriksaan.

Prioritaskan MCP graph untuk discovery. Jika menulis kode yang terkait Next.js, baca panduan relevan di `node_modules/next/dist/docs/` lebih dahulu.
