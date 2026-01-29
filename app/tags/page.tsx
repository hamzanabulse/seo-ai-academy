import Link from "next/link";
import { getTags, slugifyTag } from "@/lib/taxonomy";

export default function TagsPage() {
  const tags = getTags();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Tags</h1>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link
            key={t.name}
            href={`/tags/${slugifyTag(t.name)}`}
            className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
          >
            {t.name} <span className="text-slate-600">({t.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
