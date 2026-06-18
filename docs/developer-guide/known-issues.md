---
title: Known Issues
layout: default
parent: Developer Guide
nav_order: 7
---

# Known Issues & Planned Work
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

This page documents the current gaps between what the UI shows and what is actually implemented in the backend. It is intended to give developers and contributors an honest picture of the application's current state.

---

## UI-Only Features (Not Functional)

These features have a fully rendered UI but do **not** save data to or read data from the backend.

### Notification Preference Toggles (Settings page)

The three toggle switches under "Notifications" (Dosage Alerts, Device Status, Weekly Report) are rendered as interactive toggles but their state:
- Is **not persisted** to the database or any server-side store.
- Is **local component state only** — resets to defaults (`dosageAlerts: true`, `deviceStatus: true`, `weeklyReport: false`) every time the Settings page is navigated to.
- Has **no effect** on any actual notification delivery.

**What needs to be built:** A `notification_preferences` column or table in Supabase, a save path via `handleSave`, and actual notification delivery logic (email, push, etc.).

---

### Header Notification Bell

The bell icon in the top-right of the header is rendered as a disabled button with `title="Notifications coming soon"`. It is not connected to the Realtime notification system.

**What needs to be built:** A notification centre panel, badge count display, and connection to the existing `NotificationProvider` Realtime events.

---

### Help Page — Live Chat Card

The "Live Chat" card on the Help page is rendered with `opacity-60 cursor-not-allowed` and a "Soon" badge. No chat provider is integrated.

---

### Help Page — Documentation Card

The "Documentation" card on the Help page is rendered with `opacity-60 cursor-not-allowed` and a "Soon" badge. It would eventually link to this documentation site.

---

## Missing Features

Features that have no implementation yet (no UI, no backend).

### Password Reset

There is no "Forgot Password" link on the login page and no password reset flow. Users who forget their password must contact an administrator.

**Implementation path:** `supabase.auth.resetPasswordForEmail()` + a reset password page at `/auth/reset-password`.

---

### Self-Service Device Registration

Users cannot create an account or link a device from the web app. The `/register` page shows instructions for using the device's built-in portal, but this flow is currently handled manually. Automated device-based registration is in development.

---

### Self-Service Device Management

Users cannot add, remove, or rename devices from the web app. The Devices page is read-only. Device-to-account linking is performed by an administrator directly in the database.

---

### Email Address Change

The email field in Settings is read-only with a note "Email cannot be changed". No UI or backend path exists for changing the email address.

**Implementation path:** `supabase.auth.updateUser({ email: newEmail })` + email verification flow.

---

### Multi-Caregiver Role Management

The `user_devices` table has a `role` column supporting multiple caregivers per device. The role is displayed on the device card, but there is no UI to invite, manage, or remove caregivers. This is admin-only via direct database access.

---

## Partial Implementations / Limitations

Features that work but have notable gaps.

### CSV Export — Current Page Only

The Export button on the Dosage History page downloads only the **current page** of results (up to 20 records), not the full filtered dataset. If a user has 500 records in a date range and is on page 3, the export file will contain only the 20 records on page 3.

**Fix:** Perform a separate query without `.range()` for the export, or stream a full dataset response.

---

### Dark Mode — Browser-Local Only

The dark mode toggle saves to `localStorage` under the key `'theme'`. It is not persisted to the user's profile in Supabase. Users who log in from a different browser or device will not have their preference applied automatically.

**Fix:** Save `dark_mode: boolean` to the `profiles` table and apply it server-side or via `UserContext` on load.

---

### `signup()` Server Action — Unreachable from UI

`src/app/login/actions.ts` exports a `signup()` server action that calls `supabase.auth.signUp()`. This function is not called anywhere in the UI. The `/register` page is a static instruction page, not a sign-up form.

This is not a bug — it reflects the design decision that account creation happens on the device, not in the web app. The function can be safely removed if it will never be used, or connected to a future web-based registration form.

---

## Supabase Project Reference Hard-coded in Code

The Edge Function URLs in `src/app/dashboard/settings/page.tsx` contain a **hard-coded Supabase project URL**:

```typescript
// delete_user_data call
await fetch('https://rylgzpjewjamxkvhtbos.supabase.co/functions/v1/delete_user_data', ...)

// delete-user-rpc call
await fetch('https://rylgzpjewjamxkvhtbos.supabase.co/functions/v1/delete-user-rpc', ...)
```

**Fix:** Replace with `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/delete_user_data` to make it portable across environments.
