---
title: Dashboard
layout: default
parent: User Guide
nav_order: 4
---

# Dashboard
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Dashboard (`/dashboard`) is the first page you see after logging in. It gives you an at-a-glance summary of your patient's medication activity. All data on this page is fetched live from Supabase each time the page loads.

---

## Stat Cards

Four summary cards appear at the top of the dashboard:

### Last Dose
Shows how long ago the most recent dose event was recorded (e.g. "12 min ago", "Yesterday"). Below the time, it shows whether that dose was **✓ Successful** or **⚠ Check status**. If no data exists yet, it shows "No data".

### Today's Doses
The number of dose events logged since midnight today (in your browser's local timezone).

### This Week
The total number of dose events in the last 7 days.

### Active Devices
Shows `active / total` — for example `1/2` — and a progress bar indicating the proportion of your linked devices that are currently marked active. A device is "active" based on the `is_active` flag set on the device record.

---

## Quick Action Cards

Below the stats are two navigation shortcuts:

| Card | Goes to |
|---|---|
| **Device Information** | `/dashboard/devices` — full device list |
| **Dosage History** | `/dashboard/dosage-history` — full history with chart and export |

---

## Recent Activity Feed

The bottom section shows the **5 most recent dose events** across all your linked devices. Each entry shows:

- A **colour indicator** — green dot for `Success`, amber dot for any other status
- The event label: "Dose Administered" (Success) or "Dose Attempted" (anything else)
- The **exact timestamp** of the dose
- A **status badge** — the raw `status_log` value from the device (e.g. `Success`, or another string)

If there are more than 5 recent records, a "View all history →" link appears to go to the full dosage history page.

If no records exist yet, a placeholder message is shown: *"No dosage records yet. Data will appear here once devices start logging."*

---

## Real-Time Toast Notifications

While you have the dashboard (or any dashboard page) open in your browser, the app maintains a **live connection to Supabase Realtime**. When a new dose event is inserted into the database by your device, a **toast notification** appears automatically in the bottom-right corner — without needing to refresh the page.

- ✅ **Green toast** — dose was `Success`
- ⚠️ **Amber toast** — dose was attempted but status is not `Success`

Toasts auto-dismiss after **5 seconds**, or you can click the × to dismiss manually. Up to 5 toasts can be queued at once.

> **Note:** The bell icon in the top-right header is a UI placeholder and is currently disabled. It is not connected to the toast notification system.
