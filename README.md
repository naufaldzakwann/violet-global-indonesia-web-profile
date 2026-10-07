# Violet Global Indonesia — Web App

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **i18n:** next-intl (ID / EN)
- **Icons:** Custom inline SVG via Icon component

## Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production
npm run build

# Start production server
npm start
```

## Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your values:
```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure
```
src/
├── app/
│   ├── [locale]/          # i18n pages (id / en)
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── services/
│   │   │   └── [slug]/
│   │   ├── portfolio/
│   │   │   └── [slug]/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── contact/
│   │   ├── faq/
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/            # Navbar, Footer, WhatsAppButton
│   ├── sections/          # HeroSection, ServicesSection, etc.
│   └── ui/                # Icon, AnimateOnView
├── i18n/
│   ├── request.ts
│   └── routing.ts
├── lib/
│   ├── data/              # services, portfolio, blog, general
│   └── utils.ts
├── messages/
│   ├── id.json            # Bahasa Indonesia
│   └── en.json            # English
├── middleware.ts
└── types/index.ts
```

## Pages
| URL | Description |
|-----|-------------|
| `/id` or `/en` | Home Page |
| `/id/about` | About Us |
| `/id/services` | Services Listing |
| `/id/services/[slug]` | Service Detail |
| `/id/portfolio` | Portfolio Grid with Filter |
| `/id/portfolio/[slug]` | Portfolio Case Study |
| `/id/blog` | Blog with Search & Filter |
| `/id/blog/[slug]` | Blog Article Detail |
| `/id/contact` | Multi-step Contact Form |
| `/id/faq` | FAQ with Accordion & Search |
