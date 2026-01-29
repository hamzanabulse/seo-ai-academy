import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "SEO Journal AI",
    template: "%s | SEO Journal AI",
  },
  description: "SEO Journal AI: modern SEO guides for the AI search era.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              SEO Journal AI
            </Link>
            <nav className="flex flex-wrap gap-4 text-sm">
              <Link href="/guides" className="hover:underline">
                Guides
              </Link>
              <Link href="/courses" className="hover:underline">
                Courses
              </Link>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <Link href="/search" className="hover:underline">
                Search
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="border-t">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 py-8 text-sm text-slate-600 md:grid-cols-3">
            <div>
              <div className="font-medium text-slate-900">SEO Journal AI</div>
              <div className="mt-1">Modern SEO guides for the AI search era.</div>
            </div>
            <div>
              <div className="font-medium text-slate-900">Company</div>
              <div className="mt-2 flex flex-col gap-1">
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
                <Link href="/editorial-policy" className="hover:underline">Editorial Policy</Link>
                <Link href="/privacy" className="hover:underline">Privacy</Link>
              </div>
            </div>
            <div>
              <div className="font-medium text-slate-900">Feeds</div>
              <div className="mt-2 flex flex-col gap-1">
                <a href="/sitemap.xml" className="hover:underline">Sitemap</a>
                <a href="/rss.xml" className="hover:underline">RSS</a>
              </div>
            </div>
            <div className="md:col-span-3">© {new Date().getFullYear()} SEO Journal AI</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
