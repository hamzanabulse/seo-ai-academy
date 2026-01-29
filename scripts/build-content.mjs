import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const OUT_DIR = path.join(ROOT, "lib", "generated");
const OUT_FILE = path.join(OUT_DIR, "posts.json");

if (!fs.existsSync(CONTENT_DIR)) {
  console.error("Missing content/blog directory");
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

const posts = files.map((f) => {
  const slug = path.basename(f, ".md");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? null,
    description: data.description ?? null,
    category: data.category ?? null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
    readingTime: rt.text,
  };
});

posts.sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));

fs.writeFileSync(OUT_FILE, JSON.stringify({ posts }, null, 2));
console.log(`Wrote ${posts.length} posts to ${path.relative(ROOT, OUT_FILE)}`);
