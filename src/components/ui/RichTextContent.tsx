import type { ReactNode } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { RichText } from "@/types";

type RichTextContentProps = {
  /** String markdown-lite atau array blok Portable Text. Lihat `RichText`. */
  value?: RichText | null;
  /** Dirender hanya ketika `value` benar-benar kosong. */
  fallback?: ReactNode;
  /** Pembungkus opsional, mis. kelas `prose` untuk konten Portable Text. */
  className?: string;
  /** Override komponen Portable Text bila halaman butuh gaya khusus. */
  components?: PortableTextComponents;
};

/**
 * Cek apakah `RichText` berisi konten. String yang hanya berisi spasi dan array
 * kosong dianggap belum diisi, sehingga fallback (deskripsi/preset) yang dipakai.
 */
export function hasRichText(value: RichText | null | undefined): value is RichText {
  if (typeof value === "string") return value.trim().length > 0;
  return Array.isArray(value) && value.length > 0;
}

function markdownLiteNodes(value: string): ReactNode[] {
  return value.split(/\r?\n/).map((line, index) => {
    if (line.startsWith("### ")) return <h3 key={index}>{line.slice(4)}</h3>;
    if (line.startsWith("## ")) return <h2 key={index}>{line.slice(3)}</h2>;
    if (line.startsWith("# ")) return <h1 key={index}>{line.slice(2)}</h1>;
    return line.trim() ? <p key={index}>{line}</p> : null;
  });
}

/**
 * Renderer tunggal untuk `RichText`: array dirender lewat `<PortableText>`,
 * string dirender sebagai markdown-lite (`# `/`## `/`### ` menjadi heading,
 * baris lain menjadi paragraf) sesuai `docs/sanity-migration/content-editing.md`.
 * `fallback` hanya muncul saat konten tidak diisi, supaya konten string tidak
 * pernah tertimpa deskripsi/preset.
 */
export function RichTextContent({ value, fallback = null, className, components }: RichTextContentProps) {
  if (!hasRichText(value)) return <>{fallback}</>;

  const body = Array.isArray(value) ? (
    <PortableText value={value} components={components} />
  ) : (
    markdownLiteNodes(value)
  );

  return className ? <div className={className}>{body}</div> : <>{body}</>;
}
