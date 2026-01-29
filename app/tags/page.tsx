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
            className="rounded-full border border-[#30363d] bg-[#161b22] px-3 py-1 text-sm text-[#c9d1d9] hover:text-white"
          >
            {t.name} <span className="text-slate-600">({t.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
