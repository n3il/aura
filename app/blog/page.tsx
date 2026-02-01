import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "Insights | Aura Fields Foundation",
  description:
    "Expert perspectives on financial technology, market analysis, and community building from the Aura Fields Foundation.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-6">
            Insights
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Perspectives on Financial Technology
          </h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            Opinements and other content on emerging financial
            technologies, market dynamics, and building inclusive communities.
          </p>
        </header>

        <div className="space-y-12">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className={`card-hover p-8 rounded-2xl border border-border bg-background ${
                index === 0 ? "md:p-12" : ""
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gold font-medium">
                  {post.category}
                </span>
                <span className="text-muted text-sm">•</span>
                <time className="text-sm text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-muted text-sm">•</span>
                <span className="text-sm text-muted">{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2
                  className={`font-semibold tracking-tight leading-tight mb-4 group-hover:text-gold transition-colors ${
                    index === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {post.title}
                </h2>
              </Link>
              <p className="text-muted leading-relaxed mb-6">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">By {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gold font-medium inline-flex items-center gap-2 hover:gap-3 transition-all text-sm"
                >
                  Read Article
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-2xl bg-accent text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Stay Informed</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Join our community to receive updates on new insights, upcoming
            workshops, and speaking events.
          </p>
          <Link
            href="/#pillars"
            className="inline-flex px-6 py-3 bg-white text-accent rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Learn How to Get Involved
          </Link>
        </div>
      </div>
    </div>
  );
}
