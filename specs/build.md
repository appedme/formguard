# FormGuard — Full SaaS Build Phases

Stack: Cloudflare Workers + Next.js App Router + StackAuth + shadcn + DB (D1/Postgres) + Razorpay

Goal: Build a profitable micro-SaaS with minimal complexity, edge-first architecture, and a simple paywall.

---

# Architecture Overview (Simple Mental Model)

Frontend (Next.js)

- Landing page
- Dashboard UI
- Pricing

Backend (Cloudflare Workers)

- Form submission endpoint
- AI processing
- Webhooks
- Usage tracking

Database

- Users
- Forms
- Submissions
- Billing state

Auth

- StackAuth

Payments

- Razorpay subscriptions

---

# Phase 1 — Project Foundation

Objective: Create a stable skeleton before adding features.

## Setup

1. Create Next.js app with App Router.
2. Install shadcn components.
3. Setup StackAuth.
4. Create Cloudflare Worker project.
5. Connect database (D1 or Postgres).

Folder idea:

```id="9h8x1c"
/app
  /(landing)
  /(dashboard)
  /(auth)
/lib
/workers
```

Rules:

- Dashboard and landing layouts must be separate.
- Keep UI and API responsibilities isolated.

Deliverable:
User can sign up and see an empty dashboard.

---

# Phase 2 — Auth + Workspace Model

Objective: Users can create and manage forms.

Database Tables:

- users
- forms
- submissions
- plans

Core Flow:

1. User logs in via StackAuth.
2. Dashboard loads user workspace.
3. User clicks “Create Form”.

Form schema:

```id="f81bzw"
id
name
endpoint_id
owner_id
created_at
plan
```

Deliverable:
User can create a form and see a generated endpoint ID.

---

# Phase 3 — Submission Engine (Cloudflare Worker)

Objective: Core product functionality.

Worker Responsibilities:

- Receive POST request
- Validate payload
- Rate limit
- Detect spam
- Save to DB

Endpoint Example:

```id="0bbkqz"
/api/submit/{endpoint_id}
```

Worker Flow:

1. Parse request JSON.
2. Check usage limits.
3. Insert submission into DB.
4. Return success response.

Keep logic simple — no AI yet.

Deliverable:
External HTML form can send data successfully.

---

# Phase 4 — Dashboard Viewer

Objective: Make the product feel real.

Dashboard Pages:

- Forms list
- Submissions table
- Single form analytics

UI Components:

- Table
- Badge
- Card

Important Rules:

- Fetch data using Server Components.
- Pagination required early to avoid heavy queries.

Deliverable:
User sees live submissions in dashboard.

---

# Phase 5 — Razorpay Paywall (Monetization Layer)

Objective: Convert users quickly.

Plans:

- Free
- Pro
- Growth

Implementation Steps:

1. Create Razorpay subscription plan.
2. Add pricing client component.
3. On success → webhook updates DB plan.

Database field:

```id="m3gq6o"
plan: free | pro | growth
```

Worker must enforce:

- submission limits
- AI access

Deliverable:
Upgrade button changes user plan.

---

# Phase 6 — AI Insight Engine (Differentiator)

Objective: Add premium feature that drives revenue.

Worker Task:

- Batch submissions
- Send to AI model
- Generate summary

Store result:

```id="9uxp8d"
form_insights:
form_id
summary
updated_at
```

Dashboard:

Add “Insights” tab.

Important:

Run AI on demand, not automatically, to control cost.

Deliverable:
User clicks “Generate Insight” and sees AI summary.

---

# Phase 7 — Analytics + Retention Features

Objective: Increase perceived value.

Add:

- Submission count chart
- Top keywords extraction
- Weekly summary email (optional worker cron)

Keep analytics simple:

Counts per day only.

Deliverable:
Dashboard shows growth metrics.

---

# Phase 8 — Developer Experience Features

Objective: Make builders adopt quickly.

Add:

- Copy endpoint button
- Example HTML snippet
- Curl example

Example snippet UI:

```id="6xtxw7"
<form action="https://formguard.strivio.world/api/submit/xxx" method="POST">
```

Deliverable:
Users understand integration in seconds.

---

# Phase 9 — Performance + Edge Optimization

Rules:

- Workers handle heavy logic.
- Next.js only renders UI.
- Avoid server actions for high-frequency events.
- Cache dashboard queries where possible.

Checklist:

- No DB calls on landing page.
- Edge runtime enabled where useful.

---

# Phase 10 — Growth Features (Optional but High ROI)

After MVP works:

- Referral codes
- Custom domain endpoints
- Webhook integrations
- Zapier-style triggers

Do NOT build these early.

---

# Simplest Build Order (Execution Strategy)

Build vertically instead of horizontally:

1. Auth → Dashboard skeleton
2. Form creation
3. Worker endpoint
4. Submission viewer
5. Razorpay paywall
6. AI insights
7. Analytics

Never build multiple layers at once.

---

# What NOT To Build Early

- Team permissions
- Complex analytics
- Drag-drop builders
- Visual editors
- Advanced AI automations

Ship core value first: **endpoint + insights**.

---

# Minimal Timeline

Day 1:
Foundation + Auth + Dashboard shell

Day 2:
Worker endpoint + Form creation

Day 3:
Submission viewer

Day 4:
Razorpay integration

Day 5:
AI insights

Day 6:
Analytics + polish

---

# Mental Model For Whole App

Think in 3 pillars:

Edge Worker = Product Engine
Next.js = Control Panel
Razorpay = Revenue Gate

Everything else is optional.

---

# END
