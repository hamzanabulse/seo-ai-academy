import { getBlogPosts, type Post } from "@/lib/content";

export function getRelatedPosts(current: Post, limit = 6): Post[] {
  const posts = getBlogPosts().filter((p) => p.slug !== current.slug);
  const curTags = new Set((current.tags ?? []).map((t) => t.toLowerCase()));

  const scored = posts
    .map((p) => {
      let score = 0;
      if ((p.category ?? "") === (current.category ?? "")) score += 3;
      for (const t of p.tags ?? []) {
        if (curTags.has(t.toLowerCase())) score += 1;
      }
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || (b.p.date ?? "").localeCompare(a.p.date ?? ""));

  return scored
    .filter((x) => x.score > 0)
    .slice(0, limit)
    .map((x) => x.p);
}

export function getPrevNext(current: Post): { prev: Post | null; next: Post | null } {
  const posts = getBlogPosts().filter((p) => (p.category ?? "") === (current.category ?? ""));
  const idx = posts.findIndex((p) => p.slug === current.slug);
  if (idx === -1) return { prev: null, next: null };
  const next = idx > 0 ? posts[idx - 1] : null; // newer
  const prev = idx < posts.length - 1 ? posts[idx + 1] : null; // older
  return { prev, next };
}
