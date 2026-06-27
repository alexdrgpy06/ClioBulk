## 2024-06-27 - O(N) Lookups in Download Loops
**Learning:** The files array updates constantly during batch processing. Using `useMemo([files])` to create derived structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Generate lookup dictionaries locally inside the specific callback functions (like `downloadAll`) for one-off operations to safely achieve O(1) performance without cache invalidation issues.
