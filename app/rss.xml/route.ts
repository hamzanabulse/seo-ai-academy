import { getBlogPosts } from "@/lib/content";

export const runtime = "nodejs";

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const posts = getBlogPosts();

  const items = posts
    .map((p) => {
      const link = `${siteUrl}/blog/${p.slug}`;
      return `
  <item>
    <title>${esc(p.title)}</title>
    <link>${esc(link)}</link>
    <guid>${esc(link)}</guid>
    <pubDate>${new Date(p.date ?? Date.now()).toUTCString()}</pubDate>
    <description>${esc(p.description ?? "")}</description>
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>SEO Journal AI</title>
  <link>${esc(siteUrl)}</link>
  <description>Modern SEO guides for the AI search era.</description>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
