import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RichTextContent } from "@/components/ui/RichTextContent";
import type { RichText } from "@/types";

const portableContent: RichText = [
  {
    _type: "block",
    _key: "heading",
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: "heading-span", text: "Portable Heading", marks: [] }],
  },
  {
    _type: "block",
    _key: "paragraph",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "paragraph-span", text: "Portable paragraph body.", marks: [] }],
  },
];

describe("RichTextContent", () => {
  it("merender blok Portable Text lewat PortableText", () => {
    const html = renderToStaticMarkup(<RichTextContent value={portableContent} />);

    expect(html).toContain("<h2>Portable Heading</h2>");
    expect(html).toContain("<p>Portable paragraph body.</p>");
  });

  it("merender string markdown-lite sebagai heading dan paragraf", () => {
    const html = renderToStaticMarkup(
      <RichTextContent value={"# Judul\n\n## Subjudul\n\n### Sub-subjudul\n\nParagraf isi."} />,
    );

    expect(html).toContain("<h1>Judul</h1>");
    expect(html).toContain("<h2>Subjudul</h2>");
    expect(html).toContain("<h3>Sub-subjudul</h3>");
    expect(html).toContain("<p>Paragraf isi.</p>");
  });

  it("memakai fallback saat konten hilang atau kosong", () => {
    const fallback = <p>Fallback konten</p>;

    expect(renderToStaticMarkup(<RichTextContent value={undefined} fallback={fallback} />)).toContain("Fallback konten");
    expect(renderToStaticMarkup(<RichTextContent value={null} fallback={fallback} />)).toContain("Fallback konten");
    expect(renderToStaticMarkup(<RichTextContent value={""} fallback={fallback} />)).toContain("Fallback konten");
    expect(renderToStaticMarkup(<RichTextContent value={"  \n  "} fallback={fallback} />)).toContain("Fallback konten");
    expect(renderToStaticMarkup(<RichTextContent value={[]} fallback={fallback} />)).toContain("Fallback konten");
  });

  it("tidak merender apa pun (tanpa error) bila konten kosong dan tanpa fallback", () => {
    expect(renderToStaticMarkup(<RichTextContent value={undefined} />)).toBe("");
    expect(renderToStaticMarkup(<RichTextContent value={""} />)).toBe("");
    expect(renderToStaticMarkup(<RichTextContent value={[]} />)).toBe("");
  });
});
