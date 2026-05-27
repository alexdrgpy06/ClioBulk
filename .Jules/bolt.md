## 2024-05-24 - O(1) File Lookup in Zustand Store
**Learning:** High-frequency events (like `process-progress` from Tauri) cause performance bottlenecks if they rely on O(N) array searches (e.g., `files.find()`) for each event.
**Action:** Manage an O(1) lookup dictionary (`fileIdsByPath`) directly within the Zustand store. Mutate it strictly during infrequent list-modification actions (`addFiles`, `removeFile`), avoiding rebuild penalties during the high-frequency events themselves.
