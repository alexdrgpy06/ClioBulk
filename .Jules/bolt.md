
## 2024-05-24 - Avoid useMemo for constantly updating Zustand store arrays
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Memoizing derived data structures (like an ID-to-File map) with `useMemo([files])` causes severe main thread thrashing and performance degradation.
**Action:** Generate the required data structure (e.g., `new Map(files.map(f => [f.id, f]))`) locally inside the specific callback function (like `downloadAll`) for one-off operations instead of relying on global memoization.
