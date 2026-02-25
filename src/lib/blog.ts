export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  content: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-formguard",
    title: "Introducing FormGuard: The AI-Powered Form Backend",
    description: "Stop building custom form backends. Learn how FormGuard captures submissions, blocks spam, and generates AI insights at the edge.",
    date: "2026-02-25",
    author: "Shaswat Raj",
    category: "Product",
    image: "/blog/introducing-formguard.png",
    content: `
      <h2>The Problem with Modern Form Handling</h2>
      <p>Building a contact form seems simple, but handling it correctly at scale is hard. You need to manage spam, ensure data integrity, and ideally, do something useful with the data you collect.</p>
      
      <h2>Enter FormGuard</h2>
      <p>FormGuard is built on Cloudflare's edge infrastructure. It's designed to be the fastest, most secure, and most intelligent way to handle form submissions.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li><strong>AI Spam Protection:</strong> No more captchas. We use behavioral analysis and AI to filter spam.</li>
        <li><strong>Instant Insights:</strong> Our AI engine analyzes your submissions to give you summaries and actionable data.</li>
        <li><strong>Global Edge Performance:</strong> Submissions are processed as close to your users as possible.</li>
      </ul>
      
      <p>Start building today and never worry about form backends again.</p>
    `,
  },
  {
    slug: "why-ai-spam-protection-matters",
    title: "Why AI-Powered Spam Protection is a Game Changer",
    description: "Captchas are frustrating for users. AI-based behavioral analysis offers a better way to secure your forms without the friction.",
    date: "2026-02-20",
    author: "FormGuard Team",
    category: "Security",
    image: "/blog/spam-protection.png",
    content: `
      <h2>The Death of the Captcha</h2>
      <p>Users hate captchas. They add friction to your conversion funnel and are increasingly being solved by AI anyway. It's time for a better approach.</p>
      
      <h2>Behavioral & AI Analysis</h2>
      <p>FormGuard uses a multi-layered approach to identify spam. We look at submission patterns, content velocity, and use language models to detect low-quality or automated messages.</p>
      
      <p>The result? A 99.9% spam detection rate with zero user friction.</p>
    `,
  },
];
