import { getBlogPosts } from "@/lib/content";

export function getCategories() {
  const posts = getBlogPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    const c = (p.category ?? "Uncategorized").trim();
    map.set(c, (map.get(c) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getTags() {
  const posts = getBlogPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags ?? []) {
      const tag = t.trim();
      if (!tag) continue;
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getPostsByCategory(category: string) {
  const posts = getBlogPosts();
  return posts.filter((p) => (p.category ?? "Uncategorized") === category);
}

export function getPostsByTag(tag: string) {
  const posts = getBlogPosts();
  return posts.filter((p) => (p.tags ?? []).includes(tag));
}
