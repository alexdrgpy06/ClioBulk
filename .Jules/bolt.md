## 2024-08-12 - Avoid useMemo for Rapidly Changing Stores
**Learning:** The files array in Zustand updates constantly during batch processing. Using useMemo to create derived data structures (like an ID-to-File map) causes severe main thread thrashing due to these frequent updates. Doing nested lookups like Array.find() inside a loop over processedFiles creates O(N^2) operations.
**Action:** Generate lookup structures (like Maps) locally inside the specific callback function (e.g., downloadAll) for one-off operations instead of memoizing them at the component level.
