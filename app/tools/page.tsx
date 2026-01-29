"use client";

import { useMemo, useState } from "react";

type Tool = "titles" | "meta" | "outline";

type Result = {
  ok: boolean;
  data?: any;
  error?: string;
};

export default function ToolsPage() {
  const [tool, setTool] = useState<Tool>("titles");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [audience, setAudience] = useState("Beginners and site owners");
  const [tone, setTone] = useState("Clear, practical, non-hype");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const placeholder = useMemo(() => {
    if (tool === "titles") return "e.g., Google AI Overviews optimization";
    if (tool === "meta") return "e.g., E-E-A-T checklist for local businesses";
    return "e.g., Topical authority internal linking";
  }, [tool]);

  async function run() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, topic, keywords, audience, tone }),
      });
      const json = await res.json();
      setResult(json);
    } catch (e: any) {
      setResult({ ok: false, error: e?.message ?? "Request failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">AI SEO Tools</h1>
      <p className="max-w-2xl text-slate-700">
        Generate SEO assets (titles, meta, outlines). This runs on the server via your OpenAI API key.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          onClick={() => setTool("titles")}
          className={`rounded-lg border p-4 text-left hover:bg-slate-50 ${tool === "titles" ? "border-slate-900" : ""}`}
        >
          <div className="font-semibold">Title Ideas</div>
          <div className="text-sm text-slate-700">10 SEO-friendly titles.</div>
        </button>
        <button
          onClick={() => setTool("meta")}
          className={`rounded-lg border p-4 text-left hover:bg-slate-50 ${tool === "meta" ? "border-slate-900" : ""}`}
        >
          <div className="font-semibold">Yoast Meta</div>
          <div className="text-sm text-slate-700">Meta title + description.</div>
        </button>
        <button
          onClick={() => setTool("outline")}
          className={`rounded-lg border p-4 text-left hover:bg-slate-50 ${tool === "outline" ? "border-slate-900" : ""}`}
        >
          <div className="font-semibold">Outline</div>
          <div className="text-sm text-slate-700">H1/H2/H3 structure.</div>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium">Topic</span>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={placeholder}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Keywords (comma separated)</span>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., AI Overviews, SGE, zero-click"
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Audience</span>
            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Tone</span>
            <input
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <button
            onClick={run}
            disabled={loading || !topic.trim()}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Generating…" : "Generate"}
          </button>
          <div className="text-xs text-slate-600">
            Setup required on Vercel: add <code>OPENAI_API_KEY</code> as an Environment Variable.
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="mb-2 text-sm font-semibold">Result</div>
          {!result && <div className="text-sm text-slate-600">No output yet.</div>}
          {result && !result.ok && (
            <div className="text-sm text-red-700">
              Error: {result.error ?? "Unknown error"}
            </div>
          )}
          {result && result.ok && (
            <pre className="overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
{JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
