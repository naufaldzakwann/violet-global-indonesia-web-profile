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

// Gambar khusus halaman detail; cover pada daftar layanan tetap memakai serviceImages.
export const serviceDetailImages: Record<string, string> = {
  "it-development": "/images/services/it-development.webp",
  "consulting": "/images/services/consulting.webp",
  "sustainable-energy-solutions": "/images/services/sustainable-energy-solutions.webp",
};

export function getDetailHero(slug: string): string {
  return serviceDetailImages[slug] ?? serviceDetailHero;
}
