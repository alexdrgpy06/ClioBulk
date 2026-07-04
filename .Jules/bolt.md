
## 2024-07-04 - Local ID Map for One-Off Operations
**Learning:** In applications where a global store array (like files) updates constantly, memoizing an ID-to-Object map with `useMemo` can cause main thread thrashing due to continuous recalculation.
**Action:** Generate the required lookup structures locally inside specific callback functions for one-off operations (like a download-all loop) to avoid both O(N²) lookups and unnecessary re-renders.
