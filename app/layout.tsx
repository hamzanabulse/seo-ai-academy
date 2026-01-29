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
            <nav className="flex gap-4 text-sm">
              <Link href="/guides" className="hover:underline">
                Guides
              </Link>
              <Link href="/courses" className="hover:underline">
                Courses
              </Link>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} SEO Journal AI
          </div>
        </footer>
      </body>
    </html>
  );
}
