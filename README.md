# FormGuard — Invisible Spam Protection

FormGuard is an elite, edge-native form protection and backend service. It stops 99% of spam submissions with invisible, AI-powered analysis—eliminating the need for traditional CAPTCHAs.

## 🚀 Key Features

- **Invisible Protection:** Stops bots without bothering users. No puzzles, no friction.
- **AI-Powered:** Uses advanced behavioral analysis to distinguish between humans and bots.
- **Edge-Native:** Built on Cloudflare Workers for ultra-low latency and global scalability.
- **Developer-First:** One-line HTML integration. No complex SDKs or server-side code required.
- **Deep Analytics:** Real-time submission logs and AI-generated insights.
- **Native Integrations:** Sync submissions to Slack, Discord, Google Sheets, Notion, and Telegram.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Runtime:** Cloudflare Workers (Edge)
- **Database:** PostgreSQL (Neon) with Drizzle ORM
- **Auth:** Stack Auth
- **Styling:** Tailwind CSS
- **Spam Engine:** Cloudflare Turnstile + AI Behavioral Analysis
- **Email:** Resend

## 🏗️ Architecture

FormGuard follows a production-grade, modular architecture designed for 10x traffic:

- **Service Layer:** Isolated business logic in `src/services`.
- **Action Layer:** Atomic, ownership-aware database operations in `src/db/actions`.
- **Validation:** Strict input validation using Zod.
- **Observability:** Centralized, structured JSON logging.
- **Performance:** Optimized SQL with JOINs/GROUP BY to eliminate N+1 query patterns.

## 🏁 Getting Started

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/sh20raj/formguard.git
    cd formguard
    bun install
    ```

2.  **Environment Variables:**
    Copy `.env.example` to `.env` and fill in your credentials.

3.  **Run Development Server:**
    ```bash
    bun dev
    ```

4.  **Database Migration:**
    ```bash
    bun drizzle-kit push
    ```

5.  **Deploy:**
    ```bash
    bun run deploy
    ```

## 🔐 Security & Compliance

- **GDPR & CCPA Compliant:** We respect user privacy and do not track users across sites.
- **CORS Hardening:** Restricted endpoint access via allowed origin lists.
- **Rate Limiting:** Infrastructure-level protection against brute-force and DDoS.

---

Built with precision by the **Unstory** team.
