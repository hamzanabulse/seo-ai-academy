import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

type Tool = "titles" | "meta" | "outline";

type Body = {
  tool: Tool;
  topic: string;
  keywords?: string;
  audience?: string;
  tone?: string;
};

function toKeywordsArray(keywords?: string) {
  return (keywords ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, error: "Missing OPENAI_API_KEY. Add it in Vercel → Project → Settings → Environment Variables." },
      { status: 400 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const tool = body.tool;
  const topic = (body.topic ?? "").trim();
  const audience = (body.audience ?? "").trim();
  const tone = (body.tone ?? "").trim();
  const kws = toKeywordsArray(body.keywords);

  if (!tool || !topic) {
    return NextResponse.json({ ok: false, error: "Missing tool/topic" }, { status: 400 });
  }

  const client = new OpenAI({ apiKey: key });

  const system =
    "You are an expert SEO strategist in 2026. Output must be concise, actionable, and optimized for AI Overviews and traditional SERPs.";

  let prompt = "";
  let schemaHint = "";

  if (tool === "titles") {
    prompt = `Generate 10 SEO-friendly blog post titles about: "${topic}".\n\nAudience: ${audience || "General"}\nTone: ${tone || "Clear"}\nKeywords to include when natural: ${kws.join(", ") || "(none)"}\n\nRules:\n- Titles should be 45–65 characters when possible.\n- Avoid clickbait.\n- Mix formats (how-to, checklist, comparison, playbook).`;
    schemaHint = `Return JSON: {"titles": string[]}`;
  } else if (tool === "meta") {
    prompt = `Write Yoast-ready SEO meta for a page about: "${topic}".\n\nAudience: ${audience || "General"}\nTone: ${tone || "Clear"}\nKeywords: ${kws.join(", ") || "(none)"}\n\nRules:\n- Meta title: <= 60 characters, include primary keyword early.\n- Meta description: 145–160 chars, compelling but not spammy.`;
    schemaHint = `Return JSON: {"metaTitle": string, "metaDescription": string, "focusKeyword": string}`;
  } else if (tool === "outline") {
    prompt = `Create an SEO outline for a blog post about: "${topic}".\n\nAudience: ${audience || "General"}\nTone: ${tone || "Clear"}\nKeywords: ${kws.join(", ") || "(none)"}\n\nRules:\n- Return H1 + H2/H3 structure.\n- Include an FAQ section (3–5 questions).\n- Optimize for AI Overviews: start with a short direct answer section.`;
    schemaHint = `Return JSON: {"h1": string, "sections": [{"h2": string, "h3": string[]}], "faq": string[]}`;
  } else {
    return NextResponse.json({ ok: false, error: "Unknown tool" }, { status: 400 });
  }

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      { role: "system", content: system },
      { role: "user", content: prompt + "\n\n" + schemaHint },
    ],
    temperature: 0.4,
  });

  const text = response.output_text?.trim() ?? "";

  // Best-effort JSON parse
  try {
    const data = JSON.parse(text);
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: true, data: { raw: text } });
  }
}
