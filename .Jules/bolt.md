## 2024-06-17 - Avoid useMemo for derived files state
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing (every time a file completes). Using `useMemo([files])` to create derived structures (like an ID-to-File lookup map) causes severe main thread thrashing during processing.
**Action:** When performing O(1) map optimizations for one-off actions (like `downloadAll`), generate the map locally inside the callback rather than memoizing it globally.
