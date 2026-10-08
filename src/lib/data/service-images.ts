export const serviceImages: Record<string, string> = {
  "it-development": "/migrated/services/data-analytics-business-intelligence.jpg",
  "consulting": "/migrated/services/konsultasi-it.jpg",
  "sustainable-energy-solutions": "/migrated/green-energy/thermal-plant.jpg",
  // Legacy slugs (dipertahankan untuk data migrasi lama)
  "pembuatan-website-aplikasi": "/migrated/services/pembuatan-website-aplikasi.jpg",
  "keamanan-siber": "/migrated/services/keamanan-siber.jpg",
  "social-media-management": "/migrated/services/social-media-management.jpg",
  "optimasi-digital": "/migrated/services/optimasi-digital.jpg",
  "desain-grafis-branding": "/migrated/services/desain-grafis-branding.jpg",
  "ecommerce-marketplace": "/migrated/services/ecommerce-marketplace.jpg",
  "automasi-integrasi-sistem": "/migrated/services/automasi-integrasi-sistem.jpg",
};

export const serviceFallbackImage = "/migrated/services/automasi-integrasi-sistem.jpg";

export const serviceDetailHero = "/migrated/services/detail-hero.jpg";

// Hero halaman detail yang spesifik per layanan (sisanya pakai serviceDetailHero)
export const serviceDetailHeroes: Record<string, string> = {
  "sustainable-energy-solutions": "/migrated/green-energy/sustainable-solutions-hero.png",
};

export const getDetailHero = (slug: string) => serviceDetailHeroes[slug] || serviceDetailHero;
