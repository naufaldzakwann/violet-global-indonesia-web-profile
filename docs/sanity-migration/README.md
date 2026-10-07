# Migrasi Sanity ke konten lokal

Pemilik review dan merge: REY. Target: website dapat dibangun dan dideploy di Vercel tanpa Sanity atau database eksternal. Konten disimpan sebagai TypeScript/JSON dan aset di repository, mudah diedit dengan AI.

## Pembagian dan urutan

- `origin/mike`: konten dan aset; brief di `mike.md`.
- `origin/hellyeah`: integrasi aplikasi dan pelepasan Sanity; brief di `hellyeah.md`.
- Baseline saat penugasan: `f3f86e9`, sama pada kedua branch.
- Gunakan checkout/worktree terpisah untuk setiap orang. Jangan bergantian checkout di direktori yang sama.
- Mike hanya mengubah `src/lib/data/**`, `public/migrated/**`, dan `docs/sanity-migration/mike-report.md`.
- Hellyeah memiliki kode aplikasi di luar `src/lib/data/**`, konfigurasi, dependency/lockfile, serta `docs/sanity-migration/hellyeah-report.md` dan `content-editing.md`. Jangan mengubah file milik mike.
- File brief ini adalah acuan bersama, bukan file kerja yang diedit kedua orang.
- Jika perlu melampaui batas file, catat kebutuhan untuk REY; jangan mengubah file milik rekan diam-diam.
- REY review dan merge PR mike ke main terlebih dahulu. Setelah itu hellyeah membawa main terbaru ke branch sendiri, memverifikasi konten sebenarnya, lalu mengajukan PR final untuk REY.
- Tidak ada merge ke main, force push, atau deploy produksi oleh pekerja.

## Kontrak konten

Pertahankan ekspor dan bentuk data yang sudah ada di `src/lib/data/{services,blog,general,portfolio,case-studies}.ts`. Tambahkan field bila diperlukan tanpa menghapus field yang digunakan UI. Pertahankan ID/slug stabil, pasangan bahasa Indonesia/Inggris, urutan konten, metadata, dan struktur detail. Slug unik per koleksi. Jika format lama tidak dapat menampung konten publik, mike mencatat usulan format dalam laporan dan hellyeah menyesuaikan consumer; jangan membuat asumsi kontrak secara terpisah.

Sumber utama: https://violetglobalindonesia.com beserta semua route publik, detail, dan locale yang tersedia. Repository merupakan sumber pelengkap. Tidak perlu login Sanity. Konten privat/draft/tidak dipublikasikan tidak dapat dibuktikan lengkap dari website publik; laporkan kekurangan, jangan mengarang.

## Syarat hasil akhir

Seluruh konten publik yang ditemukan sudah direkonsiliasi dengan file lokal, tidak ada duplikat, detail dan tautan lama tetap berfungsi, dan aset Sanity yang digunakan sudah disimpan lokal. Tidak ada request konten/gambar ke Sanity saat build maupun runtime. Build, typecheck, lint, dan pemeriksaan halaman dua bahasa dilaporkan beserta masalah baseline bila ada. PR menyertakan daftar perubahan dan bukti validasi; REY mengambil keputusan review dan merge.
