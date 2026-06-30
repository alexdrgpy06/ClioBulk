## 2024-10-24 - Zustand Array Thrashing with Derived Maps
**Learning:** The `files` array in the Zustand store updates constantly during batch processing. Creating derived data structures (like an ID-to-File map) using `useMemo([files])` causes severe main thread thrashing due to continuous invalidation.
**Action:** Generate required local data structures (like maps) on-the-fly inside specific callback functions for one-off operations, rather than maintaining a reactive global map.
