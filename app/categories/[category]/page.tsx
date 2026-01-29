import Link from "next/link";
import { getPostsByCategory } from "@/lib/taxonomy";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Category: {category}</h1>
      <div className="space-y-3">
        {posts.map((p) => (
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
          </Link>
        ))}
        {posts.length === 0 && <div className="text-sm text-slate-600">No posts yet.</div>}
      </div>
    </div>
  );
}
