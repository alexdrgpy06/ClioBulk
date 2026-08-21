## 2026-08-21 - Optimize O(N^2) file lookup
**Learning:** The files array in this app's Zustand store updates constantly during batch processing. Using useMemo([files]) to create derived data structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Generate the required structure locally inside the specific callback function for one-off operations to avoid O(N) array lookups.
