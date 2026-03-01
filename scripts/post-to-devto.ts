/**
 * Script to automatically post an article to Dev.to via the Forem API.
 * Usage: DEVTO_API_KEY=your_key bun run scripts/post-to-devto.ts
 */

const DEVTO_API_URL = "https://dev.to/api/articles";

const ARTICLE_PAYLOAD = {
  article: {
    title: "How I replaced Next.js API Routes for Forms with Cloudflare Workers",
    published: false, // Set to true to actually publish, false creates a draft
    body_markdown: `For the longest time, whenever I needed a simple "Contact Us" or "Waitlist" form in a Next.js app, my workflow looked like this:

1. Create a \`route.ts\` API endpoint.
2. Install \`zod\` for validation.
3. Install \`resend\` or \`nodemailer\` to actually get the email.
4. Set up an API key, write the HTML email template, handle rate limiting, and write a bunch of boilerplate JSX.

It took hours for what should have been a 5-minute task. Worse, when I started getting spam, I had to figure out how to integrate Google reCAPTCHA, which completely ruined the UX of my site.

### The Cloudflare Workers Pivot
I realized that form handling doesn't belong in my edge computing framework—it belongs on the absolute edge network itself.

I built [FormGuard](https://formguard.strivio.world), an AI-native form backend that runs entirely on Cloudflare Workers. 

Here is how you use it:
\`\`\`html
<form action="https://api.formguard.strivio.world/submit/YOUR_ID" method="POST">
  <input name="email" type="email" required />
  <button type="submit">Join</button>
</form>
\`\`\`
That's it. No Next.js API routes, no \`nodemailer\`, no React Email templates.

### How it stops Spam
Instead of forcing users to click traffic lights, FormGuard uses serverless AI to analyze the payload *before* it ever hits your inbox. If the payload contains typical spam vectors or bot-like submission patterns, it's silently dropped.

### The stack
- **Edge:** Cloudflare Workers & Hono
- **Database:** Drizzle ORM & Postgres
- **Frontend:** Next.js App Router & Tailwind CSS

If you're tired of writing backend code for frontend forms, I'd love for you to check it out. I just launched on Product Hunt today and would appreciate your feedback!

🔗 [Check out FormGuard on Product Hunt](https://www.producthunt.com/posts/formguard)
`,
    tags: ["webdev", "nextjs", "react", "cloudflare"],
    canonical_url: "https://formguard.strivio.world/blog", // Point back to your own domain for SEO
  },
};

async function postToDevTo() {
  const apiKey = process.env.DEVTO_API_KEY;

  if (!apiKey) {
    console.error("❌ Error: DEVTO_API_KEY environment variable is missing.");
    console.log("Get your key at: https://dev.to/settings/extensions");
    console.log("Usage: DEVTO_API_KEY=your_key bun run scripts/post-to-devto.ts");
    process.exit(1);
  }

  console.log("🚀 Creating article draft on Dev.to...");

  try {
    const response = await fetch(DEVTO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(ARTICLE_PAYLOAD),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json() as any;
    console.log("✅ Success! Article created.");
    console.log(`🔗 URL: ${data.url}`);
    console.log(`📝 Status: ${data.published ? "Published" : "Draft"}`);
  } catch (error) {
    console.error("❌ Failed to post to Dev.to:", error);
  }
}

postToDevTo();
