import { notFound } from "next/navigation";

const guideBySlug: Record<string, { title: string; body: string[] }> = {
  "ai-overviews": {
    title: "Google AI Overviews (SGE): What Changed",
    body: [
      "AI Overviews answer queries directly, often reducing clicks (zero‑click behavior).",
      "To be cited, write clearly structured answers: short definition, bullets, and supporting evidence.",
      "Prioritize experience and original insights: screenshots, tests, case studies.",
    ],
  },
  eeat: {
    title: "E‑E‑A‑T: Proving Trust in 2026",
    body: [
      "Experience is the differentiator: show you actually did the thing.",
      "Add author bios, references, and transparent editorial policies.",
      "Remove thin content: pruning improves overall site quality signals.",
    ],
  },
  "topical-authority": {
    title: "Topical Authority & Internal Linking",
    body: [
      "Choose a core topic, then build supporting pages that cover subtopics deeply.",
      "Use contextual internal links so Google understands relationships (your semantic web).",
      "Update older posts with new links to keep the cluster tight.",
    ],
  },
};

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guideBySlug[params.slug];
  if (!guide) return notFound();

  return (
    <article className="prose max-w-none">
      <h1>{guide.title}</h1>
      <ul>
        {guide.body.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </article>
  );
}
