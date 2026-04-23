# DivvyDup Sign Out Fix

## Problem
Sign out doesn't clear localStorage. When user clicks "Open →" from hub, onAuthStateChange finds saved ledger state and auto-restores session, bypassing landing page.

## Solution
Add `localStorage.removeItem('divvydup_ledger_v5')` to both Sign Out buttons.

Line 586 and line 624 in src/App.jsx
