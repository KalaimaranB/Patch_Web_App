---
title: Devices
layout: default
parent: User Guide
nav_order: 5
---

# Devices
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Devices page (`/dashboard/devices`) lists all Patch Medical hardware devices that are linked to your account. Each device is displayed as a card with key status information.

---

## Device Card Details

Each card shows the following for a single device:

| Field | Description |
|---|---|
| **Active / Inactive badge** | Whether the device is currently marked active in the database |
| **MAC Address** | The hardware MAC address of the device (displayed in monospace) |
| **Connection** | Online (animated green dot) or Offline, based on the `is_active` flag |
| **Firmware** | The firmware version string stored for this device, or "Unknown" if not set |
| **Total Doses** | The total number of dose records in the database for this device across all time |
| **Last Activity** | The timestamp of the most recent dose event, plus its status badge |
| **Your Role** | Your access role for this device (e.g. "Owner") as stored in the `user_devices` table |

---

## Active vs. Inactive

A device shows as **Active / Online** when its `is_active` field in the database is `true`. This field is updated by the device itself or by an administrator. The dashboard does not directly poll the device for its live connectivity — it reflects the stored value.

This means a device may appear "Active" even if it has temporarily lost connection, until the device next updates its status.

---

## No Devices State

If your account has no linked devices, the page shows:

> *"No Devices Found. Devices linked to your account will appear here. Contact your administrator to link a device to your account."*

---

## Limitations

> **You cannot add, remove, or rename devices from this page.** Device management (linking devices to accounts) is handled by your Patch Medical administrator and is not available as a self-service feature in the web dashboard.

> **Battery level is not shown.** The icon that appears next to "Total Doses" is a visual indicator only — it does not represent actual battery percentage. Battery monitoring is not currently implemented.
