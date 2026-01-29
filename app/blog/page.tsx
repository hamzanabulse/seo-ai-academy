import Link from "next/link";
import { getBlogPosts } from "@/lib/content";

export default function BlogIndex() {
  const posts = getBlogPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="max-w-2xl text-slate-700">
        Articles about SEO, AI search, and practical playbooks.
      </p>
      <div className="space-y-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-lg border p-5 hover:bg-slate-50">
            <div className="flex items-baseline justify-between gap-3">
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-slate-600">{p.readingTime}</div>
            </div>
            <div className="mt-1 text-sm text-slate-700">{p.description}</div>
            <div className="mt-2 text-xs text-slate-600">{p.category ?? "SEO"} · {p.date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
