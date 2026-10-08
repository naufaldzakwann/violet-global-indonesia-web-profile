import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// Nama cookie next-intl — dipakai untuk mengingat pilihan bahasa manual
// pengguna agar tidak tertimpa deteksi otomatis.
const LOCALE_COOKIE = "NEXT_LOCALE";

function detectLocale(request: NextRequest): string {
  // 1. Pilihan manual pengguna (pernah ganti bahasa) selalu menang.
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (routing.locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Negara berdasarkan IP. Header geo disediakan platform hosting:
  //    - Vercel  : x-vercel-ip-country
  //    - Cloudflare (jika di-deploy di belakangnya): cf-ipcountry
  //    Di luar Indonesia => English, di Indonesia => Indonesia.
  const country = (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    ""
  ).toUpperCase();
  if (country) {
    return country === "ID" ? "id" : "en";
  }

  // 3. Fallback (mis. di localhost tanpa header geo): bahasa browser —
  //    browser berbahasa Indonesia -> id, lainnya -> en.
  const acceptLanguage = (request.headers.get("accept-language") || "").toLowerCase();
  return acceptLanguage.startsWith("id") ? "id" : "en";
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root tanpa locale -> arahkan ke locale hasil deteksi.
  if (pathname === "/") {
    const locale = detectLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(id|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
