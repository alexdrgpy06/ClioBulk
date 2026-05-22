## 2024-10-24 - O(1) Lookups in Zustand Stores
**Learning:** To safely implement O(1) lookup Maps in Zustand stores for high-frequency event optimization without triggering rebuild penalties, manage the dictionary directly within the store state and mutate it strictly during infrequent list-modification actions (e.g., addFiles, removeFile). Do not update the dictionary during the high-frequency events themselves.
**Action:** Always maintain secondary index mappings alongside the main array in the store state, rather than calculating them inside hot paths or using useMemo.
