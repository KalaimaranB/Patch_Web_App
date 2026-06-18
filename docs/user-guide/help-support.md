---
title: Help & Support
layout: default
parent: User Guide
nav_order: 8
---

# Help & Support
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## In-App Help Page

The Help page (`/dashboard/help`) inside the application contains a FAQ accordion and contact options.

### Available Contact Options

| Option | Status |
|---|---|
| **Email Support** | Opens a `mailto:` link — no support email address is configured yet |
| **Live Chat** | Shown in the UI but currently disabled ("Coming Soon") |
| **Documentation** | Shown in the UI but currently disabled ("Coming Soon") |

---

## Frequently Asked Questions

The in-app Help page includes answers to these questions:

**How do I connect a new device?**
Power on the Patch device. It will appear in your dashboard once connected via WiFi. (Note: device setup is currently manually coordinated — see [Registration]({% link user-guide/registration.md %}).)

**Why is my device showing as offline?**
The device may have lost WiFi or been powered off. Check that it is plugged in and your WiFi is working. It should reconnect automatically.

**How accurate is the dosage tracking?**
Devices use precision sensors. Each dose is timestamped and logged automatically.

**Can I export my dosage history?**
Yes — go to [Dosage History]({% link user-guide/dosage-history.md %}) and click Export. Note that the export only covers the current page of results (up to 20 records).

**How do I add another caregiver?**
Additional caregivers are added by your administrator. There is no self-service option in the dashboard.

**Is my health data secure?**
All data is encrypted in transit and at rest using industry-standard security practices via Supabase.

---

## Known Limitations

The following features are **not yet implemented** or are **UI-only** in the current version of the application:

| Feature | Status |
|---|---|
| Forgot password / password reset | ❌ Not implemented |
| Self-service device registration | ❌ Not implemented (manually coordinated) |
| Self-service device linking/unlinking | ❌ Not implemented (admin-only) |
| Notification preference saving | ❌ Toggles in Settings are UI-only, not saved |
| Dark mode synced to your account | ⚠️ Browser-local only (localStorage), not synced across devices |
| CSV export of full filtered dataset | ⚠️ Only exports current page (20 records) |
| Header notification bell | ❌ UI placeholder, disabled |
| Live Chat support | ❌ UI placeholder, "Coming Soon" |
| In-app Documentation link | ❌ UI placeholder, "Coming Soon" |
| Multi-caregiver role management UI | ❌ Not implemented (data model supports it; no UI yet) |
| Email change | ❌ Disabled — email cannot be changed |

---

## Getting Help

If you encounter an issue not covered here, contact your Patch Medical administrator or healthcare provider directly.
