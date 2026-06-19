## 2024-05-24 - Avoid derived state thrashing in Zustand arrays
**Learning:** Generating derived data structures (like ID-to-File maps) using `useMemo` on a constantly updating Zustand array (`files` during batch processing) causes severe main thread thrashing.
**Action:** Build O(1) lookup dictionaries locally inside the specific callback functions (e.g. `downloadAll`) for one-off operations instead of caching them globally.
