## 2026-08-20 - Prevent O(N^2) scaling in callbacks
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived data structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Generate the required lookup structures locally inside the specific callback function for one-off operations to avoid O(N) lookups without triggering global re-renders.
