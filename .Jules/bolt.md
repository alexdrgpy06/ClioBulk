## 2026-08-22 - O(N^2) State Lookups in Batch Operations
**Learning:** The files array in Zustand updates constantly during batch processing. Using useMemo to create derived maps causes severe main thread thrashing.
**Action:** Generate lookup maps locally inside specific callback functions (like downloadAll) for one-off operations instead of globally memoizing them.
