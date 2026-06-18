---
title: Login & Logout
layout: default
parent: User Guide
nav_order: 3
---

# Login & Logout
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Logging In

1. Go to **[https://patch-web-app.vercel.app/login](https://patch-web-app.vercel.app/login)**
2. Enter the **email address** and **password** you set up during device registration.
3. Click **Sign in**.
4. On success, you will be redirected automatically to the **Dashboard**.

If your credentials are incorrect, an error message will appear beneath the form. Check that your email has no typos and that Caps Lock is off.

### What if I forgot my password?

> **Known Limitation:** There is currently no "Forgot Password" or password reset feature in the application. If you cannot log in, contact your Patch Medical administrator to have your password reset.

---

## Session Persistence

Your session is managed securely via cookies. You will remain logged in across browser sessions until you explicitly sign out or your session expires. Closing the browser tab does not log you out.

---

## Logging Out

To sign out:

1. Find the **sign-out button** in the top-right corner of the header (a small arrow-out-of-box icon).
2. Click it. You will be signed out immediately and redirected to the login page.

All session data is cleared on logout.

---

## Security

- Passwords are never stored in plaintext — authentication is handled entirely by [Supabase Auth](https://supabase.com/auth).
- All communication between your browser and the server uses HTTPS.
- Sessions are refreshed automatically in the background using secure cookies.
