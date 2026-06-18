---
title: Database Schema
layout: default
parent: Developer Guide
nav_order: 3
---

# Database Schema
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The database is hosted on **Supabase (PostgreSQL)**. There are four tables. TypeScript interfaces for all tables are defined in [`src/types/database.ts`](https://github.com/Patch-Medical-Technologies/Patch_Web_Application/blob/main/patch-app/src/types/database.ts).

---

## `profiles`

Stores caregiver profile information. One row per authenticated user.

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | `uuid` | No | Primary key — matches `auth.users.id` (FK) |
| `preferred_name` | `text` | Yes | Display name shown in the dashboard greeting |
| `age` | `int` | Yes | Caregiver age (not currently displayed in UI) |
| `date_of_birth` | `date` | Yes | Caregiver date of birth (not currently displayed in UI) |
| `created_at` | `timestamptz` | No | Row creation timestamp |
| `updated_at` | `timestamptz` | Yes | Set on profile save in Settings |

```typescript
interface Profile {
  id: string
  preferred_name: string | null
  age: number | null
  date_of_birth: string | null
  created_at: string
}
```

---

## `devices`

Stores each physical Patch Medical hardware device. One row per device.

| Column | Type | Nullable | Description |
|---|---|---|---|
| `device_id` | `uuid` | No | Primary key |
| `mac_address` | `text` | No | Hardware MAC address (displayed in device card) |
| `firmware_version` | `text` | Yes | Firmware version string (e.g. `"v1.2.3"`) |
| `is_active` | `boolean` | Yes | Whether the device is currently considered active |
| `created_at` | `timestamptz` | No | Row creation timestamp |

```typescript
interface Device {
  device_id: string
  mac_address: string
  firmware_version: string | null
  is_active: boolean | null
  created_at: string
}
```

---

## `user_devices`

Join table linking users (caregivers) to devices. Supports many-to-many (one device can have multiple caregivers; one caregiver can have multiple devices).

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | `int` | No | Primary key (auto-increment) |
| `user_id` | `uuid` | No | FK → `auth.users.id` |
| `device_id` | `uuid` | No | FK → `devices.device_id` |
| `role` | `text` | Yes | Caregiver role for this device (e.g. `"owner"`) |

```typescript
interface UserDevice {
  id: number
  user_id: string
  device_id: string
  role: string | null
}
```

---

## `medical_raw`

Stores individual dose events sent by devices. This is the primary data table. One row per dose attempt.

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | `uuid` | No | Primary key |
| `device_id` | `uuid` | No | FK → `devices.device_id` |
| `dosage_start_time` | `timestamptz` | No | When the dose was initiated |
| `dosage_end_time` | `timestamptz` | Yes | When the dose completed. `null` if not yet completed |
| `status_log` | `text` | Yes | Outcome string. `'Success'` = succeeded; any other value = failed/other |
| `created_at` | `timestamptz` | Yes | Row creation timestamp |
| `payload` | `jsonb` | Yes | Raw JSON payload from the device (schema defined by firmware) |

```typescript
interface MedicalRaw {
  id: string
  device_id: string
  dosage_start_time: string
  dosage_end_time: string | null
  status_log: string | null
  created_at: string | null
  payload: Record<string, unknown> | null
}
```

### Status Values

The `status_log` field is a free-form string written by the device firmware. The app specifically checks for the value `'Success'` (exact string, case-sensitive) and treats all other values as non-successful. No other values are currently standardised — check your firmware for the set of possible values.

---

## Row Level Security

RLS should be enabled on all four tables. Recommended policies:

```sql
-- profiles: user can only see/edit their own row
CREATE POLICY "profiles_own" ON profiles
  USING (id = auth.uid());

-- user_devices: user can only see their own links
CREATE POLICY "user_devices_own" ON user_devices
  USING (user_id = auth.uid());

-- medical_raw: user can only see records from their devices
CREATE POLICY "medical_raw_own_devices" ON medical_raw
  USING (
    device_id IN (
      SELECT device_id FROM user_devices WHERE user_id = auth.uid()
    )
  );
```
