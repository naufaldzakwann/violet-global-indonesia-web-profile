// Data program E3i RegenX — Plastics-to-Fuel (Green Energy flagship).
// Kontrak konsumen: `export const e3iRegenx: E3iRegenxData` dipakai oleh
// halaman /green-energy/regenx dan section preview di halaman about.
// Sumber konten: https://vgi.web.id/green-energy/regenx + poster resmi E3i RegenX (ID).

export type E3iRegenxStat = {
  value: string;
  valueEn: string;
  unit: string;
  unitEn: string;
  label: string;
  labelEn: string;
};

export type E3iRegenxProcessStep = {
  title: string;
  titleEn: string;
};

export type E3iRegenxTargetPlastic = {
  code: string;
  name: string;
};

export type E3iRegenxFinancialRow = {
  term: string;
  termEn: string;
  value: string;
  valueEn: string;
};

export type E3iRegenxImpact = {
  title: string;
  titleEn: string;
};

export type E3iRegenx = {
  slug: string;
  eyebrow: string;
  eyebrowEn: string;
  tagline: string;
  taglineEn: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  heroImage: string;
  posterImage: string;
  location: string;
  locationEn: string;
  stats: E3iRegenxStat[];
  challenge: {
    title: string;
    titleEn: string;
    text: string;
    textEn: string;
    image: string;
    imageAlt: string;
    imageAltEn: string;
    credit: string;
  };
  solution: {
    title: string;
    titleEn: string;
    text: string;
    textEn: string;
    image: string;
    steps: E3iRegenxProcessStep[];
  };
  targetPlastics: {
    title: string;
    titleEn: string;
    items: E3iRegenxTargetPlastic[];
    excludedCode: string;
    excludedName: string;
    excludedNote: string;
    excludedNoteEn: string;
  };
  output: {
    title: string;
    titleEn: string;
    label: string;
    labelEn: string;
    points: { text: string; textEn: string }[];
  };
  businessModel: {
    title: string;
    titleEn: string;
    items: { title: string; titleEn: string; text: string; textEn: string }[];
    note: string;
    noteEn: string;
  };
  financials: {
    title: string;
    titleEn: string;
    note: string;
    noteEn: string;
    rows: E3iRegenxFinancialRow[];
  };
  impact: {
    title: string;
    titleEn: string;
    items: E3iRegenxImpact[];
  };
  closing: {
    title: string;
    titleEn: string;
    footer: string;
    footerEn: string;
    image: string;
  };
  photosCredit: string;
};

const ASSET_BASE = "/migrated/green-energy";

export const e3iRegenx: E3iRegenx = {
  slug: "regenx",
  eyebrow: "Green Energy",
  eyebrowEn: "Green Energy",
  tagline: "Clean plastic, brighter tomorrow",
  taglineEn: "Clean plastic, brighter tomorrow",
  title: "E3i RegenX — Plastics-to-Fuel",
  titleEn: "E3i RegenX — Plastics-to-Fuel",
  subtitle: "Indonesia · Program Unggulan",
  subtitleEn: "Indonesia · Flagship program",
  description:
    "Mengubah limbah plastik sulit didaur ulang menjadi energi bersih bernilai ekonomi untuk Indonesia yang lebih bersih.",
  descriptionEn:
    "Turning hard-to-recycle plastic waste into clean, economically valuable energy for a cleaner Indonesia.",
  heroImage: `${ASSET_BASE}/thermal-plant.jpg`,
  posterImage: `${ASSET_BASE}/e3i-regenx-poster.jpg`,
  location: "Banyumas, Jawa Tengah, Indonesia",
  locationEn: "Banyumas, Central Java, Indonesia",
  stats: [
    { value: "20", valueEn: "20", unit: "Ton/Hari", unitEn: "Ton/day", label: "Kapasitas Pengolahan", labelEn: "Processing capacity" },
    { value: "312", valueEn: "312", unit: "Hari/Tahun", unitEn: "Days/year", label: "Hari Operasi", labelEn: "Operating days" },
    { value: "6.240", valueEn: "6,240", unit: "Ton/Tahun", unitEn: "Tons/year", label: "Plastik Diproses", labelEn: "Plastic processed" },
    { value: "1.347.216", valueEn: "1,347,216", unit: "Gallon/Tahun", unitEn: "Gallons/year", label: "Produksi Bahan Bakar", labelEn: "Fuel production" },
    { value: "2", valueEn: "2", unit: "Modul", unitEn: "Modules", label: "Jumlah Modul", labelEn: "Facility modules" },
    { value: "Banyumas", valueEn: "Banyumas", unit: "Jawa Tengah", unitEn: "Central Java", label: "Lokasi Proyek", labelEn: "Project location" },
  ],
  challenge: {
    title: "Tantangan Limbah Plastik di Indonesia",
    titleEn: "The Plastic Waste Challenge in Indonesia",
    text:
      "Jutaan ton limbah plastik dihasilkan setiap tahun, dan sebagian besar masih belum dikelola secara optimal — terutama plastik yang sulit didaur ulang secara konvensional.",
    textEn:
      "Millions of tons of plastic waste are generated every year, and most of it is still not managed optimally — especially plastics that are difficult to recycle conventionally.",
    image: `${ASSET_BASE}/plastic-waste-challenge.jpg`,
    imageAlt: "Tumpukan botol PET pasca-konsumsi menunggu proses konversi",
    imageAltEn: "Baled post-consumer PET bottles awaiting conversion",
    credit:
      "Foto: Grendelkhan, CC BY-SA 4.0, via Wikimedia Commons (commons.wikimedia.org/wiki/File:Bales_of_PET_bottles_closeup.jpg)",
  },
  solution: {
    title: "Solusi Kami — Teknologi E3i RegenX",
    titleEn: "Our Solution — E3i RegenX Technology",
    text:
      "Menggunakan proses konversi termal katalitik dalam kondisi minim oksigen untuk mengubah plastik menjadi gas hidrokarbon, yang kemudian direformasi dan dikondensasikan menjadi bahan bakar cair.",
    textEn:
      "Catalytic thermal conversion in a low-oxygen environment turns plastic into hydrocarbon gas, which is then reformed and condensed into liquid fuel.",
    image: `${ASSET_BASE}/process-lab.jpg`,
    steps: [
      { title: "Limbah Plastik Pasca-Konsumsi", titleEn: "Post-consumer plastic waste" },
      { title: "Proses Termal Katalitik", titleEn: "Catalytic thermal process" },
      { title: "Bahan Bakar Cair", titleEn: "Liquid fuel" },
    ],
  },
  targetPlastics: {
    title: "Jenis Plastik Target",
    titleEn: "Target Plastics",
    items: [
      { code: "2", name: "HDPE" },
      { code: "4", name: "LDPE" },
      { code: "5", name: "PP" },
    ],
    excludedCode: "3",
    excludedName: "PVC",
    excludedNote:
      "Klorin merusak katalis dan menurunkan kinerja proses.",
    excludedNoteEn:
      "Chlorine damages the catalyst and degrades process performance.",
  },
  output: {
    title: "Hasil Akhir — Bahan Bakar Cair Setara Diesel",
    titleEn: "Final Output — Diesel-Equivalent Liquid Fuel",
    label: "≈ Setara Diesel",
    labelEn: "≈ Diesel equivalent",
    points: [
      { text: "Nilai ekonomis mendukung ekonomi sirkular", textEn: "Economic value supporting a circular economy" },
      { text: "Mengurangi penimbunan sampah plastik", textEn: "Reduces plastic waste landfilling" },
      { text: "Sumber energi alternatif", textEn: "An alternative energy source" },
    ],
  },
  businessModel: {
    title: "Model Bisnis",
    titleEn: "Business Model",
    items: [
      {
        title: "Penjualan Bahan Bakar",
        titleEn: "Fuel sales",
        text: "Bahan bakar cair hidrokarbon setara diesel untuk sektor industri dan energi.",
        textEn: "Diesel-equivalent hydrocarbon liquid fuel for the industrial and energy sectors.",
      },
      {
        title: "Pendapatan Gate Fee",
        titleEn: "Gate-fee revenue",
        text: "Jasa penerimaan dan pengolahan limbah plastik dari pemroses limbah.",
        textEn: "Service fees for receiving and processing plastic waste from waste processors.",
      },
    ],
    note: "Diversifikasi pendapatan untuk keberlanjutan bisnis.",
    noteEn: "Revenue diversification for business sustainability.",
  },
  financials: {
    title: "Gambaran Finansial (Indikatif)",
    titleEn: "Financial Overview (Indicative)",
    note: "Seluruh angka bersifat indikatif dan harus divalidasi kembali berdasarkan kondisi Indonesia.",
    noteEn: "All figures are indicative and must be revalidated against actual conditions in Indonesia.",
    rows: [
      { term: "Estimasi Investasi (CAPEX)", termEn: "Estimated investment (CAPEX)", value: "US$11,66 juta", valueEn: "US$11.66 million" },
      { term: "Pendapatan Bruto Tahunan", termEn: "Annual gross revenue", value: "US$4,47 juta", valueEn: "US$4.47 million" },
      { term: "Biaya Operasional Tahunan", termEn: "Annual operating cost", value: "US$1,35 juta", valueEn: "US$1.35 million" },
      { term: "EBITDA", termEn: "EBITDA", value: "US$3,12 juta", valueEn: "US$3.12 million" },
      { term: "Estimasi Payback Period", termEn: "Estimated payback period", value: "5,3 tahun", valueEn: "5.3 years" },
    ],
  },
  impact: {
    title: "Dampak Positif",
    titleEn: "Positive Impact",
    items: [
      { title: "Mengurangi penimbunan sampah plastik", titleEn: "Reduces plastic waste accumulation" },
      { title: "Meningkatkan pemulihan sumber daya", titleEn: "Improves resource recovery" },
      { title: "Mendukung pengurangan emisi karbon", titleEn: "Supports carbon-emission reduction" },
      { title: "Menciptakan peluang ekonomi lokal", titleEn: "Creates local economic opportunity" },
      { title: "Model yang dapat direplikasi di wilayah lain di Indonesia", titleEn: "A model replicable across Indonesia's regions" },
    ],
  },
  closing: {
    title: "Dari Limbah Menjadi Peluang untuk Indonesia",
    titleEn: "From Waste into Opportunity for Indonesia",
    footer: "E3i RegenX — Lingkungan lebih bersih | Ekonomi lebih kuat | Hari esok lebih cerah",
    footerEn: "E3i RegenX — Cleaner environment | Stronger economy | Brighter tomorrow",
    image: `${ASSET_BASE}/indonesia-dawn.jpg`,
  },
  photosCredit:
    "Foto: Bitjungle (CC BY-SA 3.0) & RahmadHimawan Photography (CC BY-SA 4.0), via Wikimedia Commons",
};
