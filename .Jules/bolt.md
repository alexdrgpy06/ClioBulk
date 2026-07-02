## 2024-07-02 - O(1) Lookup Map for Bulk Operations
**Learning:** In Zustand stores where arrays (like `files`) update constantly during processing, using `useMemo` to derive an ID map causes severe main thread thrashing. However, using `.find()` inside a loop over a large set causes O(N²) blocks.
**Action:** Generate local `Map` data structures directly inside the specific event handler callback (like `downloadAll`) for one-off O(N) operations without triggering continuous React re-renders.
