## 2026-08-18 - Zustand Array Thrashing
**Learning:** The files array in the Zustand store updates constantly during batch processing. Using useMemo([files]) to create derived data structures like an ID-to-File map causes severe main thread thrashing.
**Action:** Generate the required structure locally inside the specific callback function for one-off operations instead of relying on React useMemo.
