## 2024-05-24 - High-Frequency Event Lookup Optimization
**Learning:** In Zustand stores, rebuilding a lookup map dynamically during high-frequency updates or inside hot paths creates severe performance bottlenecks that negate lookup benefits.
**Action:** To safely implement O(1) lookup Maps, manage the dictionary directly within the store state and mutate it strictly during infrequent list-modification actions (e.g., addFiles, removeFile). Do not update the dictionary during the high-frequency events themselves.
