import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { mdToHtml } from "@/lib/markdown";
import { getPrevNext, getRelatedPosts } from "@/lib/related";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) return notFound();

  const html = await mdToHtml(post.content);
  const related = getRelatedPosts(post, 6);
  const { prev, next } = getPrevNext(post);

  return (
    <div className="space-y-10">
      <article className="prose max-w-none">
        <h1>{post.title}</h1>
        <p className="text-sm text-[#8b949e]">
          {(post.category ?? "SEO")} · {post.date} · {post.readingTime}
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      {(prev || next) && (
        <nav className="grid gap-3 md:grid-cols-2">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="card rounded-lg p-5">
              <div className="text-xs text-[#8b949e]">Previous</div>
              <div className="mt-1 font-semibold text-white">{prev.title}</div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="card rounded-lg p-5">
              <div className="text-xs text-[#8b949e]">Next</div>
              <div className="mt-1 font-semibold text-white">{next.title}</div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">Related articles</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card rounded-lg p-5">
                <div className="text-xs text-[#8b949e]">{p.category ?? "SEO"}</div>
                <div className="mt-1 font-semibold text-white">{p.title}</div>
                <div className="mt-2 text-sm text-[#c9d1d9]">{p.description}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
