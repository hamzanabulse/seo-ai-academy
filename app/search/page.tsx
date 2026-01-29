import Link from "next/link";
import { getBlogPosts } from "@/lib/content";

function searchPosts(query: string) {
  const posts = getBlogPosts();
  const q = (query ?? "").trim().toLowerCase();
  if (!q) return posts;
  return posts.filter((p) => {
    const hay = `${p.title} ${p.description ?? ""} ${(p.tags ?? []).join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams?.q ?? "";
  const results = searchPosts(q);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Search</h1>

      <form action="/search" method="GET" className="flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search articles…"
          className="w-full rounded-md border px-3 py-2"
        />
        <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Search
        </button>
      </form>

      <div className="text-sm text-slate-600">{results.length} results</div>

      <div className="space-y-3">
        {results.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-lg border p-5 hover:bg-slate-50"
          >
            <div className="font-semibold">{p.title}</div>
            <div className="mt-1 text-sm text-slate-700">{p.description}</div>
          </Link>
        ))}
        {results.length === 0 && <div className="text-sm text-slate-600">No results.</div>}
      </div>
    </div>
  );
}
