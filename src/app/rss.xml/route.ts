import { generateRssFeed } from "@/lib/rss";

export async function GET() {
  const rssFeed = generateRssFeed("rss.xml");

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
