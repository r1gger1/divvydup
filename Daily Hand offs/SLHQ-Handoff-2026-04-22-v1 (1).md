# DivvyDup Handoff — April 22, 2026 — v1

## Session Summary
- **Date:** April 22, 2026
- **Goal:** No new work — fresh handoff capturing the full current state of DivvyDup
- **What was accomplished:** Documentation only — no code changes, no deploys
- **What is still in progress:** Auth redirect bug, logout bug, missing "Forgot password"

---

## What Was Done This Session
No code changes. This handoff is a clean-slate document synthesized from all prior sessions and project memory.

---

## Current State of DivvyDup

### What's Working
- **Landing page** — live at divvydup.com, brand-compliant (Playfair Display + Instrument Sans, SLHQ dark theme)
- **Hero:** "Your money, finally organized." — tagline: "The Book, reimagined."
- **Pricing displayed:** $5/month or $50/year (saves $10)
- **Routing:** `loading → landing → auth → setup → app` — new users see landing, existing users go straight to ledger
- **Supabase auth** — sign up (email + password), sign in, email confirmation, sign out button in header
- **Shared Supabase project** — `startinglinehq` (`bvuzrhmqcrepsevkdutt.supabase.co`) — shared auth for all suite products
- **Trial enforcement** — 3-day free trial, max 4 pages, max 2 entries per page, trial banner with days remaining
- **Paywall screen** — shows on trial expiry with mailto link to `hello@startinglinehq.com` (Stripe buttons not yet wired)
- **Expired confirmation link** — handled gracefully on auth screen (no confusing URL errors)
- **Reset flow** — signs out of Supabase AND clears localStorage (bug was fixed)
- **Magic link emails** — arriving successfully via Resend SMTP on startinglinehq.com
- **Setup wizard** (4 steps) — ledger name, paycheck frequency, category selection with monthly amounts/cushion, donor pages, advisor name
- **Floyd** — advisor character. Dry, pushback, no-nonsense. Default name is Floyd, user-renameable. Never Clippy-like.
- **Page system** — sidebar nav, per-page transaction ledger, dashboard with balance cards
- **Transaction types** — Deposit (default), Withdrawal, Transfer Out, Transfer In
- **Deposit modal** — distributes paycheck across pages with overflow rules, respects `noDispatch` flag
- **Transfer modal** — move funds between pages
- **Overflow distribution** — percentage-based routing of leftover paycheck funds
- **Auto-Balance** — donor pages in priority order, cascades if donor runs dry, preview modal
- **Reconciliation** — enter bank balance, flags differences, stamps Last Balanced timestamp
- **Edit Page modal** — rename, reorder, delete, add custom pages, icon picker, line items, tabs (This Page / All Pages / + New Page / ⚡ Donors)
- **Temporary pages** — amber border on card, amber dot in sidebar, excludes from dispatch, savings target with progress bar
- **Dashboard cards** — customizable via ✎ Customize Cards, cards wrap naturally, color legend (green/red/amber)
- **Progress bars** — blue while filling, green when fully funded
- **Charts view** — 4 charts via Chart.js
- **Reset button** — requires typing RESET to confirm, clears storage AND signs out of Supabase
- **localStorage** — single `famLedger` key, internal `_version` field, full migration chain

### What's Broken / Open Bugs
1. **Auth redirect timing bug — OPEN** — After clicking a magic link, the `access_token` appears in the URL hash but `App.jsx` doesn't catch it on page load. Users are not redirected to `/dashboard`. The `useEffect` that calls `supabase.auth.getSession()` needs to also process the token in `window.location.hash`.
2. **Logout bug — OPEN** — Session doesn't clear properly after sign-out. Details need investigation next session.
3. **No "Forgot password" — OPEN** — Sign-in modal has no forgot password option. Needs `supabase.auth.resetPasswordForEmail(email)` wired up.

### What's Untested
- Magic link login as an alternative to password login on the sign-in modal (not built yet)

---

## Files Changed
None this session.

---

## What's Next — In Priority Order

1. **Fix magic link auth redirect timing bug in App.jsx** — In the `useEffect`, after `supabase.auth.getSession()`, handle the `access_token` in `window.location.hash` so users are redirected to `/dashboard` after clicking a magic link.

   **Cursor agent prompt:**
   > In `src/App.jsx`, in the main App component's `useEffect`, after calling `supabase.auth.getSession()`, add handling so that if there is an `access_token` in the URL hash (window.location.hash), Supabase processes it and navigates the user to `/dashboard`. This fixes the magic link redirect not working.

2. **Fix logout bug** — Investigate and fix session not clearing properly after sign-out. Start by adding console logging to the sign-out handler to see what's happening.

3. **Add "Forgot password" to sign-in modal** — Add a link/button that calls `supabase.auth.resetPasswordForEmail(email)`. Password reset emails will arrive from `hello@startinglinehq.com` and land on startinglinehq.com (by design — Supabase Site URL).

4. **Add magic link as alternative login** — Option on sign-in modal to log in via magic link instead of password.

5. **Stripe payments** — Replace the mailto "early access" button on TrialExpiredScreen with real Stripe checkout buttons ($5/mo, $50/yr). Waiting on LLC/bank account formation.

6. **Floyd milestone moments** — Floyd acknowledges first deposit, a page hitting its target, first reconciliation, etc.

7. **Component splitting** — App.jsx is ~1,978 lines and growing. Split into components when warranted but not urgent.

8. **Origin story** — "About DivvyDup" or "About The Book" blurb somewhere in the app.

9. **Smarter Floyd** — Occasional check-ins if no deposit recorded in a while.

---

## Key UIDs, Config, and Account Details

### Supabase — Active Project
- **Project:** startinglinehq
- **URL:** `bvuzrhmqcrepsevkdutt.supabase.co`
- **Purpose:** Shared auth for all suite products (DivvyDup, EstatePal, StartinglineHQ)

### Supabase — Legacy (NEVER TOUCH)
- **Project:** estate-pal
- **URL:** `vrlrgrhuzkfqainelnsi.supabase.co`
- **Contains:** Lorraine's real estate data under `r1gger1@yahoo.com`

### Supabase — Deprecated
- **Project:** divvydup (old)
- **URL:** `npzpracrghkabvjosvny.supabase.co`
- **Status:** Not in use. Can be deleted when Tony chooses.

### Accounts
- **Tony's admin:** `anthonybartenope@gmail.com` — UID: `9c0395af-d74a-469e-9fab-120282566fe5`
- **Tony's work:** `tonyb@startinglinehq.com` — UID: `e5fe46d9-7323-4489-80e4-f5cfd12267f1`
- **Test (safe):** `pd3w@yahoo.com` — UID: `9bb4eeef-9860-4e3e-a9c8-b8ae0f18cdf4`
- **Protected (NEVER TOUCH):** `r1gger1@yahoo.com` — legacy project only

### Email
- **SMTP:** Resend, configured for `startinglinehq.com`
- **Sender:** `hello@startinglinehq.com`
- **DNS:** DKIM, SPF, MX, DMARC records added at Network Solutions, domain verified in Resend

### Repo & Deployment
- **GitHub:** `r1gger1/Divvydup`
- **Deploy:** Vercel auto-deploy on `git push`
- **Domain:** divvydup.com (DNS at Network Solutions, A record + CNAME to Vercel)
- **Dev:** `cd ~/Desktop/Computer\ Projects/Divvydup && npm run dev`

---

## Known Bugs and Open Issues

| # | Issue | Status | Notes |
|---|---|---|---|
| 1 | Auth redirect timing — magic link token in URL hash not caught on page load | **OPEN** | `useEffect` needs to process `window.location.hash` |
| 2 | Logout — session doesn't clear properly after sign-out | **OPEN** | Needs console logging to diagnose |
| 3 | No "Forgot password" on sign-in modal | **OPEN** | Needs `resetPasswordForEmail` wired up |
| 4 | Reset flow not signing out of Supabase | **RESOLVED** | Fixed — Reset now calls Supabase sign-out |
| 5 | Expired confirmation link showing confusing URL | **RESOLVED** | Handled gracefully on auth screen |
| 6 | Default page selection exceeding trial limit | **RESOLVED** | Capped at 4 |

---

## Architectural Notes

### Stack
- React + Vite (converted from single HTML file — old docs referencing HTML version are outdated)
- No router — plain `screen` state variable handles routing (`loading | landing | auth | setup | app`)
- Chart.js for charts
- localStorage (`famLedger`) for ledger data — not yet migrated to cloud
- Supabase for auth only (via `src/supabase.js` pointing to shared startinglinehq project)

### File Structure
```
Divvydup/
  src/
    App.jsx        ← everything lives here (~1,978 lines)
    supabase.js    ← shared startinglinehq Supabase client
    App.css
    index.css
    main.jsx
    assets/
  public/
  index.html
  package.json
  vite.config.js
```

### State Schema
Top-level state object:
`name, freq, paycheck, overflow, pages, activePage, ready, lastBalanced, overflowRules, donorPages, dashCards, advisorName, _version`

Each page object:
`id, icon, name, cat, monthly, cushion, perCheck, balance, tx, subitems, temp, noDispatch, target`

### localStorage
- Key: `famLedger` — SACRED, never change
- Internal `_version` field for migrations — never create a new top-level key
- Migration chain checks keys in order: `famLedger`, `famLedger_v5` through `famLedger_v1`

### Design
- SLHQ dark theme is the standard for all pages except ledger pages
- Ledger pages get a green tint (nod to Tony's father's paper columnar ledger)
- Fonts: Playfair Display (headings), Instrument Sans (body/UI)
- Amber `#C4820F` for primary buttons, active states, temp indicators
- Header shows: `DivvyDup · [Ledger Name]` — product name in amber gradient, ledger name in muted green

### Auth Architecture
- One login works across all suite products (DivvyDup, EstatePal, StartinglineHQ)
- EstatePal was migrated to shared startinglinehq Supabase project (April 15 session)
- Password resets land on startinglinehq.com by design (Supabase Site URL)
- Redirect URLs configured: `https://startinglinehq.com/*`, `https://estate-pal.com/*`, `https://divvydup.com/*`, `http://localhost:5173/*`

---

## Skill Updates
No skill updates needed this session.

---

## Install Command for This Handoff
```
cp ~/Downloads/SLHQ-Handoff-2026-04-22-v1.md ~/Desktop/Computer\ Projects/_Admin/SLHQ-Handoff-2026-04-22-v1.md
```

---

## To Start Next Session
1. Attach this handoff doc
2. Attach the current App.jsx:
   ```
   cp ~/Desktop/Computer\ Projects/Divvydup/src/App.jsx ~/Downloads/App.jsx
   ```
3. Tell Claude: "Continue from handoff April 22 v1 — fix the magic link auth redirect bug"
4. Safe to auto-keep in Claude Code for this fix (single-file, touches auth flow but is a targeted change)

---

*Floyd says: the ledger's balanced. Now go fix that redirect.*
