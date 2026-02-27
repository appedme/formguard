import { blogPosts } from "@/lib/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ChevronRight, Clock, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — FormGuard | Insights on Forms, AI, and Edge Computing",
  description: "Deep dives into form security, AI-powered automation, edge computing, and the future of web submissions. Guides, tutorials, and product updates.",
  openGraph: {
    title: "FormGuard Blog",
    description: "Insights on modern form handling, AI, and edge computing.",
  },
};

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-20 border-b border-border/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-black">Engineering Blog</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-4 leading-tight">
            Insights &<br /><span className="text-muted-foreground">Deep Dives</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Form security, AI automation, edge computing, and developer experience — from the team building FormGuard.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-16 border-b border-border/40">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8">Featured Article</p>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-12 flex items-center justify-center aspect-[4/3] lg:aspect-auto lg:h-80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_70%)]" />
                  <div className="text-center relative z-10">
                    <div className="text-6xl font-black text-primary/20 mb-4">FG</div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase font-black tracking-widest">
                      {featured.category}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black">
                      {featured.author.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-foreground">{featured.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-10">All Articles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="h-full flex flex-col border border-border/40 rounded-2xl overflow-hidden bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all">
                  {/* Category Color Banner */}
                  <div className="h-1.5 bg-gradient-to-r from-primary/60 to-primary/20" />
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-[9px] uppercase font-black tracking-widest bg-muted/50">
                        {post.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-black tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/40">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-black text-muted-foreground">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">{post.author}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
