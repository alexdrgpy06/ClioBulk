## 2024-06-28 - Zustand Array Thrashing & useMemo
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived data structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Always generate required derived structures (like maps for O(1) lookups) locally inside the specific callback function for one-off operations instead of memoizing them globally.
