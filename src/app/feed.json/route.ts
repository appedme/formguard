import { generateJsonFeed } from "@/lib/rss";

export async function GET() {
  const jsonFeed = generateJsonFeed();

  return new Response(jsonFeed, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
