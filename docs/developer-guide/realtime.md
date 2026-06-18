---
title: Realtime
layout: default
parent: Developer Guide
nav_order: 6
---

# Realtime Notifications
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The app uses **Supabase Realtime** to display live toast notifications when a new dose event is recorded by a device. This works without any page refresh — the notification appears within seconds of the database row being inserted.

---

## Implementation

**File:** `src/components/providers/NotificationProvider.tsx`

The `NotificationProvider` is rendered at the dashboard layout level, wrapping all dashboard pages. It maintains a Supabase Realtime channel for the duration of the user's session on any dashboard page.

---

## Channel Setup

```typescript
const channel = supabase
  .channel('dosage-notifications')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'medical_raw',
      filter: `device_id=in.(${deviceIds.join(',')})`,
    },
    (payload) => {
      // handle new dose event
    }
  )
  .subscribe()
```

| Property | Value |
|---|---|
| Channel name | `'dosage-notifications'` |
| Event type | `INSERT` only |
| Table | `medical_raw` |
| Filter | `device_id=in.(id1,id2,...)` — scoped to the user's own devices |

The channel is only created after the user's device IDs are fetched. If the user has no linked devices, no channel is opened.

---

## Notification Logic

When a new `INSERT` event fires on `medical_raw`:

1. The `status_log` field of the new row is read.
2. If `status_log === 'Success'` → a **green success toast** is shown.
3. Otherwise → an **amber warning toast** is shown.

```typescript
const notification: Notification = {
  id: crypto.randomUUID(),
  type: isSuccess ? 'success' : 'warning',
  title: isSuccess ? 'Dose Administered' : 'Dose Attempted',
  message: isSuccess
    ? 'A new dose was successfully administered.'
    : 'A dose was attempted but may need attention.',
  timestamp: new Date(),
}
```

---

## Toast Behaviour

- Toasts appear in the **bottom-right corner** of the screen.
- Up to **5 toasts** are shown simultaneously (older ones are dropped when the queue exceeds 5).
- Each toast **auto-dismisses after 5 seconds**.
- The user can dismiss a toast early by clicking the **× button**.

---

## Cleanup

When the user navigates away from the dashboard entirely (component unmounts), the channel is cleaned up:

```typescript
return () => {
  supabase.removeChannel(channel)
}
```

---

## Supabase Configuration Required

For Realtime to work, you must enable it on the `medical_raw` table in your Supabase project:

1. Go to **Supabase Dashboard → Database → Replication**.
2. Under **Realtime**, enable the `medical_raw` table.

Without this, the `.subscribe()` call will succeed but no events will be delivered.

---

## Relationship to the Header Notification Bell

> **Important:** The bell icon (🔔) in the top-right of the header is **not connected** to this Realtime system. It is a disabled UI placeholder marked "Coming Soon". The bell does not count or display notifications. Realtime events are only surfaced as toast popups.
