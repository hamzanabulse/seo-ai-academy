import { getBlogPosts, type Post } from "@/lib/content";

export function searchPosts(query: string, posts: Post[] = getBlogPosts()) {
  const q = query.trim().toLowerCase();
  if (!q) return posts;
  return posts.filter((p) => {
    const hay = `${p.title} ${p.description ?? ""} ${(p.tags ?? []).join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}
