import "server-only";
import postsData from "@/lib/generated/posts.json";

export type Post = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  category?: string;
  tags?: string[];
  content: string;
  readingTime: string;
};

type RawPost = {
  slug: string;
  title: string;
  date: string | null;
  description: string | null;
  category: string | null;
  tags: string[];
  content: string;
  readingTime: string;
};

function normalize(p: RawPost): Post {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date ?? undefined,
    description: p.description ?? undefined,
    category: p.category ?? undefined,
    tags: p.tags ?? [],
    content: p.content,
    readingTime: p.readingTime,
  };
}

export function getBlogPosts(): Post[] {
  const raw = (postsData as any).posts as RawPost[];
  return raw.map(normalize);
}

export function getBlogPost(slug: string): Post | null {
  const raw = (postsData as any).posts as RawPost[];
  const found = raw.find((p) => p.slug === slug);
  return found ? normalize(found) : null;
}
