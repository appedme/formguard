# FormGuard — High-Conversion Brutalist Landing Page Spec

Design System: shadcn/ui
Framework: Next.js App Router
Target Stack: Cloudflare Workers + StackAuth + Razorpay

This document defines **copy, structure, UX flow, and engineering rules** for building the landing page inside `/app/(landing)`.

---

# 1. Landing Page Philosophy

Goal: Extreme clarity + aggressive conversion.

Principles:

* Brutal minimalism (no fluff visuals)
* Bold typography
* High contrast spacing
* Fast loading (<1s TTFB)
* Single dominant CTA repeated
* No complex animations
* Everything above the fold must explain value in 3 seconds

Design references:

* Linear.app
* Vercel
* Stripe docs style

---

# 2. Page Structure

Route:

```
/app/(landing)/page.tsx
```

Sections order:

1. Navbar
2. Hero
3. Social Proof Strip
4. Problem → Solution
5. How It Works
6. Features Grid
7. AI Insight Section (Key Differentiator)
8. Pricing
9. FAQ
10. Final CTA
11. Footer

---

# 3. Copywriting — Every Word Crafted for Conversion

## NAVBAR

Left:
FormGuard

Right:

* Features
* Pricing
* Docs
* Login
* Button: **Start Free**

---

## HERO SECTION

Headline:

> Stop building form backends.
> Just drop an endpoint and ship.

Subheadline:

> FormGuard captures submissions, blocks spam, and turns raw responses into AI insights — powered by Cloudflare edge infrastructure.

Primary CTA:

**Start Free — No Credit Card**

Secondary Text:

> Deploy in under 2 minutes.

Trust Line:

> Built for indie makers, YC founders, and fast-moving teams.

---

## SOCIAL PROOF STRIP

Minimal monochrome badges:

* Next.js
* Cloudflare
* StackAuth
* Razorpay
* AI Powered

Text:

> Designed for builders who hate backend overhead.

---

## PROBLEM → SOLUTION

Left Column (Problem):

* Spam destroying your forms?
* CSV exports are chaos?
* No idea what users are actually asking?
* Backend logic slowing launch?

Right Column (Solution):

> One endpoint.
> Clean dashboard.
> Instant AI summaries.

CTA Button:

Start Free

---

## HOW IT WORKS

Step Cards (shadcn Card):

1. Create a Form
2. Copy Your Endpoint
3. Receive Clean Insights

Microcopy:

> No servers. No cron jobs. No headaches.

---

## FEATURES GRID

Grid of 6 brutal cards:

* Edge Processing
* AI Summaries
* Spam Protection
* Team Workspaces
* Dodo Payments
* Webhook Automation

Each card:

Title
1-line benefit
No long paragraphs.

---

## AI INSIGHT SECTION (MOST IMPORTANT CONVERSION DRIVER)

Headline:

> Your forms don’t just collect data.
> They explain it.

Bullets:

* Auto summary of submissions
* Detect repeated feature requests
* Sentiment analysis
* Weekly insight reports

Visual idea:

Monospace AI output preview box.

---

## PRICING SECTION

Layout:

3 vertical cards.

### FREE

₹0

* 100 submissions
* Basic dashboard

CTA: Start Free

---

### PRO (Highlighted)

₹399/month

* AI summaries
* Spam filtering
* Export tools

CTA: Upgrade

Badge:

MOST POPULAR

---

### GROWTH

₹999/month

* Insight reports
* Team workspace
* Priority processing

CTA: Go Growth

Pricing Microcopy:

> Cancel anytime. Razorpay secure billing.

---

## FAQ

Questions:

* Do I need a backend?
* Does it work with static sites?
* Is AI usage limited?
* Can I use custom domains?
* Is data private?

Keep answers extremely short.

---

## FINAL CTA

Large brutal section:

Headline:

> Ship forms faster than your competitors.

Button:

Start Free — Deploy in Minutes

Subtext:

No credit card required.

---

## FOOTER

Links:

Docs
Privacy
Terms
Twitter
Status

Text:

© FormGuard

---

# 4. Visual Design Rules (Brutalist Style)

* Use default shadcn components
* Avoid gradients
* Avoid glassmorphism
* Black / white / gray palette
* Large font scale:

```
Hero Title: text-5xl md:text-7xl
Section Title: text-3xl
Body: text-sm
```

Spacing:

```
py-24 sections
max-w-6xl container
gap-8 grids
```

---

# 5. Component Architecture (Next.js App Router)

Folder:

```
/app/(landing)/
    page.tsx
    layout.tsx
/components/landing/
    hero.tsx
    navbar.tsx
    features.tsx
    pricing.tsx
    faq.tsx
```

Rules:

* Landing components = server components by default
* Use client components ONLY for interactive elements
* Avoid global state

---

# 6. Next.js Best Practices (Critical)

## Rendering Strategy

* Default to Server Components
* Use edge runtime where possible
* Avoid unnecessary client bundles

```
export const runtime = "edge"
```

---

## Performance Rules

* No heavy libraries
* No framer-motion unless essential
* Prefer CSS transitions

---

## Fonts

Use next/font:

```
import { Inter } from "next/font/google"
```

---

## Metadata SEO

Add inside layout.tsx:

* OpenGraph
* Twitter cards
* Structured metadata

Title:

FormGuard — AI Form Backend

---

## CTA Tracking

Create simple analytics event:

```
data-cta="start-free"
```

Send to Worker analytics endpoint.

---

## Razorpay Paywall Best Practice

Do NOT load Razorpay script globally.

Load only inside pricing client component.

---

## StackAuth Practice

* Auth only on dashboard routes
* Landing page must remain public
* Avoid session fetch on landing load

---

## Database Calls

Landing page = zero DB calls.

All pricing content static.

---

## Image Optimization

Avoid large hero images.

Use pure typography for brutalist aesthetic.

---

# 7. Conversion Optimization Notes

* Repeat primary CTA every 2 sections.
* Avoid paragraphs longer than 2 lines.
* Every section must answer:

What is it?
Why should I care?
What do I click next?

---

# 8. Developer Notes for Cursor

* Use shadcn button variants:

  * default (primary CTA)
  * outline (secondary)
* Use grid layouts instead of flex when possible.
* Maintain consistent section wrapper component.

Section Wrapper Example:

```
<section className="py-24 border-b">
  <div className="mx-auto max-w-6xl px-6">
```

---

# END OF SPEC
