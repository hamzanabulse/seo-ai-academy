import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">SEO, explained for the AI era.</h1>
        <p className="max-w-2xl text-slate-700">
          Learn modern SEO for 2026: AI Overviews, zero‑click behavior, semantic search, E‑E‑A‑T,
          and building topical authority.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/guides"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Start with Guides
          </Link>
          <Link
            href="/courses"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium"
          >
            View Courses
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card
          title="AI Overviews (SGE)"
          desc="How AI changes rankings, citations, and clicks."
          href="/guides/ai-overviews"
        />
        <Card title="E‑E‑A‑T" desc="Trust signals that matter in 2026." href="/guides/eeat" />
        <Card
          title="Topical Authority"
          desc="Clusters, internal linking, and semantic coverage."
          href="/guides/topical-authority"
        />
      </section>

      <section className="rounded-lg border bg-slate-50 p-6">
        <h2 className="text-lg font-semibold">Next steps</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          <li>We can add an AI toolbox (titles/meta/outlines) in phase 2.</li>
          <li>We can connect a CMS later (Sanity) if you want easy editing.</li>
          <li>Once deployed on Vercel, we can add a custom domain.</li>
        </ul>
      </section>
    </div>
  );
}

function Card({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link href={href} className="rounded-lg border p-5 hover:bg-slate-50">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm text-slate-700">{desc}</div>
    </Link>
  );
}
