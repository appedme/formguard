import { blogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
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

  return (
    <article className="py-24 px-6 md:px-10 max-w-3xl mx-auto w-full">
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to blog
      </Link>

      <header className="mb-12">
        <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
          {post.category}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post.author}
          </span>
        </div>
      </header>

      <div 
        className="prose prose-slate dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-muted-foreground prose-li:mb-2"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-20 pt-10 border-t border-border/40">
        <div className="bg-muted/30 rounded-3xl p-8 md:p-10 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">Want more like this?</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Subscribe to our newsletter to get the latest updates on form security and AI delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 rounded-full bg-background border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 max-w-xs"
            />
            <Button className="rounded-full px-8">Subscribe</Button>
          </div>
        </div>
      </footer>
    </article>
  );
}
