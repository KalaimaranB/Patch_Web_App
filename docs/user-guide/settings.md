---
title: Settings
layout: default
parent: User Guide
nav_order: 7
---

# Settings
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Settings page (`/dashboard/settings`) lets you manage your profile name, appearance preferences, and account data. It is divided into four sections: **Profile**, **Notifications**, **Appearance**, and **Danger Zone**.

---

## Profile

### Display Name
You can update your **preferred display name** — the name shown in the "Welcome back, …" greeting on the dashboard and in the header. Enter a new name in the field and click **Save Changes** at the bottom of the page.

### Email Address
Your email address is shown but **cannot be changed** from this page. It is read-only.

---

## Notifications

Three toggle switches are shown:

| Toggle | Description |
|---|---|
| Dosage Alerts | Get notified when a dose is administered |
| Device Status | Alerts when a device goes offline |
| Weekly Report | Summary of weekly dosage activity |

> **Important:** These toggles are currently **UI-only**. Turning them on or off does not save any preference to the server, and does not enable any actual notifications. The state resets every time you navigate away from the Settings page. This feature is planned for a future release.

---

## Appearance

### Dark Mode

A toggle switch controls the **dark/light theme** of the dashboard. Clicking it immediately switches the interface.

The preference is saved to your browser's `localStorage`. This means:
- It **persists across page refreshes and browser restarts** on the same device and browser.
- It is **not synced to your account** — if you switch to a different browser or device, it will not carry over.

---

## Danger Zone

This section contains two irreversible account actions. Both require confirmation before executing.

### Wipe My Data

Clicking **Wipe Data** opens a confirmation modal. If you confirm, all **medical records** (dosage history) associated with your account's devices are permanently deleted from the database. Your account itself remains active.

This action cannot be undone.

### Delete My Account and All My Data

Clicking **Delete Account** opens a confirmation modal. To proceed, you must type the exact phrase:

```
DELETE MY ACCOUNT
```

If confirmed, your account and all associated data are permanently deleted. You will be signed out and redirected to a confirmation page. **This action cannot be undone.**

---

## Saving Changes

The blue **Save Changes** button at the bottom of the page saves only your **Profile** (preferred name). It does not save notification toggles. After saving, the button briefly shows "Saved!" with a checkmark.
