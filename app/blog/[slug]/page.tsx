import { getBlogPost, getBlogPosts } from "@/lib/content";
import { mdToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) return notFound();

  const html = await mdToHtml(post.content);

  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>
      <p className="text-sm text-slate-600">
        {post.date} · {post.readingTime}
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
