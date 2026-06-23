## 2024-06-23 - Avoid useMemo for Rapidly Changing Stores
**Learning:** The files array in the Zustand store updates constantly during batch processing. Using useMemo([files]) to create derived data structures (like an ID-to-File map) causes severe main thread thrashing.
**Action:** Generate required lookup structures locally inside specific callback functions for one-off operations instead of at the component level.
