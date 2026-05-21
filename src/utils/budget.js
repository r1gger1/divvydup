// Returns how much of each paycheck remains after all page allocations.
// remaining > 0: dollars not yet assigned to any page
// remaining < 0: pages are allocated more than the paycheck covers
export function getRemainingBudget(S) {
  const paycheck = S.paycheck || 0;
  const allocated = S.pages.reduce((sum, p) => sum + (p.perCheck || 0), 0);
  const remaining = paycheck - allocated;
  return {
    paycheck,
    allocated,
    remaining,
    isOverAllocated: remaining < 0,
  };
}
