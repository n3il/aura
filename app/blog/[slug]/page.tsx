import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Aura Fields Foundation",
    };
  }

  return {
    title: `${post.title} | Aura Fields Foundation`,
    description: post.excerpt,
  };
}

function parseContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactElement[] = [];
  let currentParagraph: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={elements.length} className="text-muted leading-relaxed mb-6">
            {parseInlineFormatting(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={elements.length}
          className="list-disc list-inside text-muted space-y-2 mb-6 ml-4"
        >
          {listItems.map((item, i) => (
            <li key={i}>{parseInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const parseInlineFormatting = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(remaining.slice(0, boldMatch.index));
        }
        parts.push(
          <strong key={key++} className="text-foreground font-medium">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      } else {
        parts.push(remaining);
        break;
      }
    }

    return parts.length === 1 ? parts[0] : parts;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2
          key={elements.length}
          className="text-2xl font-semibold mt-12 mb-6 text-foreground"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3
          key={elements.length}
          className="text-xl font-semibold mt-8 mb-4 text-foreground"
        >
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      flushParagraph();
      inList = true;
      listItems.push(trimmed.slice(2));
    } else if (trimmed === "") {
      flushParagraph();
      if (inList) {
        flushList();
      }
    } else {
      if (inList) {
        flushList();
      }
      currentParagraph.push(trimmed);
    }
  }

  flushParagraph();
  flushList();

  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Insights
          </Link>

          <div className="flex items-center gap-4 mb-6">
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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-muted leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 pb-8 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <span className="text-white font-semibold">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-muted">Director, Aura Fields Foundation</p>
            </div>
          </div>
        </header>

        <div className="prose-custom">{parseContent(post.content)}</div>

        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-sm text-muted mb-1">Written by</p>
              <p className="font-medium">{post.author}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted mb-1">Published</p>
              <p className="font-medium">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Continue Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="card-hover p-6 rounded-xl border border-border bg-background block group"
                  >
                    <span className="text-sm text-gold font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold mt-2 mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </footer>
      </article>
    </div>
  );
}
