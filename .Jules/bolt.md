## 2024-05-24 - Avoid useMemo for files map
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived data structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Instead of `useMemo`, generate required derived data structures locally inside specific callback functions for one-off operations.
