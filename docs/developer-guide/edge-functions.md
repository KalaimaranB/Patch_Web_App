---
title: Edge Functions
layout: default
parent: Developer Guide
nav_order: 5
---

# Supabase Edge Functions
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Two Supabase Edge Functions are called from the **Settings Danger Zone**. The function source code is not part of this repository — they are deployed separately to Supabase. This page documents the **API contract** each function expects.

Both functions require the caller to be authenticated. The client passes the current user's JWT access token in an `Authorization: Bearer` header.

---

## `delete_user_data`

Permanently deletes all **medical records** associated with the authenticated user's devices. The user's account remains intact.

### Called from

`src/app/dashboard/settings/page.tsx` — "Wipe My Data" button.

### Request

```
POST https://<your-project-ref>.supabase.co/functions/v1/delete_user_data
```

**Headers:**

| Header | Value |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer <user_access_token>` |

**Body:**

```json
{
  "confirm": true
}
```

The `confirm: true` field acts as an explicit intent flag. The function should reject the request if this field is absent or `false`.

### Response

**Success (`200 OK`):**

```json
{
  "success": true
}
```

**Error (`4xx` / `5xx`):**

```json
{
  "error": "Human-readable error message"
}
```

### Expected Side Effects

- All rows in `medical_raw` where `device_id` is in the user's `user_devices` are deleted.
- `user_devices` and `devices` rows are **not** deleted.
- The user's `profiles` row is **not** deleted.

---

## `delete-user-rpc`

Permanently deletes the authenticated user's **account and all associated data**. This is a full account teardown.

### Called from

`src/app/dashboard/settings/page.tsx` — "Delete Account" button (after typing `DELETE MY ACCOUNT` in the confirmation modal).

### Request

```
POST https://<your-project-ref>.supabase.co/functions/v1/delete-user-rpc
```

**Headers:**

| Header | Value |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer <user_access_token>` |

**Body:**

```json
{
  "confirm": true
}
```

### Response

**Success (`200 OK`):**

```json
{
  "success": true
}
```

**Error (`4xx` / `5xx`):**

```json
{
  "error": "Human-readable error message"
}
```

### Expected Side Effects

After a successful response, the client calls `supabase.auth.signOut()` and redirects to `/account-deleted`. The function is expected to have already:

- Deleted all rows in `medical_raw` for the user's devices.
- Deleted all rows in `user_devices` for this user.
- Deleted the user's `profiles` row.
- Deleted the user from `auth.users` (using the Supabase service role key, which only the Edge Function has access to).

---

## Client-Side Error Handling

The web app handles errors from both functions the same way:

```typescript
const response = await fetch(url, { method: 'POST', headers, body })
const data = await response.json()

if (!response.ok) {
  throw new Error(data.error || 'Fallback error message')
}
```

The error message from the function's `error` field is displayed in the modal. If the fetch itself fails (network error), the thrown error message is shown instead.
