export const site = {
  name: "PT Violet Global Indonesia",
  shortName: "Violet",
  tagline: "Orchestrating Intelligence, Defining the Future",
  domain: "https://vgi.web.id",
  url: "https://vgi.web.id",
  email: "laluwidh@vgi.web.id",
  address:
    "Jl. Lempongsari Timur IV No. 302 K, Kec. Gajah Mungkur, Kota Semarang 50231, Indonesia",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jl.+Lempongsari+Timur+IV+No.+302+K,+Gajah+Mungkur,+Semarang+50231",
  mapsEmbed:
    "https://www.google.com/maps?q=Jl.+Lempongsari+Timur+IV+No.+302+K,+Gajah+Mungkur,+Semarang+50231&output=embed",
  description:
    "PT Violet Global Indonesia is a deep-tech company and digital transformation partner focused on AI, digital intelligence, cybersecurity, and technology-enabled sustainable infrastructure.",
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Platforms", href: "/platforms" },
  { label: "Cybersecurity", href: "/cybersecurity" },
  { label: "Consulting", href: "/consulting" },
  { label: "Green Energy", href: "/green-energy" },
  { label: "Procurement", href: "/procurement" },
  { label: "Contact", href: "/contact" },
] as const;

export const pillars = [
  "Artificial Intelligence",
  "Digital Intelligence",
  "Cybersecurity",
  "Green Energy",
  "Sustainable Infrastructure",
] as const;

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const img = {
  wastePlant:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Recycling_001_2014_03_16.jpg/1280px-Recycling_001_2014_03_16.jpg",
  hero: u("1486406146926-c627a92ad1ab", 2000),
  narativa: u("1551434678-e076c223a692"),
  blockchain: u("1518546305927-5a555bb7020d"),
  automation: u("1555066931-4365d14bab8c"),
  cyber: u("1550751827-4bd374c3f58b"),
  soc: u("1558494949-ef010cbdcc31"),
  matrix: u("1526374965328-7f61d4dc18c5"),
  strategy: u("1454165804606-c3d57bc86b40"),
  team: u("1522071820081-009f0129c71c"),
  solar: u("1509391366360-2e959784a276"),
  wind: u("1466611653911-95081537e5b7"),
  engineer: u("1581094794329-c8112a89af12"),
  tower: u("1486406146926-c627a92ad1ab"),
  city: u("1480714378408-67cf0d13bc1b"),
  aiGradient: u("1677442136019-21780ecad995"),
  satellite: u("1446776811953-b23d57bd21aa"),
} as const;
