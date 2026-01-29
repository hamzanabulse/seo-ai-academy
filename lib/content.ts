import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Post = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
  content: string;
  readingTime: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMd(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [] as string[];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(full, f));
}

export function getBlogPosts(): Post[] {
  const files = readMd("blog");
  const posts = files.map((file) => {
    const slug = path.basename(file, ".md");
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: data.date as string | undefined,
      description: data.description as string | undefined,
      tags: (data.tags as string[]) ?? [],
      content,
      readingTime: rt.text,
    } satisfies Post;
  });

  return posts.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getBlogPost(slug: string): Post | null {
  const file = path.join(CONTENT_DIR, "blog", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: data.date as string | undefined,
    description: data.description as string | undefined,
    tags: (data.tags as string[]) ?? [],
    content,
    readingTime: rt.text,
  };
}
