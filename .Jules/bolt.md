
## 2024-10-24 - Local O(1) Lookups for Batch Actions
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived structures like an ID-to-File map causes severe main thread thrashing because the cache invalidates constantly.
**Action:** Generate O(1) lookup maps locally inside specific callback functions (like `downloadAll`) for one-off operations instead of relying on global or memoized derived state.
