## 2026-06-22 - Optimize batch download lookups
**Learning:** Using `useMemo([files])` to create an ID-to-File map causes severe main thread thrashing due to constant updates during batch processing.
**Action:** Generate the required Map structure locally inside the specific callback function (`downloadAll`) for one-off operations to achieve O(1) lookups without thrashing the main thread.
