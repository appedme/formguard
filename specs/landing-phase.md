# FormGuard Landing Page — Build Phases & Simple Execution Guide

This is the **execution roadmap** for building the landing page fast inside `/app/(landing)` using Next.js + shadcn.

Goal:

* Ship a high-conversion page quickly
* Avoid overengineering
* Keep everything server-first and minimal

---

# Phase 1 — Foundation (30–60 minutes)

Purpose: Prepare structure so building becomes mechanical.

## Step 1 — Create Route Group

```
/app/(landing)/page.tsx
/app/(landing)/layout.tsx
```

Landing layout must be separate from dashboard layout.

---

## Step 2 — Install shadcn Components

Only install what is needed:

* button
* card
* badge
* separator
* accordion

Avoid installing entire library.

---

## Step 3 — Create Folder Structure

```
/components/landing/
  navbar.tsx
  hero.tsx
  social-proof.tsx
  problem.tsx
  how-it-works.tsx
  features.tsx
  ai-section.tsx
  pricing.tsx
  faq.tsx
  final-cta.tsx
  footer.tsx
```

Each section = one component.

---

## Step 4 — Setup Base Layout

layout.tsx rules:

* Import font using next/font
* Add metadata
* Keep layout minimal

No auth logic here.

---

# Phase 2 — Build Above The Fold First

Purpose: Maximize perceived progress and conversion impact.

## Build Order

1. Navbar
2. Hero
3. CTA Button
4. Social Proof Strip

If these look strong, the rest becomes easy.

---

## Simple Build Strategy

Start with plain text blocks first:

* No icons
* No animations
* Just typography + spacing

Then refine later.

---

# Phase 3 — Core Sections (Mechanical Assembly)

Now add sections one by one.

## Recommended Order

1. Problem → Solution
2. How It Works
3. Features Grid
4. AI Insight Section

Rule:

Do NOT style deeply during this phase.

Only:

```
py-24
max-w-6xl
border-b
```

Focus on structure, not beauty.

---

# Phase 4 — Pricing & Paywall Logic

Purpose: Highest conversion impact.

## Implementation Rules

Pricing component MUST be a client component:

```
"use client"
```

Why:

* Razorpay script loads here only.
* Avoid global script pollution.

Steps:

1. Create pricing cards using shadcn Card.
2. Add buttons with `data-cta` attributes.
3. Razorpay opens only when user clicks.

Keep pricing text static — no DB fetch.

---

# Phase 5 — FAQ + Final CTA

These sections exist only to reduce friction.

Implementation tips:

* Use Accordion from shadcn.
* Answers must be one sentence.
* Repeat primary CTA.

---

# Phase 6 — Performance Pass (Very Important)

Before styling details, optimize.

Checklist:

* Convert all sections to Server Components.
* Ensure no `useEffect` unless necessary.
* Remove console logs.
* Confirm no API calls on landing page.

Run:

```
next build
```

Fix hydration warnings immediately.

---

# Phase 7 — Brutalist Styling Pass

Only now refine visuals.

## Rules

* Increase font size first.
* Add borders, not shadows.
* Keep colors neutral.
* Avoid gradients.

Example section wrapper:

```
<section className="py-24 border-b">
  <div className="mx-auto max-w-6xl px-6">
```

Do not introduce visual complexity.

---

# Phase 8 — Conversion Optimization

Add these last:

* Sticky navbar
* Repeated CTA buttons
* Pricing highlight badge
* Minimal hover effects

Avoid animation libraries.

---

# Phase 9 — Final Checks Before Deploy

## Technical

* Lighthouse score > 95
* Zero layout shift
* Fonts optimized
* Images avoided

## Conversion

* CTA visible above the fold
* Pricing readable in 5 seconds
* Hero explains product instantly

---

# Simple Mental Model For Building

Think of the landing page like stacking blocks:

1. Layout shell
2. Hero block
3. Reusable Section wrapper
4. Drop content blocks one by one

Do NOT build everything at once.

Build vertically:

Navbar → Hero → CTA → Pricing → Finish.

---

# Minimal Development Timeline

Day 1:

* Phase 1 + Phase 2

Day 2:

* Phase 3 + Phase 4

Day 3:

* Phase 5 + Phase 6 + Phase 7

Landing page becomes production-ready in under 3 days.

---

# END
