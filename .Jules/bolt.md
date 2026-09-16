## 2024-05-24 - Zustand Array Thrashing
**Learning:** The `files` array in the Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived structures (like an ID-to-File map) causes severe main thread thrashing because the array reference changes on every processed item.
**Action:** Generate local derived data structures (like `new Map()`) directly inside the specific callback function (e.g., `downloadAll`) for one-off operations instead of trying to maintain them globally or via React memoization.
