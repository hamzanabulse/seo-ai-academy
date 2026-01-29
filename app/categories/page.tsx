import Link from "next/link";
import { getCategories } from "@/lib/taxonomy";

export default function CategoriesPage() {
  const cats = getCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Categories</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {cats.map((c) => (
          <Link
            key={c.name}
            href={`/categories/${encodeURIComponent(c.name)}`}
            className="card flex items-center justify-between rounded-lg p-5"
          >
            <span className="font-semibold text-white">{c.name}</span>
            <span className="text-sm text-[#8b949e]">{c.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
