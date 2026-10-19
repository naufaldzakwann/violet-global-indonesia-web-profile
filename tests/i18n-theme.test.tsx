import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import id from "../src/messages/id.json";
import en from "../src/messages/en.json";
import ContactPage from "../src/app/[locale]/(website)/contact/page";
import AboutPage from "../src/app/[locale]/(website)/about/page";
import { PortfolioContent } from "../src/app/[locale]/(website)/portfolio/PortfolioContent";
import { ClientsSection } from "../src/components/sections/ClientsSection";
import { ThemeToggle } from "../src/components/theme/ThemeToggle";
import { applyTheme, getStoredTheme, getTheme, setTheme, subscribeTheme } from "../src/lib/theme";

vi.mock("next/link", () => ({ default: "a" }));
vi.mock("next/image", () => ({ default: "img" }));
vi.mock("@/components/ui/PageHeroDotGrid", () => ({ PageHeroDotGrid: () => null }));

function render(element: React.ReactNode, locale: "id" | "en") {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale={locale} messages={locale === "id" ? id : en} timeZone="Asia/Jakarta" now={new Date("2026-10-19T00:00:00Z")} onError={(error) => { throw error; }}>
      {element}
    </NextIntlClientProvider>,
  );
}

function keys(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object") return [prefix];
  return Object.entries(value).flatMap(([key, child]) => keys(child, `${prefix}.${key}`));
}

describe("terjemahan lintas halaman", () => {
  it("menyediakan struktur key ID dan EN yang sama", () => {
    expect(keys(id).sort()).toEqual(keys(en).sort());
  });

  it("menerjemahkan kontak, placeholder, dan label tanpa mengubah salinan Inggris", () => {
    const bahasa = render(<ContactPage />, "id");
    expect(bahasa).toContain("Telepon Kami");
    expect(bahasa).toContain('placeholder="Nama"');
    expect(bahasa).toContain("Ceritakan proyek Anda...");
    expect(bahasa).not.toMatch(/Call Us|Email Address|Follow Us|Visit Our Studio|Tell us about/);
    const english = render(<ContactPage />, "en");
    expect(english).toContain("Call Us");
    expect(english).toContain('placeholder="Name"');
    expect(english).toContain("Visit Our Studio");
  });

  it("menerjemahkan tentang kami, klien, dan status kosong portofolio", () => {
    const bahasa = render(<><AboutPage /><ClientsSection /><PortfolioContent projects={[]} categoryOptions={[]} locale="id" /></>, "id");
    expect(bahasa).toContain("Manajemen");
    expect(bahasa).toContain("Klien Kami");
    expect(bahasa).toContain("Pengembangan TI");
    expect(bahasa).toContain("Portofolio Sedang Diperbarui");
    expect(bahasa).not.toMatch(/Our Client|Management|PURPOSE|ACTION|Excellence|People-First/);
    const english = render(<ClientsSection />, "en");
    expect(english).toContain("Our Client");
  });

  it("memakai tombol tema yang sama dengan label lokal pada desktop dan seluler", () => {
    const desktop = render(<ThemeToggle />, "id");
    const mobile = render(<ThemeToggle className="w-full" />, "id");
    expect(desktop).toContain('class="theme-toggle"');
    expect(mobile).toContain('class="theme-toggle w-full"');
    expect(desktop).toContain('aria-label="Beralih ke mode gelap"');
    expect(desktop).toContain("Mode Gelap");
    expect(render(<ThemeToggle />, "en")).toContain("Dark Mode");
  });
});

describe("satu sumber status tema", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("memberi tahu semua kontrol saat tema disimpan atau dipulihkan", () => {
    vi.stubGlobal("document", { documentElement: { dataset: { theme: "light" } } });
    const storage = { getItem: vi.fn(() => "dark"), setItem: vi.fn() };
    vi.stubGlobal("window", { localStorage: storage });
    const listener = vi.fn();
    const unsubscribe = subscribeTheme(listener);
    applyTheme(getStoredTheme());
    expect(getTheme()).toBe("dark");
    setTheme("light");
    expect(getTheme()).toBe("light");
    expect(storage.setItem).toHaveBeenCalledWith("violet-theme", "light");
    expect(listener).toHaveBeenCalledTimes(2);
    unsubscribe();
    applyTheme("dark");
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("tetap berfungsi jika penyimpanan browser ditolak", () => {
    vi.stubGlobal("document", { documentElement: { dataset: { theme: "light" } } });
    vi.stubGlobal("window", { get localStorage() { throw new Error("blocked"); } });
    expect(getStoredTheme()).toBe("light");
    expect(() => setTheme("dark")).not.toThrow();
    expect(getTheme()).toBe("dark");
  });
});
