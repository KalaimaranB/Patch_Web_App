---
title: Architecture
layout: default
parent: Developer Guide
nav_order: 1
---

# Architecture
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) | `^15.5.9` |
| Language | TypeScript | `^5` |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | `^4` (PostCSS plugin via `@tailwindcss/postcss`) |
| UI Components | [Tremor](https://www.tremor.so/) | `^3.18.7` |
| Icons | [Lucide React](https://lucide.dev/) | `^0.562.0` |
| Backend / DB | [Supabase](https://supabase.com/) (PostgreSQL + Auth + Realtime) | `@supabase/supabase-js ^2.89.0` |
| SSR Auth | `@supabase/ssr` | `^0.8.0` |
| Charts | [Recharts](https://recharts.org/) | `^3.6.0` |
| Date utilities | [date-fns](https://date-fns.org/) | `^4.1.0` |
| Deployment | [Vercel](https://vercel.com/) | — |

---

## Project Structure

```
patch-app/
├── src/
│   ├── app/                          # Next.js App Router pages & layouts
│   │   ├── layout.tsx                # Root layout (font, dark mode init)
│   │   ├── page.tsx                  # Root route → redirects to /dashboard
│   │   ├── globals.css               # Global styles, Tailwind base, custom animations
│   │   ├── login/
│   │   │   ├── page.tsx              # Login UI
│   │   │   └── actions.ts            # Server Actions: login(), signup(), logout()
│   │   ├── register/
│   │   │   └── page.tsx              # Registration instructions (static, no form)
│   │   ├── account-deleted/
│   │   │   └── page.tsx              # Confirmation page after account deletion
│   │   └── dashboard/
│   │       ├── layout.tsx            # Dashboard shell: Sidebar + Header + providers
│   │       ├── page.tsx              # Dashboard overview (server component)
│   │       ├── devices/
│   │       │   └── page.tsx          # Device list (server component)
│   │       ├── dosage-history/
│   │       │   └── page.tsx          # Dosage history (client component)
│   │       ├── settings/
│   │       │   └── page.tsx          # Settings (client component)
│   │       └── help/
│   │           └── page.tsx          # Help & FAQ (client component)
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Sidebar.tsx           # Left nav sidebar
│   │   │   ├── Header.tsx            # Top header bar
│   │   │   ├── SidebarContext.tsx    # Mobile sidebar open/close state
│   │   │   ├── DateRangePicker.tsx   # Custom date range picker component
│   │   │   └── Skeletons.tsx         # Loading skeleton components
│   │   ├── dashboard/
│   │   │   ├── DashboardContent.tsx  # Dashboard stat cards + activity feed
│   │   │   └── DevicesContent.tsx    # Device grid cards
│   │   ├── charts/
│   │   │   └── DosageChart.tsx       # Recharts bar chart for dosage history
│   │   └── providers/
│   │       ├── UserContext.tsx        # React context: current user + profile
│   │       └── NotificationProvider.tsx  # Supabase Realtime toast notifications
│   │
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts             # Browser Supabase client (singleton)
│   │       ├── server.ts             # Server-side Supabase client (cookie-based)
│   │       └── middleware.ts         # Session refresh helper for Next.js middleware
│   │
│   ├── types/
│   │   └── database.ts               # TypeScript interfaces for all DB tables
│   │
│   └── middleware.ts                 # Next.js middleware — auth session refresh on every request
│
├── public/                           # Static assets
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## Rendering Strategy

The app uses a hybrid rendering approach enabled by the Next.js App Router:

- **Server Components** — Dashboard overview (`/dashboard/page.tsx`) and Devices (`/dashboard/devices/page.tsx`) fetch data server-side on each request. No loading spinners — data arrives with the page.
- **Client Components** — Dosage History, Settings, and Help pages are `'use client'` components. They fetch data from the Supabase client in the browser via `useEffect`/`useCallback`.
- **Server Actions** — Login, signup, and logout are Next.js Server Actions (`'use server'`) in `src/app/login/actions.ts`.

---

## Data Flow

```
Hardware Device → Supabase (medical_raw INSERT) → Realtime channel → NotificationProvider toast
                                                ↓
                                     Browser fetches on page load / date change
                                                ↓
                                         Dashboard / History UI
```

---

## Authentication Pattern

All `/dashboard/*` routes are protected. The middleware (`src/middleware.ts`) runs on every request and calls `updateSession()` which:

1. Reads the session cookie.
2. Refreshes the token if needed.
3. Redirects to `/login` if no valid session exists.

See [Authentication]({% link developer-guide/authentication.md %}) for full details.
