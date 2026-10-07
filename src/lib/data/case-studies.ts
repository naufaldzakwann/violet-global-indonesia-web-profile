import type { RichText } from "@/types";

export type CaseStudyPageItem = {
  title: string;
  titleEn: string;
  intro: string;
  introEn: string;
  bullets: string[];
  bulletsEn: string[];
  note: string;
  noteEn: string;
  /** Rich text opsional yang menggantikan intro/note bila diisi. */
  explanation?: RichText;
  explanationEn?: RichText;
  /** Path gambar lokal opsional untuk halaman ini. */
  image?: string;
  /** Tandai halaman lanjutan agar judul tidak diulang di daftar isi. */
  isContinuation?: boolean;
};

export type CaseStudyItem = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  year: string;
  yearEn: string;
  month: string;
  monthEn: string;
  pageCount: number;
  summary: string;
  summaryEn: string;
  cardSummary?: string;
  cardSummaryEn?: string;
  spineTone: string;
  accentTone: string;
  insight: string;
  insightEn: string;
  pages: CaseStudyPageItem[];
};

export const caseStudies: CaseStudyItem[] = [
  {
    id: "case-001",
    slug: "retail-behavior-map",
    title: "Retail Behavior Map",
    titleEn: "Retail Behavior Map",
    category: "Riset Pengalaman Pelanggan",
    categoryEn: "Customer Experience Research",
    year: "2026",
    yearEn: "2026",
    month: "Maret",
    monthEn: "March",
    pageCount: 17,
    summary:
      "Riset perilaku pelanggan omnichannel untuk memahami pola eksplorasi produk, keputusan pembelian, dan titik friksi utama pada retail premium.",
    summaryEn:
      "An omnichannel customer behavior study focused on product discovery patterns, purchase decisions, and major friction points across premium retail experiences.",
    spineTone: "linear-gradient(180deg,#121212 0%,#3a2c24 100%)",
    accentTone: "#c9a27f",
    insight:
      "Temuan utama menunjukkan pelanggan membutuhkan jembatan yang lebih halus antara inspirasi visual dan tindakan membeli.",
    insightEn:
      "The strongest insight showed customers need a smoother bridge between visual inspiration and purchasing actions.",
    pages: [
      {
        title: "Research Scope",
        titleEn: "Research Scope",
        intro:
          "Studi ini dilakukan untuk membaca pola perilaku pelanggan pada pengalaman retail yang menggabungkan toko fisik, katalog digital, dan jalur checkout online.",
        introEn:
          "This study was conducted to read customer behavior patterns across a retail experience combining physical stores, digital catalogs, and online checkout flows.",
        bullets: [
          "Mengamati 24 sesi belanja pada audience urban premium.",
          "Mewawancarai 10 pelanggan yang membeli di dua kanal berbeda.",
          "Menganalisis jalur eksplorasi dari inspirasi hingga checkout.",
        ],
        bulletsEn: [
          "Observed 24 shopping sessions across premium urban audiences.",
          "Interviewed 10 customers who purchased through two different channels.",
          "Analyzed the path from inspiration to checkout.",
        ],
        note:
          "Pola belanja paling kuat muncul ketika konten visual, konteks produk, dan bukti kualitas hadir dalam satu ritme yang cepat dibaca.",
        noteEn:
          "The strongest shopping patterns emerged when visual content, product context, and quality proof appeared in one fast-readable rhythm.",
      },
      {
        title: "Behavior Signals",
        titleEn: "Behavior Signals",
        intro:
          "Mayoritas user tidak langsung mencari harga. Mereka memulai dari citra ruang, detail material, dan gambaran penggunaan produk dalam konteks nyata.",
        introEn:
          "Most users did not begin with price. They started from room imagery, material details, and contextual product usage cues.",
        bullets: [
          "User menilai kredibilitas brand dari kualitas visual pertama.",
          "Foto detail material berperan besar pada keputusan lanjut scroll.",
          "Produk dengan narasi penggunaan lebih cepat masuk shortlist.",
        ],
        bulletsEn: [
          "Users judged brand credibility from the first visual impression.",
          "Material detail shots strongly influenced continued scrolling.",
          "Products with clearer usage narratives entered shortlists faster.",
        ],
        note:
          "Perjalanan awal pelanggan lebih dekat ke perilaku editorial daripada perilaku katalog murni.",
        noteEn:
          "The early customer journey behaved more like editorial reading than pure catalog browsing.",
      },
      {
        title: "Friction Points",
        titleEn: "Friction Points",
        intro:
          "Titik friksi terbesar muncul saat user ingin berpindah dari eksplorasi visual ke evaluasi teknis seperti ukuran, ketersediaan, dan opsi custom.",
        introEn:
          "The biggest friction appeared when users moved from visual exploration to technical evaluation such as sizing, availability, and custom options.",
        bullets: [
          "Informasi spesifikasi terlalu jauh dari hero visual utama.",
          "Tidak ada sinyal stok yang cukup cepat dibaca.",
          "Form konsultasi custom muncul terlalu akhir dalam alur.",
        ],
        bulletsEn: [
          "Specification details sat too far from the main visual hero.",
          "Stock signals were not readable fast enough.",
          "The custom consultation form appeared too late in the journey.",
        ],
        note:
          "Transisi dari inspirasi ke keputusan perlu dibuat lebih dekat agar user tidak kehilangan momentum.",
        noteEn:
          "The transition from inspiration to decision needs to be tighter so users do not lose momentum.",
      },
      {
        title: "Strategic Direction",
        titleEn: "Strategic Direction",
        intro:
          "Arah solusi yang direkomendasikan adalah pengalaman commerce editorial dengan modul bukti kualitas, detail teknis ringkas, dan CTA konsultasi yang muncul lebih dini.",
        introEn:
          "The recommended direction is an editorial commerce experience with quality-proof modules, concise technical details, and earlier consultation prompts.",
        bullets: [
          "Satukan visual hero dan ringkasan value produk pada fold pertama.",
          "Percepat akses ke material, dimensi, dan opsi personalisasi.",
          "Gunakan blok testimonial dan project context sebagai trust layer.",
        ],
        bulletsEn: [
          "Unify the visual hero and core product value summary in the first fold.",
          "Shorten access to materials, dimensions, and customization options.",
          "Use testimonials and project context as a trust layer.",
        ],
        note:
          "Solusi terbaik bukan menambah informasi, tetapi menata urutan informasi sesuai cara user memutuskan.",
        noteEn:
          "The best solution is not adding more information, but sequencing it around how users decide.",
      },
    ],
  },
  {
    id: "case-002",
    slug: "b2b-dashboard-priorities",
    title: "B2B Dashboard Priorities",
    titleEn: "B2B Dashboard Priorities",
    category: "Riset Produk Digital",
    categoryEn: "Digital Product Research",
    year: "2026",
    yearEn: "2026",
    month: "Januari",
    monthEn: "January",
    pageCount: 24,
    summary:
      "Audit kebutuhan stakeholder dan pemetaan prioritas KPI untuk merancang command center yang lebih cepat dibaca oleh tim manajemen.",
    summaryEn:
      "A stakeholder-needs audit and KPI priority mapping to shape a command center that can be read faster by leadership teams.",
    spineTone: "linear-gradient(180deg,#101828 0%,#1d3557 100%)",
    accentTone: "#7fb3ff",
    insight:
      "Manajemen tidak membutuhkan lebih banyak chart, mereka membutuhkan urutan prioritas yang lebih tegas.",
    insightEn:
      "Leadership did not need more charts, they needed a stronger priority order.",
    pages: [
      {
        title: "Stakeholder Mapping",
        titleEn: "Stakeholder Mapping",
        intro:
          "Riset dimulai dengan memetakan kebutuhan direksi, kepala wilayah, dan tim operasional untuk memahami definisi dashboard yang benar-benar berguna.",
        introEn:
          "The research started by mapping the needs of directors, regional leads, and operations teams to define what a genuinely useful dashboard should be.",
        bullets: [
          "Direksi fokus pada anomali dan keputusan cepat.",
          "Regional lead membutuhkan konteks performa wilayah.",
          "Operasional membutuhkan detail tindakan, bukan sekadar angka.",
        ],
        bulletsEn: [
          "Directors focused on anomalies and fast decisions.",
          "Regional leads needed regional performance context.",
          "Operations teams needed actionable detail, not just numbers.",
        ],
        note:
          "Satu dashboard tidak bisa menyenangkan semua pihak dengan kedalaman informasi yang sama.",
        noteEn:
          "One dashboard cannot satisfy every audience with the same depth of information.",
      },
      {
        title: "KPI Hierarchy",
        titleEn: "KPI Hierarchy",
        intro:
          "Susunan KPI lama terlalu datar. Semua angka terasa penting sehingga tidak ada satu sinyal pun yang benar-benar menonjol saat performa menurun.",
        introEn:
          "The previous KPI arrangement was too flat. Everything looked important, so no signal truly stood out when performance dropped.",
        bullets: [
          "KPI utama perlu dibatasi ke empat sinyal inti.",
          "Status warna harus hanya dipakai untuk kondisi yang benar-benar butuh respon.",
          "Chart pendukung sebaiknya muncul setelah ringkasan keputusan.",
        ],
        bulletsEn: [
          "Primary KPIs should be limited to four core signals.",
          "Color status should only be used for conditions that truly need response.",
          "Supporting charts should appear after the decision summary.",
        ],
        note:
          "Prioritas visual menjadi faktor terbesar dalam kecepatan membaca dashboard.",
        noteEn:
          "Visual prioritization became the biggest factor in dashboard reading speed.",
      },
      {
        title: "Decision Flow",
        titleEn: "Decision Flow",
        intro:
          "Setelah melihat KPI, user manajemen ingin langsung tahu wilayah mana yang paling membutuhkan perhatian, lalu alasan perubahan performa tersebut.",
        introEn:
          "After seeing KPIs, leadership users wanted to immediately know which region needed the most attention and why performance shifted.",
        bullets: [
          "Urutan terbaik: KPI, region flag, penyebab, lalu rekomendasi tindakan.",
          "Terlalu banyak tab memperlambat pembacaan awal.",
          "Insight naratif singkat lebih efektif daripada chart tambahan.",
        ],
        bulletsEn: [
          "The best order: KPI, region flag, cause, then action recommendation.",
          "Too many tabs slowed the first reading pass.",
          "Short narrative insights were more effective than extra charts.",
        ],
        note:
          "Dashboard harus terasa seperti alat briefing, bukan gudang laporan.",
        noteEn:
          "The dashboard should feel like a briefing tool, not a report warehouse.",
      },
      {
        title: "Design Recommendation",
        titleEn: "Design Recommendation",
        intro:
          "Rekomendasi akhir adalah command center dengan struktur modular yang tegas, insight layer singkat, dan drilldown yang hanya muncul saat benar-benar dibutuhkan.",
        introEn:
          "The final recommendation is a command center with a strict modular structure, a concise insight layer, and drilldowns that appear only when needed.",
        bullets: [
          "Gunakan header keputusan di bagian teratas.",
          "Pertahankan dua level kedalaman maksimum pada halaman utama.",
          "Tempatkan insight otomatis berdampingan dengan anomali utama.",
        ],
        bulletsEn: [
          "Use a decision header at the top.",
          "Keep the main page to a maximum of two depth levels.",
          "Place automated insight text beside major anomalies.",
        ],
        note:
          "Sederhana di permukaan, dalam saat diperlukan, menjadi prinsip inti hasil riset ini.",
        noteEn:
          "Simple on the surface and deep when needed became the core principle from this study.",
      },
    ],
  },
  {
    id: "case-003",
    slug: "brand-perception-study",
    title: "Brand Perception Study",
    titleEn: "Brand Perception Study",
    category: "Riset Brand",
    categoryEn: "Brand Research",
    year: "2025",
    yearEn: "2025",
    month: "November",
    monthEn: "November",
    pageCount: 29,
    summary:
      "Studi persepsi brand untuk memetakan kesan visual, asosiasi emosional, dan peluang reposisi identitas di segmen urban lifestyle.",
    summaryEn:
      "A brand perception study mapping visual impressions, emotional associations, and repositioning opportunities in the urban lifestyle segment.",
    spineTone: "linear-gradient(180deg,#1d1816 0%,#5b3a2e 100%)",
    accentTone: "#e1a988",
    insight:
      "Brand lama terlihat akrab, tetapi belum cukup aspiratif untuk audience urban yang lebih muda.",
    insightEn:
      "The legacy brand felt familiar, but not aspirational enough for younger urban audiences.",
    pages: [
      {
        title: "Perception Audit",
        titleEn: "Perception Audit",
        intro:
          "Audit persepsi dilakukan melalui wawancara mendalam, benchmark visual, dan pembacaan reaksi spontan terhadap aset brand yang sudah ada.",
        introEn:
          "The perception audit used in-depth interviews, visual benchmarks, and spontaneous reaction testing against current brand assets.",
        bullets: [
          "Brand dianggap hangat tetapi kurang berkarakter.",
          "Logo lama dinilai aman namun tidak memorable.",
          "Tone visual belum membedakan brand dari kompetitor utama.",
        ],
        bulletsEn: [
          "The brand felt warm but lacked character.",
          "The old logo was seen as safe but not memorable.",
          "The visual tone failed to separate the brand from key competitors.",
        ],
        note:
          "Masalah utamanya bukan dislike, tetapi lemahnya diferensiasi emosional.",
        noteEn:
          "The key problem was not dislike, but weak emotional differentiation.",
      },
      {
        title: "Audience Shift",
        titleEn: "Audience Shift",
        intro:
          "Target audience bergerak ke kelompok urban yang lebih sadar visual, lebih mobile, dan lebih sensitif terhadap presentasi brand di media digital.",
        introEn:
          "The audience shifted toward urban consumers who are more visually aware, more mobile, and more sensitive to brand presentation in digital media.",
        bullets: [
          "Audience baru mencari identitas yang terasa refined namun dekat.",
          "Konten brand harus tetap mudah dipotong menjadi format sosial.",
          "Konsistensi visual lebih penting daripada elemen dekoratif yang berlebihan.",
        ],
        bulletsEn: [
          "The new audience wanted an identity that felt refined yet approachable.",
          "Brand content needed to adapt easily into social formats.",
          "Visual consistency mattered more than excessive decorative elements.",
        ],
        note:
          "Reposisi berhasil bila brand terasa lebih dewasa tanpa kehilangan kedekatan sebelumnya.",
        noteEn:
          "Repositioning succeeds when the brand feels more mature without losing its prior warmth.",
      },
      {
        title: "Visual Opportunity",
        titleEn: "Visual Opportunity",
        intro:
          "Peluang terbesar muncul pada penciptaan sistem visual yang lebih editorial, dengan kombinasi tipografi kuat, warna dasar tenang, dan aksen yang terkontrol.",
        introEn:
          "The biggest opportunity was building a more editorial visual system with strong typography, calm base tones, and controlled accents.",
        bullets: [
          "Gunakan hierarchy yang lebih berani pada headline.",
          "Kurangi noise visual pada materi promosi.",
          "Buat sistem fotografi yang lebih konsisten dan terkurasi.",
        ],
        bulletsEn: [
          "Use a stronger hierarchy in headlines.",
          "Reduce visual noise across promotional assets.",
          "Create a more consistent and curated photography system.",
        ],
        note:
          "Persepsi premium lahir dari disiplin sistem, bukan dari ornamen yang berlebihan.",
        noteEn:
          "Premium perception comes from system discipline, not excessive ornament.",
      },
      {
        title: "Repositioning Frame",
        titleEn: "Repositioning Frame",
        intro:
          "Rekomendasi reposisi menempatkan brand sebagai companion urban yang lebih dewasa, lebih tenang, dan lebih punya sudut pandang visual.",
        introEn:
          "The repositioning frame places the brand as a more mature, calmer urban companion with a clearer visual point of view.",
        bullets: [
          "Pertahankan elemen kehangatan, tetapi kurangi kesan generik.",
          "Gunakan sistem warna yang lebih terfokus.",
          "Bangun narasi yang konsisten dari packaging hingga digital campaign.",
        ],
        bulletsEn: [
          "Keep the warmth, but reduce the generic feel.",
          "Use a more focused color system.",
          "Build one narrative from packaging to digital campaigns.",
        ],
        note:
          "Arah ini memberi ruang bagi identitas baru yang kuat sekaligus realistis untuk diimplementasikan.",
        noteEn:
          "This direction leaves room for a stronger identity that is still realistic to implement.",
      },
    ],
  },
  {
    id: "case-004",
    slug: "finance-automation-review",
    title: "Finance Automation Review",
    titleEn: "Finance Automation Review",
    category: "Riset Operasional",
    categoryEn: "Operational Research",
    year: "2025",
    yearEn: "2025",
    month: "Agustus",
    monthEn: "August",
    pageCount: 16,
    summary:
      "Penelitian alur operasional invoice dan approval untuk menemukan bottleneck utama sebelum fase automasi sistem dimulai.",
    summaryEn:
      "An operational review of invoice and approval flows to uncover the main bottlenecks before the automation phase begins.",
    spineTone: "linear-gradient(180deg,#13211b 0%,#285943 100%)",
    accentTone: "#92d2b0",
    insight:
      "Keterlambatan terbesar berasal dari perpindahan kerja antar tim, bukan dari sistem inti yang dipakai.",
    insightEn:
      "The biggest delays came from cross-team handoffs, not from the core system itself.",
    pages: [
      {
        title: "Flow Mapping",
        titleEn: "Flow Mapping",
        intro:
          "Riset ini memetakan perjalanan invoice dari penerimaan awal, validasi, approval, hingga posting akhir untuk melihat titik hambatan yang paling sering berulang.",
        introEn:
          "This study mapped the invoice journey from intake to validation, approval, and final posting to locate repeated bottlenecks.",
        bullets: [
          "Ada lebih dari tujuh perpindahan kerja untuk satu invoice standar.",
          "Status dokumen sering hilang di tengah proses.",
          "Validasi antar PO dan invoice dilakukan manual.",
        ],
        bulletsEn: [
          "A standard invoice passed through more than seven handoffs.",
          "Document status was often lost mid-process.",
          "PO-to-invoice validation was handled manually.",
        ],
        note:
          "Proses tampak rapi di atas kertas, tetapi lambat dalam kenyataan karena terlalu banyak perpindahan.",
        noteEn:
          "The process looked neat on paper, but slow in reality because of excessive handoffs.",
      },
      {
        title: "Approval Friction",
        titleEn: "Approval Friction",
        intro:
          "Approval menjadi titik paling sensitif karena aturan berbeda diterapkan antar jenis biaya dan setiap tim mengandalkan jalur komunikasi sendiri.",
        introEn:
          "Approval became the most sensitive point because each cost type followed different rules and each team used its own communication channel.",
        bullets: [
          "Tidak ada SLA yang benar-benar terlihat oleh semua pihak.",
          "Escalation sering terjadi terlambat.",
          "Dokumen pendukung tersebar di email dan chat.",
        ],
        bulletsEn: [
          "There was no visible SLA shared across teams.",
          "Escalation often happened too late.",
          "Supporting documents were scattered across email and chat.",
        ],
        note:
          "Masalah approval lebih dekat ke masalah koordinasi daripada sekadar masalah tooling.",
        noteEn:
          "The approval problem was closer to a coordination problem than a tooling problem.",
      },
      {
        title: "Automation Readiness",
        titleEn: "Automation Readiness",
        intro:
          "Tim sebenarnya siap diotomasi, tetapi automasi hanya akan efektif bila exception handling dan rule ownership ditentukan sejak awal.",
        introEn:
          "The team was ready for automation, but automation would only work if exception handling and rule ownership were defined early.",
        bullets: [
          "Invoice standar cocok untuk auto-routing.",
          "Kasus exception harus dipisah jelas dari alur normal.",
          "Audit trail wajib menjadi bagian inti, bukan fitur tambahan.",
        ],
        bulletsEn: [
          "Standard invoices were suitable for auto-routing.",
          "Exception cases needed clear separation from the normal flow.",
          "Audit trails had to be a core requirement, not an extra feature.",
        ],
        note:
          "Automasi paling berhasil pada proses yang jelas, bukan pada proses yang belum selesai didefinisikan.",
        noteEn:
          "Automation works best on processes that are clear, not on processes that are still undefined.",
      },
      {
        title: "Implementation Direction",
        titleEn: "Implementation Direction",
        intro:
          "Arah implementasi merekomendasikan workflow engine yang sederhana, status yang selalu terlihat, dan dashboard exception untuk tim finance.",
        introEn:
          "The implementation direction recommends a simple workflow engine, always-visible status states, and an exception dashboard for finance teams.",
        bullets: [
          "Buat intake tunggal untuk semua invoice vendor.",
          "Gunakan status state yang konsisten di semua tahap.",
          "Pisahkan dashboard backlog, approval, dan exception.",
        ],
        bulletsEn: [
          "Create a single intake layer for all vendor invoices.",
          "Use one consistent status state model across every stage.",
          "Separate backlog, approval, and exception dashboards.",
        ],
        note:
          "Arah ini mengurangi beban koordinasi sekaligus menyiapkan fondasi sistem yang mudah diskalakan.",
        noteEn:
          "This direction reduces coordination load while preparing a scalable system foundation.",
      },
    ],
  },
  {
    id: "case-005",
    slug: "security-readiness-index",
    title: "Security Readiness Index",
    titleEn: "Security Readiness Index",
    category: "Riset Keamanan",
    categoryEn: "Security Research",
    year: "2026",
    yearEn: "2026",
    month: "Februari",
    monthEn: "February",
    pageCount: 27,
    summary:
      "Kerangka riset untuk menilai kesiapan keamanan digital pada organisasi yang sedang menyiapkan transformasi layanan publik.",
    summaryEn:
      "A research framework assessing digital security readiness for organizations preparing large-scale public service transformation.",
    spineTone: "linear-gradient(180deg,#0f172a 0%,#243b63 100%)",
    accentTone: "#98b6ea",
    insight:
      "Kesiapan keamanan paling lemah justru muncul pada tata kelola akses dan konsistensi prosedur lintas tim.",
    insightEn:
      "The weakest area of security readiness appeared in access governance and procedural consistency across teams.",
    pages: [
      {
        title: "Assessment Frame",
        titleEn: "Assessment Frame",
        intro:
          "Riset ini membangun indeks kesiapan berbasis empat lapisan: akses, infrastruktur, monitoring, dan respon insiden.",
        introEn:
          "This study built a readiness index across four layers: access, infrastructure, monitoring, and incident response.",
        bullets: [
          "Setiap lapisan diukur melalui maturity level yang jelas.",
          "Penilaian memadukan wawancara, audit artefak, dan observasi proses.",
          "Tujuannya adalah melihat celah strategis, bukan sekadar checklist teknis.",
        ],
        bulletsEn: [
          "Each layer was measured through a clear maturity model.",
          "The review combined interviews, artifact audits, and process observation.",
          "The goal was to expose strategic gaps, not just complete a technical checklist.",
        ],
        note:
          "Pendekatan ini dipilih agar organisasi mendapatkan gambaran kesiapan yang lebih utuh.",
        noteEn:
          "This approach was chosen to give the organization a more complete readiness picture.",
      },
      {
        title: "Critical Findings",
        titleEn: "Critical Findings",
        intro:
          "Temuan paling kritis muncul pada akses bersama, rotasi kredensial yang tidak konsisten, dan monitoring yang belum cukup dekat ke potensi insiden nyata.",
        introEn:
          "The most critical findings appeared in shared access, inconsistent credential rotation, and monitoring that was too far removed from real incident risk.",
        bullets: [
          "Hak akses lama masih bertahan setelah perubahan peran.",
          "Beberapa sistem penting tidak memiliki logging yang memadai.",
          "Pemilik keputusan respon insiden belum terdefinisi jelas.",
        ],
        bulletsEn: [
          "Legacy permissions remained after role changes.",
          "Several critical systems lacked sufficient logging.",
          "Incident-response ownership was not clearly defined.",
        ],
        note:
          "Kelemahan paling berisiko justru berada pada area tata kelola sehari-hari.",
        noteEn:
          "The highest-risk weaknesses lived in everyday governance practices.",
      },
      {
        title: "Organizational Readiness",
        titleEn: "Organizational Readiness",
        intro:
          "Secara umum, tim memiliki niat dan awareness yang cukup tinggi, namun eksekusinya belum konsisten antar unit dan belum dibingkai dalam prosedur yang seragam.",
        introEn:
          "Overall, teams showed high intent and awareness, but execution was inconsistent across units and not framed by uniform procedures.",
        bullets: [
          "Awareness tinggi belum otomatis menghasilkan disiplin proses.",
          "Pelatihan perlu dibarengi kontrol operasional yang nyata.",
          "Security champion internal berpotensi mempercepat adopsi standar.",
        ],
        bulletsEn: [
          "Strong awareness did not automatically produce process discipline.",
          "Training must be paired with real operational controls.",
          "Internal security champions could accelerate standard adoption.",
        ],
        note:
          "Kesiapan keamanan bukan hanya persoalan sistem, tetapi juga konsistensi organisasi.",
        noteEn:
          "Security readiness is not only about systems, but organizational consistency.",
      },
      {
        title: "Recommended Roadmap",
        titleEn: "Recommended Roadmap",
        intro:
          "Roadmap rekomendasi memprioritaskan hardening akses, baseline logging minimum, dan pembentukan protokol respon insiden yang lebih operasional.",
        introEn:
          "The recommended roadmap prioritizes access hardening, minimum logging baselines, and a more operational incident-response protocol.",
        bullets: [
          "Mulai dari quick wins pada akses dan account hygiene.",
          "Susun baseline monitoring yang sama untuk seluruh layanan inti.",
          "Tetapkan struktur respon dengan pemilik keputusan yang jelas.",
        ],
        bulletsEn: [
          "Start with quick wins in access control and account hygiene.",
          "Set one shared monitoring baseline for core services.",
          "Define a response structure with clear decision owners.",
        ],
        note:
          "Roadmap ini dirancang agar organisasi dapat bergerak cepat tanpa kehilangan arah prioritas.",
        noteEn:
          "This roadmap was designed to help the organization move quickly without losing priority direction.",
      },
    ],
  },
  {
    id: "case-006",
    slug: "service-blueprint-review",
    title: "Service Blueprint Review",
    titleEn: "Service Blueprint Review",
    category: "Riset Layanan",
    categoryEn: "Service Research",
    year: "2026",
    yearEn: "2026",
    month: "April",
    monthEn: "April",
    pageCount: 19,
    summary:
      "Kajian service blueprint untuk membaca hubungan frontstage, backstage, dan titik keterlambatan yang memengaruhi pengalaman pengguna akhir.",
    summaryEn:
      "A service blueprint review examining frontstage, backstage, and delay points that shape the end-user experience.",
    spineTone: "linear-gradient(180deg,#1b1712 0%,#6a4b34 100%)",
    accentTone: "#d7ae7d",
    insight:
      "Masalah terbesar muncul saat proses internal tidak terlihat, tetapi dampaknya langsung terasa pada pelanggan.",
    insightEn:
      "The largest issue appeared when internal processes stayed invisible while their impact was felt directly by customers.",
    pages: [
      {
        title: "Blueprint Mapping",
        titleEn: "Blueprint Mapping",
        intro:
          "Riset ini memetakan seluruh perjalanan layanan dari permintaan awal hingga penyelesaian akhir untuk melihat hubungan antar lapisan proses.",
        introEn:
          "This study mapped the full service journey from initial request to completion to reveal the relation across process layers.",
        bullets: [
          "Frontstage terlihat lancar, backstage masih fragmentaris.",
          "Banyak dependensi terjadi di titik approval internal.",
          "Customer support menjadi penghubung utama saat sistem tidak sinkron.",
        ],
        bulletsEn: [
          "The frontstage looked smooth while the backstage remained fragmented.",
          "Many dependencies clustered around internal approvals.",
          "Customer support became the key bridge whenever systems fell out of sync.",
        ],
        note:
          "Blueprint membantu menunjukkan bahwa kualitas layanan bergantung pada koordinasi lintas lapisan, bukan hanya antarmuka depan.",
        noteEn:
          "The blueprint showed that service quality depended on cross-layer coordination, not only on the front interface.",
      },
      {
        title: "Operational Gaps",
        titleEn: "Operational Gaps",
        intro:
          "Kesenjangan operasional paling terasa saat handoff antar unit tidak punya SLA yang dipahami bersama dan tidak ada visibilitas status yang konsisten.",
        introEn:
          "Operational gaps became most visible when handoffs lacked a shared SLA and no consistent status visibility existed.",
        bullets: [
          "Status permintaan berubah tanpa notifikasi yang memadai.",
          "Tim depan tidak selalu mendapat konteks penuh saat eskalasi.",
          "Proses manual sering menambah jeda yang tidak terlihat pengguna.",
        ],
        bulletsEn: [
          "Request statuses changed without sufficient notification.",
          "Frontline teams did not always receive full context during escalation.",
          "Manual steps frequently added delays unseen by users.",
        ],
        note:
          "Rantai layanan yang baik membutuhkan visibilitas, bukan sekadar kecepatan di satu titik.",
        noteEn:
          "A good service chain requires visibility, not just speed at one point.",
      },
      {
        title: "Priority Fixes",
        titleEn: "Priority Fixes",
        intro:
          "Arah perbaikan memprioritaskan sinkronisasi status, penyederhanaan handoff, dan satu titik referensi untuk tim depan dan tim operasional.",
        introEn:
          "The improvement direction prioritizes status synchronization, simplified handoffs, and a single reference point for frontline and ops teams.",
        bullets: [
          "Buat status model yang seragam di seluruh journey.",
          "Kurangi titik serah proses yang tidak memberi nilai tambah.",
          "Bangun dashboard internal yang fokus pada exception.",
        ],
        bulletsEn: [
          "Create one shared status model across the journey.",
          "Reduce handoff points that do not add value.",
          "Build an internal dashboard focused on exceptions.",
        ],
        note:
          "Rekomendasi utamanya adalah merapikan alur, bukan menambah lapisan proses baru.",
        noteEn:
          "The core recommendation is to tidy the flow, not add more layers.",
      },
      {
        title: "Delivery Outlook",
        titleEn: "Delivery Outlook",
        intro:
          "Implementasi paling efektif adalah dimulai dari journey yang paling sering terjadi sebelum memperluas perbaikan ke layanan yang lebih kompleks.",
        introEn:
          "The most effective implementation starts with the highest-frequency journey before extending changes to more complex services.",
        bullets: [
          "Mulai dari jalur layanan dengan volume tertinggi.",
          "Ukur keberhasilan dari stabilitas SLA dan penurunan eskalasi.",
          "Gunakan insight operasional untuk iterasi tahap berikutnya.",
        ],
        bulletsEn: [
          "Start from the highest-volume service path.",
          "Measure success through SLA stability and lower escalations.",
          "Use operational insights for the next iteration.",
        ],
        note:
          "Perubahan bertahap memberi peluang lebih besar untuk membangun ritme layanan yang stabil.",
        noteEn:
          "Incremental change gives a better chance of building a stable service rhythm.",
      },
    ],
  },
  {
    id: "case-007",
    slug: "market-entry-observation",
    title: "Market Entry Observation",
    titleEn: "Market Entry Observation",
    category: "Riset Pasar",
    categoryEn: "Market Research",
    year: "2025",
    yearEn: "2025",
    month: "Desember",
    monthEn: "December",
    pageCount: 22,
    summary:
      "Observasi perilaku pasar awal untuk membaca celah kompetitif, ekspektasi audience, dan narasi yang paling mudah masuk ke kategori baru.",
    summaryEn:
      "An early market observation study exploring competitive gaps, audience expectations, and narratives that enter a new category most effectively.",
    spineTone: "linear-gradient(180deg,#171717 0%,#4b4b4b 100%)",
    accentTone: "#d7d0c2",
    insight:
      "Masuk ke pasar baru lebih mudah ketika brand hadir dengan sudut pandang yang spesifik, bukan sekadar harga atau fitur.",
    insightEn:
      "Entering a new market becomes easier when the brand brings a specific point of view, not just price or feature lists.",
    pages: [
      {
        title: "Category Read",
        titleEn: "Category Read",
        intro:
          "Tahap awal riset memotret kategori dan pemain utama untuk melihat pola komunikasi yang paling dominan dan area yang mulai jenuh.",
        introEn:
          "The first phase captured the category and leading players to understand dominant communication patterns and saturated areas.",
        bullets: [
          "Mayoritas pemain berbicara dengan sudut manfaat yang serupa.",
          "Visual kategori cenderung aman dan tidak punya karakter kuat.",
          "Audience bereaksi baik pada narasi yang lebih manusiawi.",
        ],
        bulletsEn: [
          "Most players spoke from very similar benefit angles.",
          "The category visual language felt safe and lacked strong character.",
          "Audiences responded well to more human-centered narratives.",
        ],
        note:
          "Celah masuk paling besar justru ada pada cara bercerita, bukan pada jumlah fitur yang dibawa.",
        noteEn:
          "The strongest opening was in storytelling, not in feature volume.",
      },
      {
        title: "Audience Signals",
        titleEn: "Audience Signals",
        intro:
          "Calon pengguna baru lebih mudah tertarik pada komunikasi yang memberi konteks penggunaan nyata daripada klaim performa yang abstrak.",
        introEn:
          "Prospective users were drawn more easily to communication grounded in real usage context than abstract performance claims.",
        bullets: [
          "Use case konkret terasa lebih meyakinkan.",
          "Bahasa yang terlalu teknis menurunkan minat eksplorasi awal.",
          "Brand baru butuh sinyal kredibilitas yang cepat dikenali.",
        ],
        bulletsEn: [
          "Concrete use cases felt more convincing.",
          "Overly technical language lowered early exploration interest.",
          "New brands needed credibility cues that were quickly recognizable.",
        ],
        note:
          "Penerimaan awal audience ditentukan oleh relevansi narasi, bukan hanya diferensiasi rasional.",
        noteEn:
          "Early audience acceptance was shaped by narrative relevance, not only rational differentiation.",
      },
      {
        title: "Entry Narrative",
        titleEn: "Entry Narrative",
        intro:
          "Narasi yang paling potensial adalah posisi brand sebagai panduan yang membantu audience bergerak lebih yakin di kategori yang terasa kompleks.",
        introEn:
          "The strongest narrative positioned the brand as a guide helping audiences move confidently through a complex category.",
        bullets: [
          "Tonality perlu dekat namun tetap punya otoritas.",
          "Visual harus memberi rasa percaya, bukan sekadar daya tarik.",
          "Headline perlu langsung menunjukkan sudut pandang brand.",
        ],
        bulletsEn: [
          "The tone needed to feel close yet authoritative.",
          "Visuals had to create trust, not only attraction.",
          "Headlines needed to reveal the brand point of view immediately.",
        ],
        note:
          "Brand entry yang kuat biasanya lahir dari posisi yang jelas dan mudah diingat sejak interaksi pertama.",
        noteEn:
          "Strong market entry usually comes from a position that is clear and memorable from the first interaction.",
      },
      {
        title: "Launch Consideration",
        titleEn: "Launch Consideration",
        intro:
          "Fase peluncuran sebaiknya menempatkan edukasi ringan dan bukti awal sebagai pasangan utama agar audience tidak merasa dibebani.",
        introEn:
          "The launch phase should pair light education with early proof so the audience does not feel overloaded.",
        bullets: [
          "Mulai dari kanal dengan respons komunitas tertinggi.",
          "Gunakan asset modular untuk pengujian cepat.",
          "Evaluasi respons narasi sebelum memperluas kampanye.",
        ],
        bulletsEn: [
          "Begin with the channel that has the highest community responsiveness.",
          "Use modular assets for fast testing.",
          "Evaluate narrative response before expanding the campaign.",
        ],
        note:
          "Peluncuran yang tenang namun tajam sering lebih efektif daripada kampanye besar yang terlalu generik.",
        noteEn:
          "A calm but sharp launch often outperforms a large campaign that feels too generic.",
      },
    ],
  },
  {
    id: "case-008",
    slug: "learning-platform-audit",
    title: "Learning Platform Audit",
    titleEn: "Learning Platform Audit",
    category: "Riset Edukasi Digital",
    categoryEn: "Learning Product Research",
    year: "2026",
    yearEn: "2026",
    month: "Mei",
    monthEn: "May",
    pageCount: 30,
    summary:
      "Audit pengalaman platform belajar digital untuk membaca motivasi belajar, penyebab drop-off, dan struktur materi yang paling mudah dipahami pengguna.",
    summaryEn:
      "An audit of a digital learning platform exploring motivation, drop-off causes, and content structures that are easiest for learners to absorb.",
    spineTone: "linear-gradient(180deg,#152022 0%,#3b6568 100%)",
    accentTone: "#9fd7d3",
    insight:
      "Retensi belajar naik ketika materi terasa progresif, terarah, dan memberi rasa kemajuan yang konkret dari sesi ke sesi.",
    insightEn:
      "Learning retention improved when lessons felt progressive, directed, and gave a concrete sense of advancement from session to session.",
    pages: [
      {
        title: "Learning Motivation",
        titleEn: "Learning Motivation",
        intro:
          "Riset ini memotret alasan utama pengguna datang ke platform dan apa yang membuat mereka bertahan setelah sesi pertama.",
        introEn:
          "This study looked at why users came to the platform and what made them stay after the first session.",
        bullets: [
          "Tujuan belajar yang jelas meningkatkan komitmen awal.",
          "Progress yang terlihat langsung mendorong sesi lanjutan.",
          "Materi pembuka terlalu panjang menurunkan motivasi.",
        ],
        bulletsEn: [
          "Clear learning goals increased early commitment.",
          "Visible progress encouraged continued sessions.",
          "Long introductory material reduced motivation.",
        ],
        note:
          "Motivasi belajar butuh ritme yang terasa bergerak sejak awal, bukan penjelasan panjang tanpa hasil kecil.",
        noteEn:
          "Learning motivation needs a sense of movement early, not long explanations without small wins.",
      },
      {
        title: "Drop-off Patterns",
        titleEn: "Drop-off Patterns",
        intro:
          "Pola drop-off terbesar terjadi setelah modul pertama ketika struktur materi belum cukup menunjukkan manfaat tahap berikutnya.",
        introEn:
          "The largest drop-off happened after the first module when content structure failed to show the value of the next stage.",
        bullets: [
          "User berhenti saat merasa kemajuan tidak terukur.",
          "Konten teori murni membuat sesi terasa berat.",
          "Checkpoints kecil membantu user kembali fokus.",
        ],
        bulletsEn: [
          "Users left when progress felt immeasurable.",
          "Pure theory made sessions feel heavy.",
          "Small checkpoints helped learners regain focus.",
        ],
        note:
          "Pengalaman belajar yang baik membutuhkan pemandu progres, bukan hanya daftar materi.",
        noteEn:
          "A good learning experience needs progress guidance, not just a list of lessons.",
      },
      {
        title: "Content Structure",
        titleEn: "Content Structure",
        intro:
          "Materi yang paling mudah dipahami adalah materi yang dibagi menjadi unit singkat dengan pola belajar, praktik, dan refleksi.",
        introEn:
          "The easiest material to absorb was split into short units following a learn, practice, and reflect pattern.",
        bullets: [
          "Satu ide utama per unit terasa paling efektif.",
          "Contoh nyata membuat teori lebih cepat menempel.",
          "Refleksi singkat membantu memperkuat pemahaman.",
        ],
        bulletsEn: [
          "One core idea per unit felt most effective.",
          "Real examples made theory stick faster.",
          "Short reflections strengthened understanding.",
        ],
        note:
          "Kejelasan struktur membuat beban belajar terasa lebih ringan meskipun topiknya kompleks.",
        noteEn:
          "Structural clarity made the learning load feel lighter even when the topic was complex.",
      },
      {
        title: "Improvement Direction",
        titleEn: "Improvement Direction",
        intro:
          "Arah pengembangan menempatkan alur progres, reward kecil, dan kurasi materi inti sebagai fokus utama untuk meningkatkan retensi.",
        introEn:
          "The improvement direction prioritizes progress flows, small rewards, and tighter content curation to improve retention.",
        bullets: [
          "Tonjolkan progres saat user menyelesaikan modul.",
          "Singkatkan teori pembuka dan percepat praktik.",
          "Rancang dashboard belajar yang memotivasi kembali.",
        ],
        bulletsEn: [
          "Highlight progress when users complete modules.",
          "Shorten theory introductions and speed up practice.",
          "Design a learning dashboard that re-motivates users.",
        ],
        note:
          "Retensi paling kuat lahir dari pengalaman belajar yang terasa maju dan tidak mengintimidasi.",
        noteEn:
          "Strong retention comes from a learning experience that feels progressive and non-intimidating.",
      },
    ],
  },
  {
    id: "case-009",
    slug: "community-engagement-read",
    title: "Community Engagement Read",
    titleEn: "Community Engagement Read",
    category: "Riset Komunitas",
    categoryEn: "Community Research",
    year: "2025",
    yearEn: "2025",
    month: "Oktober",
    monthEn: "October",
    pageCount: 18,
    summary:
      "Pembacaan pola keterlibatan komunitas untuk melihat jenis interaksi, pemicu partisipasi, dan format konten yang paling membangun rasa memiliki.",
    summaryEn:
      "A community engagement reading examining interaction types, participation triggers, and content formats that build belonging most effectively.",
    spineTone: "linear-gradient(180deg,#1d1714 0%,#7c5638 100%)",
    accentTone: "#f0bc86",
    insight:
      "Partisipasi meningkat saat anggota merasa suaranya terlihat dan kontribusinya dihubungkan ke narasi komunitas yang lebih besar.",
    insightEn:
      "Participation grew when members felt seen and when their contributions connected to a larger community narrative.",
    pages: [
      {
        title: "Participation Signals",
        titleEn: "Participation Signals",
        intro:
          "Riset mengidentifikasi pemicu utama partisipasi, termasuk pengakuan sosial, rasa relevansi, dan momentum percakapan yang tepat.",
        introEn:
          "The study identified key participation triggers including social recognition, perceived relevance, and timely conversation moments.",
        bullets: [
          "Anggota lebih aktif saat tema terasa dekat dengan pengalaman mereka.",
          "Respons cepat dari admin memperkuat rasa aman untuk ikut bicara.",
          "Konten dengan pertanyaan terbuka memicu diskusi lebih panjang.",
        ],
        bulletsEn: [
          "Members were more active when topics felt close to their own experiences.",
          "Fast admin responses strengthened the sense of safety to speak up.",
          "Open-ended prompts triggered longer conversations.",
        ],
        note:
          "Keterlibatan komunitas tumbuh dari rasa hubungan, bukan dari volume posting semata.",
        noteEn:
          "Community engagement grows from connection, not from posting volume alone.",
      },
      {
        title: "Belonging Factors",
        titleEn: "Belonging Factors",
        intro:
          "Rasa memiliki paling kuat muncul ketika anggota merasa kontribusi kecil mereka tetap dianggap berarti dalam ritme komunitas.",
        introEn:
          "Belonging felt strongest when members believed even small contributions mattered to the broader community rhythm.",
        bullets: [
          "Spotlight anggota memberi dampak emosional yang kuat.",
          "Bahasa komunitas yang terlalu formal menciptakan jarak.",
          "Tradisi kecil meningkatkan keterikatan jangka panjang.",
        ],
        bulletsEn: [
          "Member spotlights created strong emotional impact.",
          "Overly formal language created distance.",
          "Small rituals increased long-term attachment.",
        ],
        note:
          "Komunitas yang sehat dibentuk oleh pola pengakuan yang berulang dan terasa tulus.",
        noteEn:
          "Healthy communities are shaped by recurring and sincere forms of recognition.",
      },
      {
        title: "Content Rhythm",
        titleEn: "Content Rhythm",
        intro:
          "Format konten yang paling efektif bukan yang paling ramai, melainkan yang memberi ruang bagi anggota untuk masuk dan menambahkan perspektif sendiri.",
        introEn:
          "The most effective content format was not the loudest one, but the one that gave members room to enter and add their own perspective.",
        bullets: [
          "Konten berbasis pengalaman memicu cerita balik dari anggota.",
          "Agenda terlalu padat menurunkan partisipasi alami.",
          "Ritme mingguan lebih baik daripada ledakan konten sesekali.",
        ],
        bulletsEn: [
          "Experience-led content triggered return stories from members.",
          "Over-packed agendas reduced organic participation.",
          "A weekly rhythm worked better than occasional content bursts.",
        ],
        note:
          "Keberlanjutan komunitas bergantung pada ritme yang konsisten dan tidak melelahkan.",
        noteEn:
          "Community sustainability depends on a rhythm that is consistent and non-exhausting.",
      },
      {
        title: "Engagement Direction",
        titleEn: "Engagement Direction",
        intro:
          "Arah strategi merekomendasikan kombinasi ritual komunitas, konten reflektif, dan pola pengakuan yang lebih nyata di setiap siklus interaksi.",
        introEn:
          "The strategy recommends a mix of community rituals, reflective content, and clearer recognition patterns in every interaction cycle.",
        bullets: [
          "Buat format mingguan yang mudah diantisipasi anggota.",
          "Bangun arsip cerita komunitas secara bertahap.",
          "Jaga tone agar akrab namun tetap terkurasi.",
        ],
        bulletsEn: [
          "Create a weekly format members can anticipate.",
          "Build a community story archive gradually.",
          "Keep the tone warm yet curated.",
        ],
        note:
          "Keterlibatan yang sehat lebih dekat ke hubungan jangka panjang daripada kampanye jangka pendek.",
        noteEn:
          "Healthy engagement looks more like a long-term relationship than a short-term campaign.",
      },
    ],
  },
  {
    id: "case-010",
    slug: "mobility-journey-study",
    title: "Mobility Journey Study",
    titleEn: "Mobility Journey Study",
    category: "Riset Mobilitas",
    categoryEn: "Mobility Research",
    year: "2026",
    yearEn: "2026",
    month: "Juni",
    monthEn: "June",
    pageCount: 26,
    summary:
      "Studi perjalanan mobilitas harian untuk memahami momen perpindahan, kebutuhan informasi real-time, dan titik stres pada layanan transportasi digital.",
    summaryEn:
      "A daily mobility journey study exploring transition moments, real-time information needs, and stress points in digital transport services.",
    spineTone: "linear-gradient(180deg,#14161f 0%,#354274 100%)",
    accentTone: "#aab8ff",
    insight:
      "Kebutuhan terbesar pengguna muncul di momen perpindahan cepat ketika konteks berubah lebih cepat daripada informasi yang tersedia.",
    insightEn:
      "The largest user need emerged during fast transitions when context changed more quickly than available information.",
    pages: [
      {
        title: "Journey Mapping",
        titleEn: "Journey Mapping",
        intro:
          "Riset memetakan perjalanan dari persiapan berangkat, perpindahan moda, hingga penyelesaian perjalanan untuk melihat momen tekanan tertinggi.",
        introEn:
          "The study mapped journeys from trip planning to modal transfer and completion to identify moments of highest pressure.",
        bullets: [
          "Perpindahan moda menjadi titik dengan beban kognitif tertinggi.",
          "User butuh kepastian waktu lebih cepat daripada detail panjang.",
          "Informasi yang telat satu menit terasa tidak berguna.",
        ],
        bulletsEn: [
          "Mode transfer carried the highest cognitive load.",
          "Users needed timing certainty more than long detail.",
          "Information delayed by one minute already felt useless.",
        ],
        note:
          "Mobilitas digital menuntut presisi konteks, bukan hanya presisi data.",
        noteEn:
          "Digital mobility demands contextual precision, not only data precision.",
      },
      {
        title: "Stress Triggers",
        titleEn: "Stress Triggers",
        intro:
          "Pemicu stres paling sering terjadi saat user harus memutuskan cepat di ruang yang bising, padat, dan bergerak.",
        introEn:
          "Stress triggers appeared most often when users had to make fast decisions in noisy, crowded, moving environments.",
        bullets: [
          "Notifikasi terlalu panjang sulit diproses saat transit.",
          "Peta yang lambat meningkatkan rasa cemas.",
          "Informasi alternatif harus hadir sebelum user panik.",
        ],
        bulletsEn: [
          "Long notifications were difficult to process in transit.",
          "Slow maps increased anxiety.",
          "Alternative routes needed to appear before users panicked.",
        ],
        note:
          "Keputusan di perjalanan membutuhkan desain yang sangat hemat atensi.",
        noteEn:
          "In-transit decisions require design that is extremely attention-efficient.",
      },
      {
        title: "Realtime Needs",
        titleEn: "Realtime Needs",
        intro:
          "Informasi real-time yang paling dibutuhkan bukan yang paling banyak, melainkan yang paling relevan dengan keputusan detik itu juga.",
        introEn:
          "The most needed real-time information was not the most abundant, but the most relevant to the immediate decision.",
        bullets: [
          "ETA, status keterlambatan, dan alternatif adalah tiga sinyal utama.",
          "User ingin pembaruan singkat yang terus akurat.",
          "Ikon dan warna perlu dibatasi agar tetap terbaca cepat.",
        ],
        bulletsEn: [
          "ETA, delay status, and alternatives were the three core signals.",
          "Users wanted brief updates that stayed accurate.",
          "Icons and colors needed to stay limited for fast reading.",
        ],
        note:
          "Nilai utama layanan ada pada ketepatan sinyal, bukan kepadatan antarmuka.",
        noteEn:
          "The main service value lies in signal precision, not interface density.",
      },
      {
        title: "Design Outlook",
        titleEn: "Design Outlook",
        intro:
          "Arah solusi menempatkan mode perjalanan aktif, sinyal real-time yang ringkas, dan fallback decision yang selalu siap ditampilkan.",
        introEn:
          "The solution direction prioritizes active travel mode, concise realtime signals, and fallback decisions that are always ready to appear.",
        bullets: [
          "Bedakan state berjalan, menunggu, dan pindah moda secara jelas.",
          "Sediakan alternatif lebih awal ketika anomali terdeteksi.",
          "Rancang layar untuk dibaca dalam beberapa detik saja.",
        ],
        bulletsEn: [
          "Clearly separate walking, waiting, and transfer states.",
          "Provide alternatives early when anomalies are detected.",
          "Design screens to be readable in only a few seconds.",
        ],
        note:
          "Pengalaman mobilitas yang baik terasa sigap, ringan, dan selalu satu langkah di depan perubahan konteks.",
        noteEn:
          "A good mobility experience feels quick, light, and always one step ahead of context change.",
      },
    ],
  },
];
