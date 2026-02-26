import { blogPosts, BlogPost } from "@/lib/blog";

const baseUrl = "https://formguard.strivio.world";

export function generateRssFeed(feedPath: string = "feed.xml") {
  const rssHeader = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>FormGuard Blog</title>
  <link>${baseUrl}/blog</link>
  <description>Latest news, guides, and insights from the FormGuard team on form handling, AI, and edge computing.</description>
  <language>en-us</language>
  <atom:link href="${baseUrl}/${feedPath}" rel="self" type="application/rss+xml" />
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

  const rssItems = blogPosts
    .map((post) => {
      // Basic escaping for XML special characters is minimal here but recommended
      return `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <description><![CDATA[${post.description}]]></description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <guid>${baseUrl}/blog/${post.slug}</guid>
    <category>${post.category}</category>
  </item>`;
    })
    .join("");

  const rssFooter = `
</channel>
</rss>`;

  return rssHeader + rssItems + rssFooter;
}

export function generateJsonFeed() {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "FormGuard Blog",
    home_page_url: `${baseUrl}/blog`,
    feed_url: `${baseUrl}/feed.json`,
    description: "Latest news from FormGuard",
    items: blogPosts.map((post) => ({
      id: `${baseUrl}/blog/${post.slug}`,
      url: `${baseUrl}/blog/${post.slug}`,
      title: post.title,
      content_html: post.content,
      summary: post.description,
      date_published: new Date(post.date).toISOString(),
      author: {
        name: post.author
      },
      tags: [post.category]
    }))
  };

  return JSON.stringify(feed, null, 2);
}
