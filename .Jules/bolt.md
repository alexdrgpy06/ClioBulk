## 2026-08-17 - [Zustand Store Array Thrashing]
**Learning:** The files array in this app's Zustand store updates constantly during batch processing. Using useMemo([files]) to create derived data structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Instead, generate the required structure locally inside the specific callback function for one-off operations.
