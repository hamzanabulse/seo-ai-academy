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
          className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-[#c9d1d9] placeholder:text-[#8b949e]"
        />
        <button className="rounded-md bg-[#238636] px-4 py-2 text-sm font-medium text-white hover:bg-[#2ea043]">
          Search
        </button>
      </form>

      <div className="text-sm text-[#8b949e]">{results.length} results</div>

      <div className="space-y-3">
        {results.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card block rounded-lg p-5"
          >
            <div className="font-semibold text-white">{p.title}</div>
            <div className="mt-1 text-sm text-[#c9d1d9]">{p.description}</div>
          </Link>
        ))}
        {results.length === 0 && <div className="text-sm text-[#8b949e]">No results.</div>}
      </div>
    </div>
  );
}
