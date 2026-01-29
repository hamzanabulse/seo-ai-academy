import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function CoursesPage() {
  const file = path.join(process.cwd(), "content", "courses", "seo-fundamentals.md");
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Courses</h1>
      <div className="rounded-lg border p-5">
        <div className="text-sm text-slate-600">Level: {(data.level as string) ?? ""}</div>
        <div className="mt-1 text-xl font-semibold">{(data.title as string) ?? ""}</div>
        <p className="mt-2 text-slate-700">{(data.description as string) ?? ""}</p>
        <h2 className="mt-4 font-semibold">Lessons</h2>
        <ul className="mt-2 list-disc pl-5 text-slate-700">
          {((data.lessons as string[]) ?? []).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className="mt-4 text-slate-700">{content.trim()}</p>
      </div>
    </div>
  );
}
