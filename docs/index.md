---
title: Home
layout: home
nav_order: 1
---

# Patch Medical — Documentation
{: .fs-9 }

Official documentation for the Patch Medical caregiver dashboard.
{: .fs-5 .fw-300 }

[Open the App](https://patch-web-app.vercel.app/login){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View on GitHub](https://github.com/Patch-Medical-Technologies/Patch_Web_Application){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## What is Patch Medical?

Patch Medical is a web-based caregiver dashboard for monitoring **medication delivery from Patch Medical hardware devices**. Caregivers log in to see real-time dosage events, review historical records, and monitor the health of connected devices.

> **Current Status:** The application is under active development. Some features shown in the UI are not yet functional. These are clearly marked throughout the documentation.

---

## Documentation

### 👤 User Guide
*For caregivers using the Patch Medical dashboard.*

| Page | Description |
|---|---|
| [Getting Started]({% link user-guide/getting-started.md %}) | Overview and prerequisites |
| [Registration]({% link user-guide/registration.md %}) | How to create an account via your device |
| [Login & Logout]({% link user-guide/login-logout.md %}) | Signing in and out of the dashboard |
| [Dashboard]({% link user-guide/dashboard.md %}) | Understanding the home dashboard |
| [Devices]({% link user-guide/devices.md %}) | Viewing your connected devices |
| [Dosage History]({% link user-guide/dosage-history.md %}) | Viewing, filtering, and exporting dosage records |
| [Settings]({% link user-guide/settings.md %}) | Profile, appearance, and account management |
| [Help & Support]({% link user-guide/help-support.md %}) | FAQs, contact, and known limitations |

---

### 🛠 Developer Guide
*For engineers contributing to or deploying the Patch Medical web application.*

| Page | Description |
|---|---|
| [Architecture]({% link developer-guide/architecture.md %}) | Tech stack and project structure |
| [Local Setup]({% link developer-guide/setup.md %}) | Running the app locally |
| [Database Schema]({% link developer-guide/database-schema.md %}) | Supabase tables and TypeScript types |
| [Authentication]({% link developer-guide/authentication.md %}) | Auth flow, middleware, and session management |
| [Edge Functions]({% link developer-guide/edge-functions.md %}) | Supabase Edge Function API contracts |
| [Realtime]({% link developer-guide/realtime.md %}) | Supabase Realtime subscription for live notifications |
| [Known Issues]({% link developer-guide/known-issues.md %}) | Bugs, UI-only stubs, and planned work |
