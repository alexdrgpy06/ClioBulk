## 2025-01-20 - Zustand Array Thrashing with useMemo
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived data structures (like an ID-to-File map) causes severe main thread thrashing because the array reference changes on every progress update.
**Action:** Do not use `useMemo` for derived structures on rapidly updating global arrays in this codebase. Instead, generate the required map locally inside the specific callback function for one-off operations.
