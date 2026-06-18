## 24-06-18 - Avoid useMemo for derived maps on high-frequency state
**Learning:** The `files` array in the Zustand store updates constantly during batch processing. Using `useMemo([files])` to create derived data structures (like an ID-to-File map) causes severe main thread thrashing because the memo recalculates on every progress tick.
**Action:** Generate local data structures directly inside specific callback functions (like `downloadAll`) for one-off operations instead of caching them at the component level.
