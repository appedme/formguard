# FormGuard

**Edge-Powered AI Form Backend for Builders**

Stop building form backends. Ship faster with a single endpoint that captures submissions, blocks spam, and converts raw responses into clear AI insights.

Built using **Cloudflare Workers, Next.js App Router, StackAuth, shadcn/ui, and Dodo Payments** — optimized for speed, simplicity, and high profit margins.

---

# Overview

FormGuard is a developer-first SaaS that replaces traditional form infrastructure with a lightweight edge API and a minimal dashboard.

Instead of building:

- backend APIs
- validation layers
- analytics pipelines
- messy CSV workflows

You create a form, copy an endpoint, and start receiving structured insights instantly.

---

# Core Features

## Edge Form Endpoints

Create form endpoints that run globally on Cloudflare Workers.

- Ultra-fast submissions
- Zero server management
- Rate limiting + validation

---

## AI Insights

Transform submissions into actionable summaries powered by **Google Gemini**.

- Detect repeated requests
- Summarize feedback
- Highlight sentiment trends
- On-demand AI insights per form

---

## Spam Protection

Built-in filtering at the edge.

- Basic bot detection
- Rate limiting
- Clean data storage

---

## Simple Dashboard

Minimal brutalist UI built with shadcn.

- Forms overview
- Submission viewer
- AI Insights tab
- Usage analytics and plan limits

---

## Dodo Payments Integration

Secure, global, and India-friendly billing system.

- Free → Pro → Growth plans
- Edge-enforced usage limits
- Secure checkout and webhook automation

---

# Tech Stack

- **Frontend**: Next.js App Router, TailwindCSS, shadcn/ui
- **Backend**: Cloudflare Workers (Edge runtime)
- **Auth**: StackAuth
- **Database**: Neon Postgres with Drizzle ORM
- **AI**: Google Gemini Pro (LLM)
- **Payments**: Dodo Payments
- **Language**: TypeScript

---

# Project Structure

```
app/
  (landing)/    - Public marketing pages
  (dashboard)/  - Protected user dashboard
  api/          - Billing & Submission endpoints
components/     - Reusable UI (shadcn)
db/             - Database schema & server actions
lib/            - Shared utilities (AI, Plans)
public/         - Assets, PWA manifest, Favicons
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/appedme/formguard
cd formguard
```

## 2. Install Dependencies

We use **Bun** for maximum performance.

```bash
bun install
```

## 3. Setup Environment Variables

Create `.env` based on `.env.example`:

```bash
NEXT_PUBLIC_STACK_PROJECT_ID=
STACK_SECRET_SERVER_KEY=
DATABASE_URL=
GEMINI_API_KEY=
DODO_PAYMENTS_API_KEY=
DODO_PAYMENTS_WEBHOOK_SECRET=
DODO_PAYMENTS_ENVIRONMENT=test_mode
```

## 4. Run Development Server

```bash
bun dev
```

## 5. Deployment

Deploy to Cloudflare via GitHub Actions or Wrangler:

```bash
bun run deploy
```

---

# How It Works

1. **Create a Form**: Get a unique `endpointId` from the dashboard.
2. **Post Data**: Send POST requests to `https://formguard.strivio.world/api/submit/:endpointId`.
3. **Analyze**: Use the AI Insight engine to summarize 100s of responses in seconds.

---

# Philosophy

FormGuard is built for builders who want:

- **Zero infra**: Just drop an endpoint.
- **Clear feedback**: AI-summarized insights, not raw data.
- **Global scale**: Runs on the edge.

One endpoint. Clean insights. Ship faster.

---

# License

MIT License
