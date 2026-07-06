
## 2024-07-06 - Local Map for O(N^2) Mitigation
**Learning:** The `files` array in this app's Zustand store updates constantly during batch processing. Deriving an ID-to-File map using `useMemo([files])` causes severe main thread thrashing.
**Action:** Generate the required Map locally inside specific callback functions (like `downloadAll`) for one-off operations to avoid O(N^2) lookups without introducing derived state thrashing.
