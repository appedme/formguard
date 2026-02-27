import { blogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ChevronLeft, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} — FormGuard Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (same category, different slug)
  const related = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/10">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <Link href="/blog" className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest gap-1.5">
            <ChevronLeft className="w-3.5 h-3.5" />
            All Articles
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Article Header */}
        <header className="mb-14">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20 text-[9px] uppercase font-black tracking-widest">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-8 leading-[1.1]">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 pb-8 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{post.author}</p>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </div>
          </div>
        </header>

        {/* Article Body with Tailwind Typography */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-foreground/80 prose-p:leading-[1.8] prose-p:mb-6
            prose-li:text-foreground/80 prose-li:mb-2 prose-li:leading-relaxed
            prose-a:text-primary prose-a:underline prose-a:underline-offset-4
            prose-strong:text-foreground prose-strong:font-bold
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono
            prose-pre:bg-zinc-950 prose-pre:text-zinc-300 prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/5 prose-pre:shadow-xl
            prose-ul:my-6 prose-ol:my-6
            prose-blockquote:border-primary/30 prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-1
            [&_.lead]:text-xl [&_.lead]:text-foreground/70 [&_.lead]:leading-relaxed [&_.lead]:font-medium [&_.lead]:mb-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border/40">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group p-6 border border-border/40 rounded-2xl hover:border-primary/30 transition-all">
                  <Badge variant="secondary" className="text-[8px] uppercase tracking-widest font-black mb-3">{r.category}</Badge>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                    {r.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-mono">{r.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <footer className="mt-20 pt-10 border-t border-border/40">
          <div className="bg-foreground text-background rounded-3xl p-10 md:p-14 text-center">
            <h3 className="text-2xl font-black mb-4">Ready to build smarter forms?</h3>
            <p className="text-background/60 mb-8 max-w-md mx-auto text-sm">
              Join thousands of developers using FormGuard to capture, protect, and analyze form submissions at the edge.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center px-8 py-3 bg-background text-foreground rounded-full text-sm font-black hover:scale-105 transition-transform"
            >
              Get Started Free
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
