## 2026-07-01 - Avoid useMemo for volatile derived state
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived data structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Generate required lookup structures locally inside specific callback functions for one-off operations instead of caching them globally.
