# Claude Code — TODO List Instructions

A master TODO list lives at:
`/Users/T-Bone/Desktop/Computer Projects/_Admin/TODO.md`

This is the single source of truth for all outstanding work across the StartingLine HQ suite (SLHQ Hub, ScriptToggle, EstatePal, DivvyDup).

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
4. Move the entire item (all lines) to the Completed section at the bottom

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

Product tags: `#slhq` `#scripttoggle` `#estatepal` `#divvydup`

### Never delete items
Items are never removed from TODO.md. Completed items stay in the Completed section permanently with strikethrough. This is an intentional audit trail.

### Include TODO.md in your handoff
When generating a handoff document, include a section noting which TODO items were completed, started, or added this session. The handoff and TODO.md should never contradict each other.

---

## TODO.md Location
`/Users/T-Bone/Desktop/Computer Projects/_Admin/TODO.md`

## Handoffs Location  
`/Users/T-Bone/Desktop/Computer Projects/_Admin/Handoffs/`
