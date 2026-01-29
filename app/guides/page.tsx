import Link from "next/link";

const guides = [
  {
    slug: "ai-overviews",
    title: "Google AI Overviews (SGE): What Changed",
    desc: "How AI summaries affect traffic, rankings, and content structure.",
  },
  {
    slug: "eeat",
    title: "E‑E‑A‑T: Proving Trust in 2026",
    desc: "Experience + expertise signals that differentiate you from AI content.",
  },
  {
    slug: "topical-authority",
    title: "Topical Authority & Internal Linking",
    desc: "Build clusters and a semantic web Google can understand.",
  },
];

export default function GuidesIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Guides</h1>
      <p className="max-w-2xl text-slate-700">
        Practical, evergreen guides for SEO in the AI era.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-lg border p-5 hover:bg-slate-50">
            <div className="font-semibold">{g.title}</div>
            <div className="mt-1 text-sm text-slate-700">{g.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
