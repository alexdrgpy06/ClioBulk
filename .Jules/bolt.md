## 2025-01-20 - O(1) Lookup Maps in Zustand
**Learning:** Rebuilding a lookup Map inside a high-frequency event listener (or using `useMemo` that reacts to rapid state changes) causes severe performance regressions, worse than an O(N) array search.
**Action:** Manage the pre-computed O(1) lookup dictionary directly within the Zustand store and only mutate it during infrequent list-modification actions (e.g., `addFiles`, `removeFile`), never during the high-frequency event updates themselves.
