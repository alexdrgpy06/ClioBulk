## 2026-08-24 - Avoid useMemo for derived state in high-frequency batch updates
**Learning:** In Zustand stores where arrays (like files) update constantly during batch operations, creating derived data structures with useMemo causes severe main thread thrashing.
**Action:** Generate required dictionary structures locally inside the specific callback function for one-off operations instead of caching them at the component level.
