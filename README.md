# VITIB Digital Academy — PWA Lead Capture

Production-ready Progressive Web App built for VITIB to capture and qualify visitor leads at **FEMUA 2026**.

## Overview

| Route | Description |
|-------|-------------|
| `/` | Landing page — VITIB branding, CTAs |
| `/interet` | Multi-step lead capture form (3 steps) |
| `/quiz` | "Mythe ou Réalité" AI quiz (5 questions) |
| `/merci` | Thank-you / success page |
| `/offline` | PWA offline fallback |
| `/admin/login` | Admin authentication |
| `/admin/dashboard` | Lead management overview |
| `/admin/leads/[id]` | Individual lead detail + status + notes |

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom VITIB design tokens
- **Database + Auth**: Supabase (PostgreSQL + Row Level Security)
- **Validation**: Zod
- **PWA**: Custom service worker, `app/manifest.ts`
- **Deployment**: Vercel

---

## Local Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd vitib-pwa
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up Supabase

**Create a new Supabase project** at [supabase.com](https://supabase.com).

Then run the migrations in **Supabase → SQL Editor**:

```bash
# Run migrations in order:
supabase/migrations/001_schema.sql   # Tables + RLS policies
supabase/seed.sql                    # Reference data (interests)
```

Or using the Supabase CLI:

```bash
supabase db push
supabase db seed
```

### 4. Create admin user

In Supabase Dashboard → **Authentication → Users → Add user**:
- Email: `admin@vitib.ci` (or any email)
- Password: (choose a strong password)

The admin user will be able to log in at `/admin/login`.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Vercel Deployment

### Step 1: Push to GitHub

```bash
git add -A
git commit -m "feat: VITIB PWA lead capture"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)

### Step 3: Add environment variables

In Vercel → **Settings → Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL     = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
NEXT_PUBLIC_APP_URL          = https://your-app.vercel.app
```

### Step 4: Deploy

Click **Deploy**. Vercel handles build + CDN automatically.

### Step 5: Configure Supabase redirect URLs

In Supabase → **Authentication → URL Configuration**:
- Site URL: `https://your-app.vercel.app`
- Redirect URLs: `https://your-app.vercel.app/**`

---

## PWA Icons

The repo ships with an SVG icon at `public/icons/icon.svg`. For full PWA installability, add PNG icons:

| File | Size | Usage |
|------|------|-------|
| `public/icons/icon-192.png` | 192×192 | Android home screen |
| `public/icons/icon-512.png` | 512×512 | Splash screen |
| `public/icons/icon-maskable.png` | 512×512 | Adaptive icon (Android) |
| `public/icons/apple-touch-icon.png` | 180×180 | iOS home screen |

Use [realfavicongenerator.net](https://realfavicongenerator.net/) or [pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator) to generate all sizes from the SVG.

---

## Database Schema

```
interests          → reference data (ia, cybersecurite, data…)
leads              → visitor contact info + profil + status
lead_interests     → many-to-many junction
quiz_attempts      → quiz scores linked to leads
admin_notes        → internal notes per lead
```

### RLS Policies Summary

| Table | Public | Admin |
|-------|--------|-------|
| interests | SELECT | — |
| leads | INSERT | SELECT, UPDATE |
| lead_interests | INSERT | SELECT |
| quiz_attempts | INSERT, UPDATE | SELECT |
| admin_notes | — | ALL |

---

## Rate Limiting (Production Recommendation)

For production at a high-traffic event, consider adding:

1. **Vercel Edge Middleware** — IP-based rate limiting using `@upstash/ratelimit` + Upstash Redis:
   ```typescript
   // middleware.ts addition
   const ratelimit = new Ratelimit({
     redis: Redis.fromEnv(),
     limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 leads/min per IP
   })
   ```

2. **Supabase RLS** — The `leads_email_lower_idx` unique index prevents duplicate emails at the DB level.

3. **Application-level** — The `/api/leads` route checks for duplicate emails in the last 24 hours before inserting.

---

## Future Enhancements

### QR Code Access
Generate a QR code linking to `https://your-app.vercel.app` or `https://your-app.vercel.app/interet`. Display at the VITIB stand for instant access. Tools: [qr-code-generator.com](https://qr-code-generator.com), or add `qrcode.react` to the admin dashboard.

### WhatsApp Relaunch Integration
Use the WhatsApp Business API or Twilio to send automated follow-up messages when a lead status changes to `a_relancer`. Trigger via Supabase Database Webhooks → serverless function.

### Email Campaigns
Integrate [Resend](https://resend.com) or [Brevo](https://brevo.com) (formerly Sendinblue):
- Confirmation email on form submission
- Launch announcement when programs are ready
- Segmented emails by `profil` or `interests`

### Analytics Dashboard
Extend the admin dashboard with:
- Submissions over time (chart by day/hour)
- Geographic distribution (from telephone prefix)
- Quiz score distribution
- Conversion funnel: landing → form → submit

### Multi-event Support
Add an `event` field to `leads` to reuse the PWA across multiple VITIB events, with per-event filtering in the admin.

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout (PWA meta, SW registration)
│   ├── manifest.ts             # PWA manifest
│   ├── globals.css             # VITIB design system (Tailwind v4)
│   ├── page.tsx                # Landing page
│   ├── interet/page.tsx        # Lead capture form
│   ├── quiz/page.tsx           # AI quiz
│   ├── merci/page.tsx          # Success page
│   ├── offline/page.tsx        # PWA offline fallback
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx        # Server component (data fetch)
│   │   │   └── client.tsx      # Client component (interactions)
│   │   └── leads/[id]/
│   │       ├── page.tsx        # Server component
│   │       └── client.tsx      # Client component (status, notes)
│   └── api/
│       ├── leads/route.ts
│       ├── quiz/route.ts
│       └── admin/
│           ├── leads/route.ts
│           ├── leads/[id]/route.ts
│           └── export/route.ts
├── components/
│   └── vitib/
│       ├── LeadForm.tsx        # Multi-step form (client)
│       ├── QuizGame.tsx        # Quiz game (client)
│       └── ServiceWorkerRegistration.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client (async cookies)
│   ├── validations.ts          # Zod schemas
│   └── utils.ts
├── types/
│   └── index.ts               # All TypeScript types + constants
└── middleware.ts               # Admin route protection
public/
├── sw.js                      # Service worker
└── icons/
    └── icon.svg               # VITIB V icon
supabase/
├── migrations/001_schema.sql  # Full DB schema + RLS
└── seed.sql                   # Reference data
```
