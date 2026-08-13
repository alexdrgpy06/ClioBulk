## 2024-05-18 - Zustand Array Thrashing
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived data structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Generate required lookup structures locally inside the specific callback function (like `downloadAll`) for one-off operations instead of memoizing them at the component level.
