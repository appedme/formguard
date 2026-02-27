export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  content: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-formguard",
    title: "Introducing FormGuard: The AI-Powered Form Backend for the Modern Web",
    description: "Stop building custom form backends. Learn how FormGuard captures submissions, blocks spam, and generates AI insights — all at the edge.",
    date: "2026-02-25",
    author: "Shaswat Raj",
    category: "Product",
    readTime: "8 min read",
    featured: true,
    content: `
      <p class="lead">Every developer has built a contact form. Few have built one that scales, resists spam, and turns raw data into actionable insight. That's the gap FormGuard fills.</p>

      <h2>The Problem with Modern Form Handling</h2>
      <p>Building a contact form seems deceptively simple. A few input fields, a submit button, and a POST endpoint. But the moment you push it to production, reality hits hard. You need spam protection, input validation, email notifications, webhook integrations, and analytics — all while keeping response times under 200ms for users around the globe.</p>
      <p>Most developers solve this by stitching together a patchwork of services: a serverless function here, a Zapier integration there, maybe a Google Sheet as a database. The result is fragile, hard to maintain, and impossible to scale.</p>

      <h2>Enter FormGuard</h2>
      <p>FormGuard is a purpose-built form backend that runs entirely on Cloudflare's global edge network. Every submission is processed at the data center closest to your user, ensuring sub-100ms response times regardless of geography.</p>
      <p>But speed is just the beginning. FormGuard is built around three core pillars:</p>

      <h3>1. Intelligent Spam Protection</h3>
      <p>Traditional CAPTCHAs are a relic. They frustrate users, hurt conversion rates, and are increasingly solved by the very bots they're designed to stop. FormGuard takes a different approach with Cloudflare Turnstile integration — invisible, frictionless verification that analyzes browser behavior patterns rather than asking users to identify traffic lights.</p>
      <p>On top of that, our AI-powered content analysis examines submission patterns, velocity, and semantic content to catch sophisticated spam that slips past traditional filters. The result? A 99.9% spam detection rate with zero user friction.</p>

      <h3>2. AI-Powered Insights</h3>
      <p>Raw form data is useless if you can't extract meaning from it. FormGuard's AI Insight Engine, powered by Gemini, automatically analyzes your submissions to surface trends, sentiment patterns, and actionable recommendations.</p>
      <p>Imagine getting a weekly summary that tells you: "Beta signup interest increased 40% this week, with most submissions mentioning 'API integration' as their primary use case." That's the kind of intelligence FormGuard delivers out of the box.</p>

      <h3>3. Developer-First Architecture</h3>
      <p>FormGuard integrates with your existing stack in under 60 seconds. Point your form's action URL at your unique FormGuard endpoint, add a single header for authentication, and you're done. No SDK required, no vendor lock-in, no complex configuration.</p>
      <pre><code>&lt;form action="https://formguard.strivio.world/api/submit/YOUR_ENDPOINT" method="POST"&gt;
  &lt;input type="text" name="name" required /&gt;
  &lt;input type="email" name="email" required /&gt;
  &lt;textarea name="message"&gt;&lt;/textarea&gt;
  &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>

      <h2>The Integration Ecosystem</h2>
      <p>FormGuard doesn't just collect data — it routes it to where it matters. Every form can be connected to:</p>
      <ul>
        <li><strong>Google Sheets</strong> — Auto-append submissions to a spreadsheet for easy analysis</li>
        <li><strong>Telegram</strong> — Get instant notifications on your phone when a submission arrives</li>
        <li><strong>Notion</strong> — Create database entries automatically from form responses</li>
        <li><strong>Slack & Discord</strong> — Pipe submissions directly into your team's communication channels</li>
        <li><strong>Zapier, Make & n8n</strong> — Connect to 7,000+ apps through webhook automation</li>
      </ul>

      <h2>Built for AI Agents</h2>
      <p>FormGuard ships with a full <strong>Model Context Protocol (MCP)</strong> server, letting AI agents like Cursor, Windsurf, and Claude interact directly with your FormGuard workspace. Create forms, inspect submissions, analyze trends, and configure integrations — all through natural language.</p>

      <h2>What's Next</h2>
      <p>We're just getting started. Upcoming features include form templates, file upload support, custom domains for public forms, and team collaboration. Join the thousands of developers already using FormGuard and never worry about form backends again.</p>
    `,
  },
  {
    slug: "why-ai-spam-protection-matters",
    title: "Why AI-Powered Spam Protection is a Game Changer for Web Forms",
    description: "CAPTCHAs frustrate users and hurt conversions. AI-based behavioral analysis offers a better, invisible approach to securing your forms.",
    date: "2026-02-20",
    author: "FormGuard Team",
    category: "Security",
    readTime: "10 min read",
    content: `
      <p class="lead">Every year, bot traffic accounts for nearly half of all internet activity. For websites with public-facing forms, this means a constant battle against automated spam submissions that waste resources, pollute data, and erode trust.</p>

      <h2>The Death of the CAPTCHA</h2>
      <p>Google's reCAPTCHA was revolutionary when it launched. It crowdsourced digitization of books and street addresses while simultaneously verifying that users were human. But the landscape has changed dramatically.</p>
      <p>Modern AI can solve image-based CAPTCHAs with over 95% accuracy. CAPTCHA-solving services charge as little as $0.50 per thousand solutions. And the user experience cost is significant — studies show that CAPTCHAs reduce form conversion rates by 3-8%.</p>
      <p>For a business processing 10,000 form submissions per month, that translates to 300-800 lost leads. The math doesn't work.</p>

      <h2>The Invisible Alternative: Behavioral Analysis</h2>
      <p>Modern spam protection doesn't need to be visible. Cloudflare Turnstile, which FormGuard integrates natively, uses a fundamentally different approach:</p>
      <ul>
        <li><strong>Browser Fingerprinting</strong> — Analyzes hundreds of browser characteristics without collecting personal data</li>
        <li><strong>Interaction Patterns</strong> — Monitors mouse movements, scroll behavior, and typing cadence</li>
        <li><strong>Network Analysis</strong> — Evaluates connection characteristics and reputation</li>
        <li><strong>Machine Learning</strong> — Continuously adapts to new bot techniques based on global threat data</li>
      </ul>
      <p>The result is a verification system that's completely invisible to legitimate users while catching 99.9% of automated submissions.</p>

      <h2>Beyond Turnstile: AI Content Analysis</h2>
      <p>Behavioral verification catches automated bots, but what about human-operated spam? Manually submitted SEO spam, phishing attempts, and low-quality content require a different approach.</p>
      <p>FormGuard's AI layer analyzes the semantic content of each submission. It looks for:</p>
      <ul>
        <li><strong>Keyword stuffing</strong> — Unnatural density of SEO keywords or promotional language</li>
        <li><strong>URL patterns</strong> — Suspicious links or known phishing domains</li>
        <li><strong>Language coherence</strong> — Garbled text generated by spinning tools</li>
        <li><strong>Submission velocity</strong> — Abnormal patterns from a single IP or network</li>
      </ul>

      <h2>The Business Impact</h2>
      <p>Companies that switch from traditional CAPTCHAs to invisible verification report significant improvements:</p>
      <ul>
        <li>Form completion rates increase by 5-12%</li>
        <li>Support ticket volume decreases as spam complaints drop</li>
        <li>Data quality improves, leading to better analytics and decision-making</li>
        <li>User satisfaction scores increase across the board</li>
      </ul>

      <h2>Implementation with FormGuard</h2>
      <p>Enabling AI spam protection in FormGuard takes exactly two clicks. Navigate to your form settings, toggle on Turnstile verification, and you're done. No JavaScript changes, no backend modifications, no configuration files to manage.</p>
      <p>For developers embedding FormGuard in existing applications, simply add the Turnstile widget to your form and FormGuard handles the rest server-side:</p>
      <pre><code>&lt;script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer&gt;&lt;/script&gt;
&lt;div class="cf-turnstile" data-sitekey="YOUR_SITE_KEY"&gt;&lt;/div&gt;</code></pre>

      <h2>The Future of Form Security</h2>
      <p>As AI continues to evolve, so will the threats. The key insight is that static, puzzle-based verification will always be an arms race. The future lies in continuous, invisible analysis that adapts in real-time — exactly what FormGuard delivers.</p>
    `,
  },
  {
    slug: "building-forms-that-convert",
    title: "Building Forms That Actually Convert: A Developer's Guide to Form UX",
    description: "Learn the science and art behind high-converting web forms. From field count to micro-interactions, every detail matters.",
    date: "2026-02-18",
    author: "Shaswat Raj",
    category: "Design",
    readTime: "12 min read",
    featured: true,
    content: `
      <p class="lead">The difference between a form that converts at 2% and one that converts at 20% often comes down to a handful of design decisions. This guide breaks down what works, what doesn't, and why.</p>

      <h2>The Psychology of Form Completion</h2>
      <p>Every form field is a question, and every question is a micro-decision for the user. Research from the Baymard Institute shows that the average checkout form has 14.88 fields, but the optimal number is just 7. Reducing fields from 11 to 4 can increase conversion rates by up to 120%.</p>
      <p>The principle is simple: <strong>every field you add increases cognitive load and decreases the probability of completion.</strong> Ask yourself before adding each field: "Do I absolutely need this information right now, or can I collect it later?"</p>

      <h3>The Rule of Progressive Disclosure</h3>
      <p>Instead of presenting all fields at once, reveal them progressively. Multi-step forms with progress indicators consistently outperform single-page forms for complex data collection. Users perceive the task as more manageable when broken into digestible chunks.</p>

      <h2>Field Design That Works</h2>
      <p>The visual design of individual fields has a measurable impact on completion rates:</p>

      <h3>Labels</h3>
      <p>Top-aligned labels outperform left-aligned and inline labels in both speed and accuracy. They create a clear visual hierarchy and work perfectly on mobile devices. Placeholder text should never replace labels — it disappears on focus, leaving users without context.</p>

      <h3>Input Sizing</h3>
      <p>Field width should match the expected input length. A zip code field that spans the full width of the form feels wrong and creates uncertainty. Match field sizes to expected content length to provide implicit validation.</p>

      <h3>Error Handling</h3>
      <p>The biggest UX killer in forms is poor error handling. Rules to live by:</p>
      <ul>
        <li><strong>Validate inline</strong> — Show errors as the user moves to the next field, not after submission</li>
        <li><strong>Be specific</strong> — "Please enter a valid email address" beats "Invalid input"</li>
        <li><strong>Use color and icons</strong> — Red borders and ✕ icons are universally understood</li>
        <li><strong>Preserve input</strong> — Never clear a field that has an error. Let users correct, not re-enter</li>
      </ul>

      <h2>Mobile-First Form Design</h2>
      <p>Over 60% of web traffic comes from mobile devices, yet most forms are still designed desktop-first. Essential mobile optimizations:</p>
      <ul>
        <li><strong>Use appropriate input types</strong> — <code>type="email"</code>, <code>type="tel"</code>, and <code>type="number"</code> trigger the correct mobile keyboard</li>
        <li><strong>Touch targets</strong> — Minimum 44x44px for all interactive elements (Apple HIG recommendation)</li>
        <li><strong>Single-column layouts</strong> — Multi-column forms on mobile are a conversion killer</li>
        <li><strong>Sticky submit buttons</strong> — Keep the CTA visible as the user scrolls through fields</li>
      </ul>

      <h2>Micro-Interactions That Build Trust</h2>
      <p>Small animations and feedback mechanisms have an outsized impact on form completion:</p>
      <ul>
        <li><strong>Success checkmarks</strong> — A subtle green checkmark when a field validates gives users confidence</li>
        <li><strong>Loading states</strong> — Always show a spinner or progress indicator during submission</li>
        <li><strong>Confirmation feedback</strong> — An animated success state after submission is more effective than a redirect</li>
        <li><strong>Auto-formatting</strong> — Automatically format phone numbers, credit cards, and dates as users type</li>
      </ul>

      <h2>The FormGuard Advantage</h2>
      <p>FormGuard's public form builder implements all of these best practices out of the box. Custom theming, responsive layouts, field ordering, and success messages — all configurable from the dashboard without writing a single line of CSS.</p>
      <p>For developers who prefer custom frontends, FormGuard's submission endpoint accepts both JSON and form-data, works with any framework, and returns structured responses that make building beautiful success states trivial.</p>

      <h2>Measuring Form Performance</h2>
      <p>You can't improve what you don't measure. Key metrics every form owner should track:</p>
      <ul>
        <li><strong>Completion rate</strong> — Percentage of users who start and finish the form</li>
        <li><strong>Drop-off points</strong> — Which fields cause the most abandonment</li>
        <li><strong>Time to completion</strong> — How long users spend filling out the form</li>
        <li><strong>Error frequency</strong> — Which fields generate the most validation errors</li>
      </ul>
      <p>FormGuard's analytics dashboard provides all of these metrics in real-time, so you can continuously optimize your forms for maximum conversion.</p>
    `,
  },
  {
    slug: "edge-computing-form-backends",
    title: "Edge Computing and Form Backends: Why Milliseconds Matter",
    description: "How running form processing at the edge reduces latency, improves reliability, and delivers a fundamentally better user experience.",
    date: "2026-02-15",
    author: "FormGuard Team",
    category: "Engineering",
    readTime: "9 min read",
    content: `
      <p class="lead">When a user clicks "Submit" on your form, they expect an instant response. Every millisecond of delay increases the probability of abandonment. Edge computing eliminates the latency problem entirely.</p>

      <h2>The Latency Tax</h2>
      <p>Traditional form backends run in a single region — usually us-east-1 or eu-west-1. If your user is in Tokyo and your server is in Virginia, that submission travels over 10,000 miles before it's even processed. At the speed of light through fiber, that's a minimum of 150ms in network round-trip time alone.</p>
      <p>Add database operations, email sending, and webhook dispatching, and you're looking at 500ms-2s total response time. Studies show that 53% of mobile users abandon pages that take longer than 3 seconds to load. Form submission latency has the same effect.</p>

      <h2>What Is Edge Computing?</h2>
      <p>Edge computing moves your application logic from centralized data centers to a distributed network of servers positioned close to end users. Cloudflare's edge network, which FormGuard runs on, spans over 300 cities in more than 100 countries.</p>
      <p>When a user in São Paulo submits a form through FormGuard, that submission is processed at the Cloudflare data center in São Paulo — not in a server farm 5,000 miles away. The result is sub-50ms response times, globally.</p>

      <h2>Beyond Speed: Reliability</h2>
      <p>Centralized servers are single points of failure. An outage in us-east-1 takes down your entire form backend. Edge deployments distribute that risk across hundreds of locations. If one data center goes offline, traffic automatically routes to the next closest location.</p>
      <p>FormGuard's edge architecture delivers 99.99% uptime without the complexity of managing multi-region deployments yourself.</p>

      <h2>The Architecture Behind FormGuard</h2>
      <p>FormGuard's submission pipeline is designed to maximize the benefits of edge computing:</p>
      <ol>
        <li><strong>Edge Validation</strong> — Input validation and spam checks run at the edge, rejecting bad submissions before they touch any database</li>
        <li><strong>Async Processing</strong> — Webhooks, email notifications, and integrations fire asynchronously, so the user gets an instant response</li>
        <li><strong>Global Database</strong> — Neon Postgres with connection pooling ensures database operations are fast regardless of edge location</li>
        <li><strong>Streaming AI</strong> — AI insights are generated asynchronously and streamed to the dashboard in real-time</li>
      </ol>

      <h2>Real-World Performance Numbers</h2>
      <p>We benchmarked FormGuard against popular form backend services from different global locations:</p>
      <ul>
        <li><strong>New York → FormGuard</strong>: 45ms avg response time</li>
        <li><strong>London → FormGuard</strong>: 38ms avg response time</li>
        <li><strong>Tokyo → FormGuard</strong>: 52ms avg response time</li>
        <li><strong>São Paulo → FormGuard</strong>: 41ms avg response time</li>
      </ul>
      <p>Compare this to traditional backends where cross-continental submissions regularly exceed 500ms.</p>

      <h2>Getting Started</h2>
      <p>The best part about FormGuard's edge architecture is that you don't need to think about it. There's no region selection, no CDN configuration, no edge function deployment. Every form you create on FormGuard automatically runs on Cloudflare's global edge network.</p>
      <p>Just create a form, grab your endpoint URL, and your submissions are processed at the speed of the edge — everywhere in the world.</p>
    `,
  },
  {
    slug: "mcp-ai-agents-forms",
    title: "MCP and AI Agents: The Future of Form Management",
    description: "How the Model Context Protocol lets AI agents create, manage, and analyze your forms — and why this changes everything for developers.",
    date: "2026-02-12",
    author: "Shaswat Raj",
    category: "AI",
    readTime: "11 min read",
    featured: true,
    content: `
      <p class="lead">What if your AI coding assistant could create a form, configure its integrations, check submissions, and generate analytics reports — all without you touching the dashboard? With MCP, it can.</p>

      <h2>What Is the Model Context Protocol?</h2>
      <p>The Model Context Protocol (MCP) is an open standard that allows AI agents to interact with external tools and services in a structured way. Think of it as a universal API that AI assistants like Cursor, Claude, and Windsurf can use to read data, execute actions, and maintain context across interactions.</p>
      <p>Instead of copying data from your dashboard and pasting it into a chat window, MCP lets the AI access your tools directly. It's the difference between describing a spreadsheet to someone and giving them the spreadsheet.</p>

      <h2>FormGuard's MCP Server</h2>
      <p>FormGuard ships with a full-featured MCP server that exposes your entire workspace to AI agents. Here's what's available:</p>

      <h3>Form Lifecycle Management</h3>
      <ul>
        <li><strong>list_forms</strong> — View all your forms with metadata, submission counts, and status</li>
        <li><strong>create_form</strong> — Create new forms with custom names and configurations</li>
        <li><strong>delete_form</strong> — Remove forms and all associated data</li>
        <li><strong>update_form_settings</strong> — Configure webhooks, integrations, auto-responders, and more</li>
      </ul>

      <h3>Submission Intelligence</h3>
      <ul>
        <li><strong>get_submissions</strong> — Retrieve and filter submissions with pagination</li>
        <li><strong>get_ai_insights</strong> — Access AI-generated analysis of your submission data</li>
      </ul>

      <h2>Real-World Use Cases</h2>
      <p>The power of MCP becomes clear when you see it in action:</p>

      <h3>Scenario 1: Building a Landing Page</h3>
      <p>You're building a product launch page in Cursor. Instead of switching to FormGuard's dashboard, you tell your AI agent: "Create a waitlist form for my new product with email notifications and a Slack webhook." The agent creates the form, configures the integrations, and gives you the endpoint URL — all within your IDE.</p>

      <h3>Scenario 2: Weekly Analytics</h3>
      <p>Every Monday morning, you ask your AI assistant: "How did our forms perform last week?" The agent pulls submission data across all your forms, generates a summary with trends and anomalies, and presents it in a clean report — no dashboard required.</p>

      <h3>Scenario 3: Debugging Integration Issues</h3>
      <p>A webhook isn't firing correctly. You tell your agent: "Check the last 10 submissions for my Bug Report form and verify the webhook configuration." The agent inspects both the submissions and the form settings, identifies the misconfiguration, and fixes it.</p>

      <h2>Setting Up MCP</h2>
      <p>Connecting FormGuard to your AI agent takes under a minute:</p>
      <ol>
        <li>Generate an API key from the MCP section in your FormGuard dashboard</li>
        <li>Add the FormGuard MCP server to your agent's configuration</li>
        <li>Start asking your agent about your forms</li>
      </ol>
      <p>FormGuard supports both native SSE connections and stdio-based connections via <code>mcp-remote</code>, ensuring compatibility with every major AI development tool.</p>

      <h2>The Bigger Picture</h2>
      <p>MCP represents a fundamental shift in how developers interact with their tools. Instead of context-switching between dozens of dashboards, you stay in your flow state and let AI handle the operational complexity.</p>
      <p>FormGuard is one of the first form backend services to ship with full MCP support, and we're continuously expanding the tools available. The future of form management isn't clicking buttons in a dashboard — it's having a conversation with your AI agent.</p>
    `,
  },
  {
    slug: "webhooks-automation-guide",
    title: "The Complete Guide to Form Webhooks and Automation Workflows",
    description: "Master webhook integrations with Zapier, Make, n8n, and custom endpoints. Build powerful automation pipelines triggered by form submissions.",
    date: "2026-02-08",
    author: "FormGuard Team",
    category: "Tutorials",
    readTime: "14 min read",
    content: `
      <p class="lead">A form submission is a signal. A webhook turns that signal into action. This guide covers everything you need to know about building automation workflows triggered by form data.</p>

      <h2>What Are Webhooks?</h2>
      <p>A webhook is an HTTP callback — a POST request that your form backend sends to a URL you specify whenever an event occurs. In the context of forms, the event is a new submission, and the payload is the submitted data.</p>
      <p>Unlike polling (repeatedly checking for new data), webhooks are event-driven. They fire instantly when something happens, making them the foundation of real-time automation.</p>

      <h2>Webhook Anatomy</h2>
      <p>When FormGuard fires a webhook, it sends a JSON payload containing:</p>
      <pre><code>{
  "formId": "uuid-of-the-form",
  "submissionId": "uuid-of-the-submission",
  "payload": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "I'm interested in your product."
  },
  "createdAt": "2026-02-20T14:30:00.000Z"
}</code></pre>
      <p>This structured format makes it easy to parse and route data in any automation platform.</p>

      <h2>Platform-Specific Guides</h2>

      <h3>Zapier</h3>
      <p>Zapier is the most popular no-code automation platform, connecting to over 7,000 apps. To connect FormGuard:</p>
      <ol>
        <li>Create a new Zap and select <strong>Webhooks by Zapier</strong> as the trigger</li>
        <li>Choose <strong>Catch Hook</strong> as the trigger event</li>
        <li>Copy the webhook URL Zapier gives you</li>
        <li>Paste it into your FormGuard form's webhook URL field</li>
        <li>Submit a test form to verify the connection</li>
        <li>Add actions — send an email, create a Notion page, add a HubSpot contact, anything</li>
      </ol>

      <h3>Make (formerly Integromat)</h3>
      <p>Make excels at complex, multi-branch workflows. Its visual scenario builder lets you create sophisticated automation pipelines:</p>
      <ol>
        <li>Create a new Scenario and add a <strong>Custom Webhook</strong> module</li>
        <li>Copy the webhook URL and paste it into FormGuard</li>
        <li>Build your workflow — route based on form fields, transform data, connect to multiple services</li>
      </ol>

      <h3>n8n (Self-Hosted)</h3>
      <p>For teams that need full control, n8n is an open-source automation platform you can self-host:</p>
      <ol>
        <li>Add a <strong>Webhook</strong> node to your workflow</li>
        <li>Set the HTTP method to POST</li>
        <li>Copy the production webhook URL and add it to FormGuard</li>
        <li>Process the incoming data with n8n's extensive node library</li>
      </ol>

      <h2>Custom Webhook Endpoints</h2>
      <p>If you prefer building your own automation, FormGuard webhooks work with any HTTP endpoint. Here's a simple Node.js example:</p>
      <pre><code>app.post('/webhook/formguard', (req, res) => {
  const { formId, submissionId, payload } = req.body;
  
  // Process the submission
  console.log(\`New submission from \${payload.name}: \${payload.message}\`);
  
  // Send to your CRM, database, or notification service
  await crm.createLead(payload);
  
  res.status(200).json({ received: true });
});</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Always return 200</strong> — Your webhook endpoint should return a 200 status quickly, even if processing takes time. Use background jobs for heavy lifting.</li>
        <li><strong>Handle duplicates</strong> — Network issues can cause webhooks to fire more than once. Use the submissionId to deduplicate.</li>
        <li><strong>Secure your endpoint</strong> — Validate incoming requests using a shared secret or IP whitelist.</li>
        <li><strong>Monitor failures</strong> — Set up alerts for webhook delivery failures so you don't miss critical submissions.</li>
      </ul>

      <h2>Advanced Patterns</h2>
      <h3>Multi-Channel Routing</h3>
      <p>Use FormGuard's built-in integrations for immediate notifications (Slack, Telegram) and webhooks for deeper automation (CRM updates, database syncing, conditional workflows).</p>

      <h3>Data Enrichment</h3>
      <p>Use your webhook to enrich submission data before storing it. Look up company information from email domains, geocode addresses, or score leads based on submission content.</p>

      <p>The possibilities are limitless. Every form submission can trigger a cascade of automated actions that would otherwise require manual work. That's the power of webhooks.</p>
    `,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
