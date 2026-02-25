# FormGuard

**Edge-Powered AI Form Backend for Builders**

Stop building form backends. Ship faster with a single endpoint that captures submissions, blocks spam, and converts raw responses into clear AI insights.

Built using **Cloudflare Workers, Next.js App Router, StackAuth, shadcn/ui, and Razorpay** — optimized for speed, simplicity, and high profit margins.

---

# Overview

FormGuard is a developer-first SaaS that replaces traditional form infrastructure with a lightweight edge API and a minimal dashboard.

Instead of building:

* backend APIs
* validation layers
* analytics pipelines
* messy CSV workflows

You create a form, copy an endpoint, and start receiving structured insights instantly.

---

# Core Features

## Edge Form Endpoints

Create form endpoints that run globally on Cloudflare Workers.

* Ultra-fast submissions
* Zero server management
* Rate limiting + validation

---

## AI Insights

Transform submissions into actionable summaries.

* Detect repeated requests
* Summarize feedback
* Highlight sentiment trends
* Weekly insights

---

## Spam Protection

Built-in filtering at the edge.

* Basic bot detection
* Rate limiting
* Clean data storage

---

## Simple Dashboard

Minimal brutal UI built with shadcn.

* Forms overview
* Submission viewer
* Insights tab
* Usage limits

---

## Razorpay Paywall

India-friendly subscription system.

* Free → Pro → Growth
* Edge-enforced limits
* Secure billing

---

# Tech Stack

Frontend:

* Next.js App Router
* shadcn/ui
* Server Components
* TailwindCSS

Backend:

* Cloudflare Workers
* Edge runtime APIs

Auth:

* StackAuth

Database:

* Cloudflare D1 or Postgres

Payments:

* Razorpay Subscriptions

---

# Architecture

Frontend (Next.js)

* Landing pages
* Dashboard UI
* Pricing

Worker API (Edge)

* Submission endpoints
* AI processing
* Usage enforcement

Database

* Users
* Forms
* Submissions
* Plans
* Insights

---

# Project Structure

```
app/
  (landing)/
  (dashboard)/
  (auth)/
components/
  landing/
  dashboard/
lib/
workers/
```

Key idea:

* UI lives in Next.js
* Product logic lives in Workers

---

# Getting Started

## 1. Clone Repository

```
git clone https://github.com/appedme/formguard
cd formguard
```

---

## 2. Install Dependencies

```
npm install
```

---

## 3. Setup Environment Variables

Create `.env.local`

```
NEXT_PUBLIC_APP_URL=
STACKAUTH_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
DATABASE_URL=
WORKER_API_URL=
```

---

## 4. Run Development Server

```
npm run dev
```

---

## 5. Run Cloudflare Worker

```
wrangler dev
```

---

# How It Works

## Create a Form

Inside dashboard:

* Click “Create Form”
* Get unique endpoint

Example:

```
https://api.formguard.strivio.world/api/submit/abc123
```

---

## Send Submissions

Example HTML form:

```
<form action="https://api.formguard.strivio.world/api/submit/abc123" method="POST">
  <input name="email" />
  <button type="submit">Submit</button>
</form>
```

Worker stores submission and applies limits.

---

## Generate AI Insights

From dashboard:

* Click “Generate Insight”
* Worker batches submissions
* AI returns structured summary

---

# Development Principles

## Server-First Design

* Default to Server Components
* Avoid unnecessary client JS

---

## Edge-First Logic

* Validation
* Rate limiting
* AI processing
* Usage enforcement

All handled in Workers.

---

## Minimal UI Philosophy

* Brutalist layout
* Typography first
* No heavy animations
* Performance over visuals

---

# Next.js Best Practices Used

* App Router only
* Route groups `(landing)` and `(dashboard)`
* Edge runtime where possible
* Static landing pages
* Zero DB calls on marketing pages
* next/font optimization
* Lazy client components

---

# Payments Flow

1. User selects Pro or Growth.
2. Razorpay Checkout opens.
3. Webhook updates plan in DB.
4. Worker enforces limits based on plan.

---

# Database Models (Conceptual)

users

* id
* email
* plan

forms

* id
* owner_id
* endpoint_id

submissions

* id
* form_id
* payload
* created_at

insights

* form_id
* summary
* updated_at

---

# Deployment

Frontend:

```
vercel deploy
```

Worker:

```
wrangler deploy
```

Database:

* Cloudflare D1 migration or Postgres migration

---

# Roadmap

Planned:

* Custom domains
* Webhook automation
* Referral system
* Advanced analytics
* Team workspaces

---

# Contributing

Contributions welcome.

Guidelines:

* Keep components server-first
* Avoid adding heavy dependencies
* Maintain brutal minimal design

---

# License

MIT License

---

# Philosophy

FormGuard is built for builders who want:

* fewer servers
* faster launches
* clearer user feedback

One endpoint. Clean insights. Ship faster.
