## Suite Context — Read First

Before doing anything else, read these three files:
- `/Users/T-Bone/Desktop/Computer Projects/_Admin/_Suite/VISION.md`
- `/Users/T-Bone/Desktop/Computer Projects/_Admin/_Suite/ARCHITECTURE.md`
- `/Users/T-Bone/Desktop/Computer Projects/_Admin/_Suite/MIGRATION-RULES.md`

These are non-negotiable. They tell you what this app is part of, what the shared database looks like, and what you must never do in a migration.

---

# Claude Code — DivvyDup (DVYP)

A master TODO list lives at:
`/Users/T-Bone/Desktop/Computer Projects/_Admin/TODO.md`

This is the single source of truth for all outstanding work across the StartingLine HQ suite.

---

## Handoff Naming

All handoffs for this project must be named: `DVYP-Handoff-YYYY-MM-DD-vN.md`
This project's designator: **DVYP**
Save to: `Daily Hand Offs/` within this project folder.
Increment version (v1, v2...) if multiple handoffs are written in one day.

---

## Rules for Claude Code

### At the start of every session
Read TODO.md. Use it to understand what's pending and why. Do not ask Tony to re-explain tasks that are already documented there.

### When you start working on a task
If the task exists in TODO.md and has `Started: —`, update it to `Started: YYYY-MM-DD` with today's date.

### When you complete a task
Find the item in the Active section of TODO.md and:
1. Change `- [ ]` to `- [x]`
2. Wrap the title in strikethrough: `~~**Title**~~`
3. Stamp `Completed: YYYY-MM-DD` with today's date
4. **Move the entire item to `_Admin/TODO-Archive.md`** under the appropriate month heading (e.g. `## May 2026`) — do NOT leave a Completed section in TODO.md

### When you discover new work
If a session reveals a bug, follow-on task, or new requirement that isn't in TODO.md, add it to the Active section using this format:

```
- [ ] **[Item name]** #[product-tag]
  Added: YYYY-MM-DD | Started: — | Completed: —
  What: [What specifically needs to be done]
  Why: [Why it matters or what breaks without it]
  Where: [Exact file path or Supabase location to start]
  Blocked by: [Dependency, or "Nothing — ready to build"]
```

Product tags: `#slhq` `#scripttoggle` `#scripttoggle-mobile` `#estatepal` `#divvydup` `#todozie`

### Never delete items
Items are never removed from the TODO system. Completed items move to TODO-Archive.md permanently. This is an intentional audit trail.

### Include TODO.md in your handoff
When generating a handoff document, include a section noting which TODO items were completed, started, or added this session. The handoff and TODO.md should never contradict each other.

### Skill updates
If you identify that a skill needs to be created or updated, document it in your handoff under a "Skill Updates Needed" section. Do not write or modify skills directly. All skill changes go through META.

---

## TODO Scope

This project owns the `## DivvyDup` section of TODO.md.

**At the start of every session:**
- Read ONLY the `## DivvyDup` section of TODO.md — do not read other project sections
- Read the project's latest handoff from `_Admin/Handoffs/DVYP-LATEST.md`

**When updating TODO.md:**
- Only add, modify, or archive items within `## DivvyDup`
- If your session touched an item in another project's section (e.g., a shared Supabase migration), add or update ONLY that specific item in that section — do not read the rest of it

**After each session:**
- Write your handoff to `Daily Hand Offs/` as `DVYP-Handoff-YYYY-MM-DD-vN.md`
- Update `_Admin/Handoffs/DVYP-LATEST.md` with a 1-2 line summary and list of top outstanding items

## File Locations

- Active TODO: `/Users/T-Bone/Desktop/Computer Projects/_Admin/TODO.md` (read/write `## DivvyDup` section only)
- TODO Archive: `/Users/T-Bone/Desktop/Computer Projects/_Admin/TODO-Archive.md`
- Project LATEST handoff: `/Users/T-Bone/Desktop/Computer Projects/_Admin/Handoffs/DVYP-LATEST.md`
- Handoffs (this project): `/Users/T-Bone/Desktop/Computer Projects/Divvydup/Daily Hand Offs/`
