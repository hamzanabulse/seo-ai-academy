import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { getCategories } from "@/lib/taxonomy";

export default function Home() {
  const posts = getBlogPosts();
  const featured = posts.slice(0, 3);
  const latest = posts.slice(0, 8);
  const categories = getCategories().slice(0, 6);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">SEO Journal AI</h1>
        <p className="max-w-2xl text-slate-700">
          Modern SEO guides for the AI search era — AI Overviews, zero‑click behavior, semantic search,
          E‑E‑A‑T, and topical authority.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Read the Blog
          </Link>
          <Link
            href="/guides"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium"
          >
            Browse Guides
          </Link>
          <Link
            href="/courses"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium"
          >
            Courses
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featured.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-lg border p-5 hover:bg-slate-50"
          >
            <div className="text-xs text-slate-600">{p.category ?? "SEO"}</div>
            <div className="mt-1 text-base font-semibold">{p.title}</div>
            <div className="mt-2 text-sm text-slate-700">{p.description}</div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Latest</h2>
            <Link className="text-sm text-slate-700 hover:underline" href="/blog">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {latest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block rounded-lg border p-5 hover:bg-slate-50"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-xs text-slate-600">{p.readingTime}</div>
                </div>
                <div className="mt-1 text-sm text-slate-700">{p.description}</div>
                <div className="mt-2 text-xs text-slate-600">
                  {p.category ?? "SEO"} · {p.date}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Categories</h3>
            <div className="mt-3 space-y-2">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  href={`/categories/${encodeURIComponent(c.name)}`}
                  className="flex items-center justify-between text-sm hover:underline"
                >
                  <span>{c.name}</span>
                  <span className="text-slate-600">{c.count}</span>
                </Link>
              ))}
              <Link href="/categories" className="mt-2 inline-block text-sm hover:underline">
                View all categories
              </Link>
            </div>
          </div>

          <div className="rounded-lg border bg-slate-50 p-5">
            <h3 className="font-semibold">Start here</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                <Link href="/guides/ai-overviews" className="hover:underline">
                  AI Overviews (SGE)
                </Link>
              </li>
              <li>
                <Link href="/guides/eeat" className="hover:underline">
                  E‑E‑A‑T
                </Link>
              </li>
              <li>
                <Link href="/guides/topical-authority" className="hover:underline">
                  Topical authority & internal linking
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
