## 2024-05-13 - O(1) Lookups in Zustand
**Learning:** High-frequency event listeners resolving items by O(N) array searches can cause severe performance regressions. Rebuilding lookup Maps dynamically inside hot paths or via useMemo triggers rebuild penalties.
**Action:** Safely implement O(1) lookup Maps by managing the dictionary directly within the Zustand store state and mutating it strictly during infrequent list-modification actions (e.g., addFiles, removeFile).
