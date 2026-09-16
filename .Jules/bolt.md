## 2026-08-16 - Zustand array thrashing
**Learning:** Avoid useMemo for derived structures from frequently updating Zustand arrays (like the 'files' array during batch processing) to prevent main thread thrashing.
**Action:** Generate required structures (like an ID-to-File map) locally inside the specific callback function for one-off operations.
