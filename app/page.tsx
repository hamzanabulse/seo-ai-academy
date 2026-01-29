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
      <section className="relative overflow-hidden rounded-2xl border border-[#1f2630] bg-[#0d1117] p-8">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{
          background:
            "radial-gradient(700px circle at 20% 20%, rgba(88,166,255,0.25), transparent 45%)",
        }} />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1f2630] bg-[#0b0f14] px-3 py-1 text-xs text-[#8b949e]">
            Minimal Premium • SEO + AI Search
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white">SEO Journal AI</h1>
          <p className="max-w-2xl text-[#c9d1d9]">
            Modern SEO guides for the AI search era — AI Overviews, zero‑click behavior, semantic search,
            E‑E‑A‑T, and topical authority.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-md bg-[#58a6ff] px-4 py-2 text-sm font-semibold text-[#0b0f14] hover:opacity-90"
            >
              Read the Blog
            </Link>
            <Link
              href="/guides"
              className="rounded-md border border-[#1f2630] bg-[#0b0f14] px-4 py-2 text-sm font-semibold text-white hover:border-[#30363d]"
            >
              Browse Guides
            </Link>
            <Link
              href="/categories"
              className="rounded-md border border-[#1f2630] bg-[#0b0f14] px-4 py-2 text-sm font-semibold text-white hover:border-[#30363d]"
            >
              Categories
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featured.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card rounded-lg p-5"
          >
            <div className="text-xs text-[#8b949e]">{p.category ?? "SEO"}</div>
            <div className="mt-1 text-base font-semibold text-white">{p.title}</div>
            <div className="mt-2 text-sm text-[#c9d1d9]">{p.description}</div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-white">Latest</h2>
            <Link className="text-sm text-[#c9d1d9] hover:text-white" href="/blog">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {latest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card block rounded-lg p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-semibold text-white">{p.title}</div>
                  <div className="text-xs text-[#8b949e]">{p.readingTime}</div>
                </div>
                <div className="mt-1 text-sm text-[#c9d1d9]">{p.description}</div>
                <div className="mt-2 text-xs text-[#8b949e]">
                  {p.category ?? "SEO"} · {p.date}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card rounded-lg p-5">
            <h3 className="font-semibold text-white">Categories</h3>
            <div className="mt-3 space-y-2">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  href={`/categories/${encodeURIComponent(c.name)}`}
                  className="flex items-center justify-between text-sm text-[#c9d1d9] hover:text-white"
                >
                  <span>{c.name}</span>
                  <span className="text-[#8b949e]">{c.count}</span>
                </Link>
              ))}
              <Link href="/categories" className="mt-2 inline-block text-sm text-[#c9d1d9] hover:text-white">
                View all categories
              </Link>
            </div>
          </div>

          <div className="card rounded-lg p-5">
            <h3 className="font-semibold text-white">Start here</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#c9d1d9]">
              <li>
                <Link href="/guides/ai-overviews" className="text-[#c9d1d9] hover:text-white">
                  AI Overviews (SGE)
                </Link>
              </li>
              <li>
                <Link href="/guides/eeat" className="text-[#c9d1d9] hover:text-white">
                  E‑E‑A‑T
                </Link>
              </li>
              <li>
                <Link href="/guides/topical-authority" className="text-[#c9d1d9] hover:text-white">
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
