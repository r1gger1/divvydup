## Suite Context — Read First

Before doing anything else, read these three files:
- `/Users/T-Bone/Projects/_Admin/_Suite/VISION.md`
- `/Users/T-Bone/Projects/_Admin/_Suite/ARCHITECTURE.md`
- `/Users/T-Bone/Projects/_Admin/_Suite/MIGRATION-RULES.md`

These are non-negotiable. They tell you what this app is part of, what the shared database looks like, and what you must never do in a migration.

---

# Claude Code — DivvyDup (DVYP)

A master TODO list lives at:
`/Users/T-Bone/Projects/_Admin/TODO.md`

This is the single source of truth for all outstanding work across the StartingLine HQ suite.

---

## Session Log Naming — you are a producer, not a consolidator

At the end of a session, write ONE thing: a raw session log named `DVYP-CClog-YYYY-MM-DD-vN.md`, saved to `Daily Hand Offs/` within this project folder. Increment the version (v1, v2...) if you write more than one in a day.

This project's designator: **DVYP**

Your log is an INPUT. Cowork's `/ho` is the single consolidator. It reads your log and writes all canonical state: the consolidated `DVYP-Handoff-*` record in `_Admin/Handoffs/`, `TODO.md`, the `DVYP-LATEST.md` pointer, and the boards. Never write those yourself. The name `DVYP-Handoff-*` is reserved for Cowork; you only ever write `DVYP-CClog-*`.

---

## Rules for Claude Code

You READ from `TODO.md` for context. You do NOT write to it. All task-state changes happen when Tony runs `/ho` in Cowork, which reconciles `TODO.md` from your session log. Your job is to capture what happened accurately in your log so that reconciliation is clean.

### At the start of every session
Read TODO.md. Use it to understand what's pending and why. Do not ask Tony to re-explain tasks that are already documented there. Do not modify it.

### During the session — record, don't edit
As you work, track what to tell Cowork and put it in your session log at wrap-up. Do NOT edit `TODO.md`, `TODO-Archive.md`, or any `LATEST` file.

- Task you started: note it in your log (Cowork stamps `Started:`).
- Task you completed: note it in your log with evidence (Cowork checks it off and archives it).
- New work you discovered (bug, follow-on task, new requirement): capture it in your log using the format below so Cowork can add it to the right section.

Item format for new work — put these in your log, not in TODO.md:

```
- [ ] **[Item name]** #[product-tag]
  Added: YYYY-MM-DD | Started: — | Completed: —
  What: [What specifically needs to be done]
  Why: [Why it matters or what breaks without it]
  Where: [Exact file path or Supabase location to start]
  Blocked by: [Dependency, or "Nothing, ready to build"]
```

Product tags: `#slhq` `#scripttoggle` `#scripttoggle-mobile` `#estatepal` `#divvydup` `#todozie`

### Never delete items
The TODO system is an intentional audit trail. Items are never removed. Completed items get archived by Cowork, never by you, and never deleted.

### Your log and TODO.md must not contradict
Your session log is what Cowork reconciles from. Make the completed, started, and new items in it accurate and specific so the consolidated handoff and TODO.md end up correct.

### Skill updates
If you identify that a skill needs to be created or updated, note it in your log under a "Skill Updates Needed" section. You may also append it to `_Admin/META-SKILL-ISSUES.md` using the standard template — logging issues is allowed. Do not write or modify skills directly. All skill changes go through META.

---

## TODO Scope

This project's work lives in the `## DivvyDup` section of TODO.md. Cowork owns edits to it.

**At the start of every session:**
- Read the `## DivvyDup` section of TODO.md for context. Do not read or edit other project sections.
- Read the project's latest handoff from `_Admin/Handoffs/DVYP-LATEST.md`.

**During the session:**
- Do not write to TODO.md. If your work touches another project's item (e.g., a shared Supabase migration), note it in your log so Cowork can update that section.

**After each session:**
- Write your session log to `Daily Hand Offs/` as `DVYP-CClog-YYYY-MM-DD-vN.md`.
- Do NOT update `DVYP-LATEST.md` or any other canonical file. Remind Tony to run `/ho` in Cowork to consolidate your log.

## File Locations

- Active TODO: `/Users/T-Bone/Projects/_Admin/TODO.md` (READ ONLY for the `## DivvyDup` section; Cowork writes it)
- TODO Archive: `/Users/T-Bone/Projects/_Admin/TODO-Archive.md` (Cowork only)
- Project LATEST handoff: `/Users/T-Bone/Projects/_Admin/Handoffs/DVYP-LATEST.md` (Cowork writes this; read for context)
- Session logs (this project): `/Users/T-Bone/Projects/Divvydup/Daily Hand Offs/` (`DVYP-CClog-*`)
