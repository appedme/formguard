import { blogPosts } from "@/lib/blog";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest news, guides, and insights from the FormGuard team on form handling, AI, and edge computing.",
  openGraph: {
    title: "FormGuard Blog",
    description: "Insights on modern form handling and AI.",
  },
};

export default function BlogPage() {
  return (
    <div className="py-24 px-6 md:px-10 max-w-5xl mx-auto w-full">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Insights & Updates
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Deep dives into form security, AI-powered automation, and the future of web submissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden bg-card/50 border-border/60 hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/5">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 backdrop-blur-md">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center text-xs font-bold text-primary uppercase tracking-wider">
                    Read Article
                    <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
