---
title: Registration
layout: default
parent: User Guide
nav_order: 2
---

# Registration
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## How Registration Works

> **Note:** Account registration does **not** happen on this website. You cannot sign up directly at the login page. Accounts are created through your **Patch Medical device's built-in setup portal**.

This is intentional — each account is tied to a physical device. The device guides you through account creation the first time it is powered on and connected to WiFi.

> **Current Status:** The automated device registration flow is currently in development. During this period, account setup is coordinated manually. Contact your Patch Medical representative to get your account created and device linked.

---

## What to Expect (Once Automated Registration is Available)

When the full device-based registration flow is live, the process will work as follows:

### Step 1 — Power on your device

Turn on your Patch Medical device. The LED indicator will blink to show it is ready for setup.

### Step 2 — Connect to the device's WiFi hotspot

On your phone or computer, open your WiFi settings and connect to the network named:

```
Patch-XXXX
```

where `XXXX` is your specific device ID (printed on the device label).

### Step 3 — Open the device setup portal

Once connected to the device's WiFi, a setup page will open automatically in your browser. If it does not open automatically, navigate to:

```
http://192.168.4.1
```

### Step 4 — Create your caregiver account

Follow the on-screen instructions in the device portal to:
- Enter your home WiFi credentials (so the device can connect to the internet)
- Create your caregiver account with an email address and password

### Step 5 — Return here to log in

Once setup is complete, the device connects to your home WiFi and starts logging data. Return to [https://patch-web-app.vercel.app/login](https://patch-web-app.vercel.app/login) and sign in with the credentials you created.

---

## Linking Additional Caregivers

A single device can be associated with multiple caregiver accounts. Currently, additional caregivers must be added by your Patch Medical administrator. There is no self-service option to invite or add caregivers from the web dashboard.

---

## Need Help?

If you're having trouble with setup, contact your healthcare provider or Patch Medical representative directly.
