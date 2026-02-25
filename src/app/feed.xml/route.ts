import { blogPosts } from "@/lib/blog";

export async function GET() {
  const baseUrl = "https://formguard.strivio.world";
  const rssHeader = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>FormGuard Blog</title>
  <link>${baseUrl}/blog</link>
  <description>Latest news, guides, and insights from the FormGuard team on form handling, AI, and edge computing.</description>
  <language>en-us</language>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />`;

  const rssItems = blogPosts
    .map((post) => {
      return `
  <item>
    <title>${post.title}</title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <description>${post.description}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <guid>${baseUrl}/blog/${post.slug}</guid>
    <category>${post.category}</category>
  </item>`;
    })
    .join("");

  const rssFooter = `
</channel>
</rss>`;

  const rssFeed = rssHeader + rssItems + rssFooter;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
