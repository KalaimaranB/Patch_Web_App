---
title: Authentication
layout: default
parent: Developer Guide
nav_order: 4
---

# Authentication
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Authentication is handled by **Supabase Auth** using the email/password provider. The `@supabase/ssr` package is used to correctly manage sessions in both Server Components and Client Components via cookies (rather than `localStorage`).

---

## Supabase Clients

Two separate client instances are used:

### Server Client — `src/lib/supabase/server.ts`

Used in **Server Components**, **Server Actions**, and the middleware. Reads and writes cookies using Next.js's `cookies()` API.

```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

This client calls `getUser()` on every render, which makes a network request to Supabase to verify the token. This is intentional for security — it prevents forged session cookies from bypassing auth.

### Browser Client — `src/lib/supabase/client.ts`

Used in **Client Components** (`'use client'`). Returns a singleton to avoid creating multiple GoTrue connections.

```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

---

## Middleware — Session Refresh

**File:** `src/middleware.ts` + `src/lib/supabase/middleware.ts`

The middleware runs on **every request** (except static files and images, as configured in `middleware.ts`). It calls `updateSession()` which:

1. Reads the Supabase session from the request cookies.
2. If the access token is expired, refreshes it using the refresh token.
3. Writes the updated cookies back to the response.
4. If no valid session exists at all, redirects the user to `/login`.

```typescript
// src/middleware.ts
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

This means all `/dashboard/*` routes are automatically protected — no manual auth checks are needed on individual pages.

---

## Server Actions

Login, signup, and logout are Next.js **Server Actions** in `src/app/login/actions.ts`.

### `login(formData: FormData)`

Calls `supabase.auth.signInWithPassword()`. On success, revalidates the layout cache and redirects to `/dashboard`. On failure, returns `{ error: string }` to be shown in the login form.

### `signup(formData: FormData)`

Calls `supabase.auth.signUp()`. Exists in code but is **not exposed in any UI** — account creation is handled through the device portal, not the web app directly.

### `logout()`

Calls `supabase.auth.signOut()`, revalidates the layout, and redirects to `/login`. Called via a `<form action={logout}>` element in the Header.

---

## User Context

**File:** `src/components/providers/UserContext.tsx`

A React context that fetches and caches the current user's auth data and profile (preferred name) on the client side. It is provided at the dashboard layout level and consumed by the Header component to display the user's name and initials.

```typescript
const { user, loading } = useUser()
// user.email, user.profile.preferred_name
```

---

## Session Persistence

Sessions are stored as **HTTP-only cookies** managed by `@supabase/ssr`. They persist across browser restarts. Closing a tab does not log the user out. Sessions expire when the refresh token expires (configured in your Supabase project).

---

## Password Reset

> **Not implemented.** There is currently no "Forgot Password" link or password reset flow in the application. If needed, this would be implemented using `supabase.auth.resetPasswordForEmail()`.
