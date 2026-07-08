## 2024-07-08 - O(n) Maps for Rapidly Updating Zustand Stores
**Learning:** Using `useMemo([files])` to create derived data structures (like an ID-to-File map) causes severe main thread thrashing when the `files` store updates constantly during batch processing.
**Action:** Generate required lookup structures (like `Map`) locally inside the specific callback function for one-off operations instead of memoizing them globally.
