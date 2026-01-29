import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";

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
      <body className="min-h-screen bg-[#0b0f14] text-[#c9d1d9]">
        <header className="sticky top-0 z-50 border-b border-[#1f2630] bg-[#0b0f14]/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white">
              <LogoMark className="shrink-0" />
              <span>SEO Journal AI</span>
            </Link>
            <nav className="flex flex-wrap items-center gap-4 text-sm text-[#8b949e]">
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <Link href="/guides" className="hover:text-white">
                Guides
              </Link>
              <Link href="/categories" className="hover:text-white">
                Categories
              </Link>
              <Link href="/search" className="rounded-md border border-[#1f2630] bg-[#0d1117] px-3 py-1.5 text-[#c9d1d9] hover:border-[#30363d] hover:text-white">
                Search
              </Link>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="border-t border-[#1f2630] bg-[#0b0f14]">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 text-sm text-[#8b949e] md:grid-cols-3">
            <div>
              <div className="font-medium text-white">SEO Journal AI</div>
              <div className="mt-1">Modern SEO guides for the AI search era.</div>
            </div>
            <div>
              <div className="font-medium text-white">Company</div>
              <div className="mt-2 flex flex-col gap-1">
                <Link href="/about" className="hover:text-white">About</Link>
                <Link href="/contact" className="hover:text-white">Contact</Link>
                <Link href="/editorial-policy" className="hover:text-white">Editorial Policy</Link>
                <Link href="/privacy" className="hover:text-white">Privacy</Link>
              </div>
            </div>
            <div>
              <div className="font-medium text-white">Feeds</div>
              <div className="mt-2 flex flex-col gap-1">
                <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
                <a href="/rss.xml" className="hover:text-white">RSS</a>
              </div>
            </div>
            <div className="md:col-span-3">© {new Date().getFullYear()} SEO Journal AI</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
