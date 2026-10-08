import type { Service } from "@/types";

// Tiga pilar layanan Violet Global Indonesia — konten produk diambil dari
// company profile resmi (violet-global-compro).
export const services: Service[] = [
  {
    id: "svc-it-development",
    slug: "it-development",
    icon: "Cpu",
    title: "IT Development",
    titleEn: "IT Development",
    shortDesc: "Platform dan produk digital berbasis AI — media intelligence, blockchain analytics, dan automasi enterprise.",
    shortDescEn: "AI-powered digital platforms and products — media intelligence, blockchain analytics, and enterprise automation.",
    description:
      "Lini IT Development menghadirkan platform digital intelligence berbasis AI: memantau percakapan publik, menganalisis data blockchain, hingga mengotomatiskan operasi media sosial berskala enterprise. Semua produk dirancang agar aman, skalabel, dan terukur dampaknya.",
    descriptionEn:
      "The IT Development division delivers AI-powered digital intelligence platforms: monitoring public conversations, analyzing blockchain data, and automating enterprise-scale social media operations. Every product is designed to be secure, scalable, and measurable.",
    features: [
      "Platform intelligence berbasis AI",
      "Dashboard pemantauan real-time & pelaporan otomatis",
      "Dukungan bahasa Indonesia untuk analisis konten",
      "Infrastruktur skalabel untuk volume data besar",
      "Integrasi dengan tools analisis existing",
    ],
    featuresEn: [
      "AI-based intelligence platforms",
      "Real-time monitoring dashboard & automated reporting",
      "Indonesian language support for content analysis",
      "Scalable infrastructure for large data volumes",
      "Integration with existing analytics tools",
    ],
    category: "it-development",
    audience: [
      "Anda ingin memantau percakapan dan reputasi di media sosial secara otomatis, tanpa cek manual satu per satu",
      "Institusi keuangan atau penegak hukum yang perlu memantau transaksi crypto dan investigasi forensik",
      "Tim yang mengelola banyak akun media sosial sekaligus dan butuh sistem yang aman & terukur",
      "Perusahaan yang butuh dashboard data real-time untuk pengambilan keputusan cepat",
    ],
    audienceEn: [
      "You want to monitor conversations and reputation on social media automatically, without manual checking",
      "Financial institutions or law enforcement that need crypto transaction monitoring and forensic investigation",
      "Teams managing many social media accounts at once and needing a secure, measurable system",
      "Companies that need real-time data dashboards for fast decision-making",
    ],
    process: [
      { title: "Ceritakan Kebutuhan Anda", titleEn: "Tell Us Your Needs", desc: "Diskusi santai (gratis) untuk memahami masalah yang ingin Anda selesaikan — belum perlu tahu solusi teknisnya.", descEn: "A relaxed (free) discussion to understand the problem you want to solve — no technical knowledge needed upfront." },
      { title: "Demo & Usulan Solusi", titleEn: "Demo & Proposed Solution", desc: "Kami perkenalkan platform yang relevan lewat demo langsung, lalu susun usulan solusi dan estimasinya.", descEn: "We introduce the relevant platform with a live demo, then prepare a solution proposal and estimate." },
      { title: "Implementasi & Integrasi", titleEn: "Implementation & Integration", desc: "Tim kami memasang, menyesuaikan, dan menghubungkan sistem dengan tools yang sudah Anda pakai.", descEn: "Our team sets up, customizes, and connects the system with the tools you already use." },
      { title: "Pelatihan & Dukungan", titleEn: "Training & Support", desc: "Kami latih tim Anda sampai terbiasa, dan tetap standby bila ada kendala atau kebutuhan baru.", descEn: "We train your team until they are comfortable, and stay on standby for issues or new needs." },
    ],
    products: [
      {
        icon: "Globe",
        name: "Narativa-X",
        nameEn: "Narativa-X",
        tagline: "Social Media Intelligence Platform",
        taglineEn: "Social Media Intelligence Platform",
        description:
          "Platform intelijen media berbasis AI untuk memantau, menganalisis, dan merespons percakapan publik secara real-time.",
        descriptionEn:
          "An AI-based media intelligence platform for monitoring, analyzing, and responding to public conversations.",
        capabilities: [
          "Pemantauan multi-platform (media sosial, portal berita, dark web)",
          "Analisis sentimen berbasis AI dengan dukungan bahasa Indonesia",
          "Deteksi dini misinformasi dan kampanye negatif",
          "Pemetaan jaringan dan identifikasi aktor kunci",
          "Dashboard real-time dan sistem pelaporan otomatis",
        ],
        capabilitiesEn: [
          "Multi-platform monitoring (social media, news portals, dark web)",
          "AI-based sentiment analysis with Indonesian language support",
          "Early detection of misinformation and negative campaigns",
          "Network mapping and key actor identification",
          "Real-time dashboard and automated reporting system",
        ],
      },
      {
        icon: "ShieldCheck",
        name: "Cryptocurrency Analytics Platform",
        nameEn: "Cryptocurrency Analytics Platform",
        tagline: "Blockchain Intelligence & Compliance",
        taglineEn: "Blockchain Intelligence & Compliance",
        description:
          "Platform analitik blockchain untuk pemantauan transaksi, investigasi forensik, dan kepatuhan regulasi.",
        descriptionEn:
          "Blockchain analytics platform for transaction monitoring, forensic investigation, and regulatory compliance.",
        capabilities: [
          "Pemantauan transaksi multi-blockchain secara real-time",
          "Analisis jaringan dan clustering wallet",
          "Deteksi aktivitas mencurigakan (pencucian uang, fraud)",
          "Tools investigasi forensik dengan bukti siap pengadilan",
          "Integrasi dengan i2 Analyst Notebook",
        ],
        capabilitiesEn: [
          "Real-time multi-blockchain transaction monitoring",
          "Network analysis and wallet clustering",
          "Suspicious activity detection (money laundering, fraud)",
          "Forensic investigation tools with court-ready evidence",
          "Integration with i2 Analyst Notebook",
        ],
      },
      {
        icon: "Zap",
        name: "Enterprise Social Media Automation",
        nameEn: "Enterprise Social Media Automation",
        tagline: "Otomasi Media Sosial Enterprise",
        taglineEn: "Enterprise Social Media Automation",
        description:
          "Platform otomasi media sosial yang aman, skalabel, dan efektif untuk kebutuhan enterprise.",
        descriptionEn:
          "A secure, scalable, and effective social media automation platform for enterprise needs.",
        capabilities: [
          "Kelola puluhan ribu akun dari satu dashboard",
          "Smart engagement — like, comment, share otomatis dengan pola natural",
          "Peningkatan views video/live stream secara masif",
          "Dashboard analitik untuk memantau growth dan engagement ROI",
          "Pelaporan konten massal otomatis",
        ],
        capabilitiesEn: [
          "Manage tens of thousands of accounts from one dashboard",
          "Smart engagement — automatic likes, comments, shares with natural patterns",
          "Massive video/live stream view increase",
          "Analytics dashboard to monitor growth and engagement ROI",
          "Automated bulk content reporting",
        ],
      },
    ],
  },
  {
    id: "svc-consulting",
    slug: "consulting",
    icon: "Lightbulb",
    title: "Consulting",
    titleEn: "Consulting",
    shortDesc: "Konsultasi strategis — market entry, teknologi, pengembangan bisnis, dan aktivasi pasar baru.",
    shortDescEn: "Strategic consulting — market entry, technology, business development, and new market activation.",
    description:
      "Layanan konsultansi strategis untuk membantu organisasi masuk pasar baru, merancang arsitektur teknologi, mempercepat pertumbuhan bisnis, dan mengaktifkan potensi pasar yang belum tergarap — semuanya berbasis data dan AI.",
    descriptionEn:
      "Strategic consulting services that help organizations enter new markets, design technology architecture, accelerate business growth, and activate untapped market potential — all grounded in data and AI.",
    features: [
      "Riset dan analisis pasar berbasis data & AI",
      "Dukungan tender pemerintah & proposal enterprise",
      "Perancangan strategi go-to-market dan ekspansi",
      "Strukturisasi kemitraan strategis dan KPBU/PPP",
      "Dokumentasi proposal & investasi",
    ],
    featuresEn: [
      "Data & AI-driven market research and analysis",
      "Government tender & enterprise proposal support",
      "Go-to-market and expansion strategy design",
      "Strategic partnership and PPP structuring",
      "Proposal & investment documentation",
    ],
    category: "consulting",
    audience: [
      "Ingin masuk pasar baru tapi belum tahu harus mulai dari mana",
      "Butuh peta jalan (roadmap) transformasi digital yang jelas dan bertahap",
      "Ingin mengembangkan bisnis, mencari kemitraan, atau mengikuti tender pemerintah",
      "Punya peluang pasar baru yang belum tergarap dan butuh validasi sebelum investasi",
    ],
    audienceEn: [
      "You want to enter a new market but don't know where to start",
      "You need a clear, phased digital transformation roadmap",
      "You want to grow the business, find partnerships, or pursue government tenders",
      "You have an untapped market opportunity that needs validation before investing",
    ],
    process: [
      { title: "Sesi Pemahaman Bisnis", titleEn: "Business Discovery Session", desc: "Kami dengarkan kondisi, target, dan kendala Anda — tanpa jargon teknis.", descEn: "We listen to your situation, goals, and constraints — no tech jargon." },
      { title: "Riset & Analisis", titleEn: "Research & Analysis", desc: "Tim kami melakukan riset pasar, regulasi, dan analisis data sesuai lingkup kesepakatan.", descEn: "Our team conducts market, regulatory, and data analysis according to the agreed scope." },
      { title: "Rekomendasi & Roadmap", titleEn: "Recommendations & Roadmap", desc: "Anda menerima rekomendasi yang mudah dibaca: apa yang harus dilakukan, urutannya, dan estimasinya.", descEn: "You receive easy-to-read recommendations: what to do, in what order, and the estimates." },
      { title: "Pendampingan Eksekusi", titleEn: "Execution Support", desc: "Kalau diperlukan, kami dampingi langkah awal implementasi hingga kemitraan terbentuk.", descEn: "If needed, we accompany the first implementation steps through to formed partnerships." },
    ],
    products: [
      {
        icon: "Globe",
        name: "Market Entry Consultant",
        nameEn: "Market Entry Consultant",
        tagline: "Membuka Pintu Masuk Pasar dengan Strategi yang Tepat",
        taglineEn: "Opening Market Entry Doors with the Right Strategy",
        description:
          "Konsultasi masuk pasar untuk memastikan produk dan bisnis Anda hadir di pasar yang tepat, dengan strategi yang tepat.",
        descriptionEn:
          "Market entry consulting to ensure your product and business land in the right market with the right strategy.",
        capabilities: [
          "Riset dan analisis pasar berbasis data & AI",
          "Pemetaan regulasi, perizinan, dan kepatuhan lokal",
          "Strategi positioning dan penetrasi pasar",
          "Identifikasi kemitraan kunci dan stakeholder",
          "Roadmap go-to-market dan dukungan eksekusi",
          "Competitive intelligence dan benchmarking",
        ],
        capabilitiesEn: [
          "Market research and analysis based on data & AI",
          "Regulatory, licensing and local compliance mapping",
          "Market positioning and market penetration strategy",
          "Key partnership and stakeholder identification",
          "Go-to-market roadmap and execution support",
          "Competitive intelligence and benchmarking",
        ],
      },
      {
        icon: "Cpu",
        name: "Strategic Technology Consultant",
        nameEn: "Strategic Technology Consultant",
        tagline: "Arsitektur Teknologi untuk Keunggulan Kompetitif",
        taglineEn: "Technology Architecture for Competitive Advantage",
        description:
          "Perancangan strategi teknologi dan arsitektur enterprise agar teknologi menjadi keunggulan bersaing, bukan beban.",
        descriptionEn:
          "Technology strategy and enterprise architecture design so technology becomes a competitive advantage, not a burden.",
        capabilities: [
          "Perencanaan strategis IT dan roadmap transformasi digital",
          "Arsitektur enterprise dan asesmen teknologi",
          "Strategi implementasi AI/ML dan infrastruktur data",
          "Perancangan framework keamanan siber & advisory kepatuhan",
          "Strategi migrasi cloud dan optimasi infrastruktur",
          "Due diligence teknologi dan evaluasi vendor",
        ],
        capabilitiesEn: [
          "IT strategic planning and digital transformation roadmap",
          "Enterprise architecture and technology assessment",
          "AI/ML implementation strategy and data infrastructure",
          "Cybersecurity framework design and compliance advisory",
          "Cloud migration strategy and infrastructure optimization",
          "Technology due diligence and vendor evaluation",
        ],
      },
      {
        icon: "TrendingUp",
        name: "Business Development Consultant",
        nameEn: "Business Development Consultant",
        tagline: "Mempercepat Pertumbuhan Bisnis yang Berkelanjutan",
        taglineEn: "Accelerating Sustainable Business Growth",
        description:
          "Dampingi pertumbuhan bisnis — dari membangun pipeline, kemitraan, hingga retensi klien jangka panjang.",
        descriptionEn:
          "Accelerate business growth — from pipeline building and partnerships to long-term client retention.",
        capabilities: [
          "Pengembangan pipeline strategis dan lead generation",
          "Pembangunan kemitraan dan aliansi",
          "Dukungan tender pemerintah dan proposal enterprise",
          "Model pendapatan dan strategi pricing",
          "Perencanaan ekspansi pasar",
          "Relationship management dan retensi klien",
        ],
        capabilitiesEn: [
          "Strategic pipeline development and lead generation",
          "Partnership and alliance building",
          "Government tender and enterprise proposal support",
          "Revenue model and pricing strategy",
          "Market expansion planning",
          "Relationship management and client retention",
        ],
      },
      {
        icon: "Rocket",
        name: "Prospective Market Enabler",
        nameEn: "Prospective Market Enabler",
        tagline: "Mengaktifkan Potensi Pasar yang Belum Tergarap",
        taglineEn: "Activating Untapped Market Potential",
        description:
          "Membuka dan mengaktifkan pasar baru — dari validasi peluang hingga fasilitasi kemitraan publik-swasta.",
        descriptionEn:
          "Opening and activating new markets — from opportunity validation to public-private partnership facilitation.",
        capabilities: [
          "Identifikasi dan validasi peluang pasar baru",
          "Pemetaan ekosistem dan engagement stakeholder",
          "Penciptaan permintaan dan edukasi pasar",
          "Desain pilot project dan proof-of-concept",
          "Fasilitasi Kerjasama Pemerintah-Badan Usaha (KPBU/PPP)",
        ],
        capabilitiesEn: [
          "Identification and validation of new market opportunities",
          "Ecosystem mapping and stakeholder engagement",
          "Demand creation and market education",
          "Pilot project and proof-of-concept design",
          "Public-Private Partnership (PPP) facilitation",
        ],
      },
    ],
  },
  {
    id: "svc-sustainable-energy-solutions",
    slug: "sustainable-energy-solutions",
    icon: "Recycle",
    title: "Sustainable Energy Solutions",
    titleEn: "Sustainable Energy Solutions",
    shortDesc: "Teknologi energi & lingkungan — smart waste management, plastics-to-fuel, dan proyek energi terbarukan.",
    shortDescEn: "Energy & environmental technology — smart waste management, plastics-to-fuel, and renewable energy projects.",
    description:
      "Lini Sustainable Energy Solutions menghubungkan digital intelligence dengan infrastruktur energi dan lingkungan yang praktis: pengelolaan sampah pintar terintegrasi, konversi limbah plastik menjadi bahan bakar, hingga pengembangan proyek energi terbarukan yang berkelanjutan.",
    descriptionEn:
      "We deliver integrated solutions that transform energy and resource challenges into sustainable economic opportunities. Our focus spans renewable energy, waste-to-energy, waste-to-fuel, resource recovery, bioenergy, and sustainable infrastructure.",
    features: [
      "Perencanaan & pengembangan infrastruktur pengolahan sampah (TPST/TPA)",
      "Implementasi Smart Bin & monitoring armada berbasis IoT",
      "Dashboard analitik untuk pengawasan & kepatuhan lingkungan",
      "Strukturisasi skema KPBU dengan pemerintah & badan usaha",
      "Pemantauan digital & performance management selama siklus proyek",
    ],
    featuresEn: [
      "Waste processing infrastructure planning & development (TPST/TPA)",
      "Smart Bin implementation & IoT-based fleet monitoring",
      "Analytics dashboard for environmental supervision & compliance",
      "PPP scheme structuring with government & business entities",
      "Digital monitoring & performance management across the project lifecycle",
    ],
    category: "sustainable-energy-solutions",
    audience: [
      "Pemerintah daerah yang ingin membangun sistem pengelolaan sampah modern (TPST/TPA)",
      "Perusahaan yang wajib mengelola limbah dan laporan kepatuhan lingkungan",
      "Investor atau pengembang yang sedang mencari proyek green energy yang layak",
      "Kawasan industri yang ingin sistem pengelolaan sampah & energi terpadu",
    ],
    audienceEn: [
      "Local governments wanting to build modern waste management systems (TPST/TPA)",
      "Companies required to manage waste and environmental compliance reporting",
      "Investors or developers looking for viable green energy projects",
      "Industrial estates wanting integrated waste & energy management systems",
    ],
    process: [
      { title: "Konsultasi & Studi Kelayakan", titleEn: "Consultation & Feasibility Study", desc: "Kami pelajari kondisi lokasi, volume sampah/energi, dan potensi ekonominya dulu sebelum lanjut.", descEn: "We first study site conditions, waste/energy volume, and economic potential before proceeding." },
      { title: "Perancangan Skema", titleEn: "Scheme Design", desc: "Menyusun skema teknis, pembiayaan, dan kerja sama — termasuk format KPBU dengan pemerintah bila relevan.", descEn: "We design the technical, financing, and cooperation scheme — including government PPP (KPBU) formats when relevant." },
      { title: "Pembangunan & Integrasi Teknologi", titleEn: "Construction & Technology Integration", desc: "Infrastruktur dibangun dan dihubungkan dengan teknologi pintar (IoT, dashboard pemantauan).", descEn: "Infrastructure is built and connected with smart technology (IoT, monitoring dashboards)." },
      { title: "Operasional & Pemantauan", titleEn: "Operations & Monitoring", desc: "Sistem berjalan dengan pemantauan digital berkelanjutan dan dukungan tim kami.", descEn: "The system runs with continuous digital monitoring and support from our team." },
    ],
    products: [
      {
        icon: "Recycle",
        name: "Integrated Smart Waste Management",
        nameEn: "Integrated Smart Waste Management",
        tagline: "Manajemen, Infrastruktur, & Pengolahan Sampah Pintar",
        taglineEn: "Management, Infrastructure, & Smart Waste Processing Solutions",
        description:
          "Solusi terpadu pengelolaan sampah — dari perencanaan dan konsultasi infrastruktur TPST/TPA, teknologi Smart Bin & IoT, hingga program pemberdayaan masyarakat.",
        descriptionEn:
          "End-to-end waste management solutions — from TPST/TPA infrastructure planning and consultation to Smart Bin & IoT technology and community empowerment programs.",
        capabilities: [
          "Perencanaan, konsultasi & pembangunan infrastruktur pengolahan sampah (TPST/TPA)",
          "Konsultasi manajemen operasional & studi kelayakan pengelolaan sampah",
          "Penyelarasan skema kerja dengan pemerintah & badan usaha (KPBU)",
          "Pengembangan fasilitas pemilahan, daur ulang & ekonomi sirkular",
          "Implementasi Smart Bin & sistem monitoring armada berbasis IoT",
          "Dashboard analitik untuk pengawasan & kepatuhan lingkungan",
          "Program edukasi, sosialisasi & pemberdayaan masyarakat",
        ],
        capabilitiesEn: [
          "Planning, consultation, and waste processing infrastructure development (TPST/TPA)",
          "Operational management consultation & waste management feasibility study",
          "Work scheme alignment with government & business entities (KPBU)",
          "Development of sorting facilities, recycling & sustainable circular economy",
          "Smart Bin technology implementation & IoT-based fleet monitoring system",
          "Analytics dashboard for environmental supervision & compliance",
          "Community education, socialization & sustainable empowerment programs",
        ],
      },
      {
        icon: "Globe",
        name: "Green Energy Project Development",
        nameEn: "Green Energy Project Development",
        tagline: "Proyek Energi Terbarukan Berbasis Teknologi",
        taglineEn: "Technology-Enabled Renewable Energy Projects",
        description:
          "Pengembangan proyek energi terbarukan yang mendukung dekarbonisasi, pemulihan sumber daya, dan ketahanan energi — lengkap dengan pemantauan digital. Proyek-proyek berikut merupakan peluang pengembangan target dan pipeline konsep bisnis, bukan proyek yang telah selesai dibangun.",
        descriptionEn:
          "Development of renewable energy projects supporting decarbonization, resource recovery, and energy resilience — complete with digital monitoring. The following projects are target development opportunities and business-development pipeline concepts, not completed or commissioned projects.",
        capabilities: [
          "Integrated Waste-to-Energy Project",
          "Solar PV & Smart Energy Project",
          "Organic Waste-to-Biogas Project",
          "Green Industrial Energy Platform",
          "Smart Waste & Circular Economy Hub",
        ],
        capabilitiesEn: [
          "Integrated Waste-to-Energy Project",
          "Solar PV & Smart Energy Project",
          "Organic Waste-to-Biogas Project",
          "Green Industrial Energy Platform",
          "Smart Waste & Circular Economy Hub",
        ],
      },
    ],
  },
];

export const getCategoryLabel = (category: string, locale: string): string => {
  const labels: Record<string, { id: string; en: string }> = {
    "it-development":          { id: "IT Development", en: "IT Development" },
    "consulting":   { id: "Consulting", en: "Consulting" },
    "sustainable-energy-solutions":   { id: "Sustainable Energy Solutions", en: "Sustainable Energy Solutions" },
    "web-app":             { id: "Website & Aplikasi", en: "Website & App" },
      "cybersecurity":       { id: "Keamanan Siber", en: "Cybersecurity" },
    "social-media":        { id: "Social Media", en: "Social Media" },
    "digital-marketing":   { id: "Optimasi Digital", en: "Digital Optimization" },
    "design-branding":     { id: "Desain & Branding", en: "Design & Branding" },
    "ecommerce":           { id: "E-Commerce", en: "E-Commerce" },
    "data-analytics":      { id: "Data Analytics", en: "Data Analytics" },
    "automation":          { id: "Automasi Sistem", en: "Automation" },
  };
  return labels[category]?.[locale as "id" | "en"] ?? category;
};
