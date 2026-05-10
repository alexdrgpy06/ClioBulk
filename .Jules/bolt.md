## 2024-05-24 - O(1) Lookup Maps in Zustand for High-Frequency Events
**Learning:** In Zustand stores, $O(N)$ searches inside high-frequency event listeners (like progress updates) cause severe bottlenecks. Dynamically allocating a Map inside the hot path or rebuilding it on every rapid state change causes worse performance regressions.
**Action:** Manage the dictionary directly within the Zustand store state, mutating it strictly during infrequent list-modification actions (e.g., `addFiles`, `removeFile`) and avoiding updates during the high-frequency events themselves.
