---
title: Local Setup
layout: default
parent: Developer Guide
nav_order: 2
---

# Local Setup
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Prerequisites

- **Node.js** v20 or higher (check with `node -v`)
- **npm** v9 or higher (bundled with Node)
- A **Supabase project** with the required schema (see [Database Schema]({% link developer-guide/database-schema.md %}))

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Patch-Medical-Technologies/Patch_Web_Application.git
cd Patch_Web_Application/patch-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the `patch-app/` directory:

```bash
cp .env.local.example .env.local   # if an example exists, otherwise create manually
```

Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Both values are found in your Supabase project under **Settings → API**.

> **Security:** The `NEXT_PUBLIC_` prefix means these values are exposed to the browser. This is intentional and safe for the Supabase anon key, which is designed to be public. Row Level Security (RLS) in Supabase enforces access control.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000). It redirects to `/login` if you are not authenticated, or to `/dashboard` if you are.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Build the production bundle |
| `npm start` | Start the production server (after build) |
| `npm run lint` | Run ESLint across the project |

---

## Supabase Requirements

The app expects the following to be set up in your Supabase project:

### Tables
See [Database Schema]({% link developer-guide/database-schema.md %}) for full column definitions.

- `profiles`
- `devices`
- `user_devices`
- `medical_raw`

### Row Level Security

RLS must be enabled on all tables. The policies should ensure:

- Users can only read rows from `profiles` where `id = auth.uid()`
- Users can only read rows from `user_devices` where `user_id = auth.uid()`
- Users can only read rows from `medical_raw` where `device_id` is in their `user_devices`

### Edge Functions

Two Edge Functions must be deployed to Supabase for the Settings Danger Zone to work:

- `delete_user_data` — deletes all medical records for the user
- `delete-user-rpc` — deletes the user's Auth account and all data

See [Edge Functions]({% link developer-guide/edge-functions.md %}) for the API contract.

### Realtime

Enable Realtime on the `medical_raw` table in your Supabase project (**Database → Replication → Realtime**) for live toast notifications to work.

---

## Deployment

The app is deployed on [Vercel](https://vercel.com/). To deploy your own instance:

1. Import the `patch-app/` folder as a Vercel project (set root directory to `patch-app`).
2. Add the same environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings.
3. Deploy.
