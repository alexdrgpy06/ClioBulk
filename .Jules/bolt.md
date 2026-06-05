## 2024-06-05 - O(1) lookup for Tauri process-progress events
**Learning:** The Rust backend emits high-frequency `process-progress` events. Finding the target file in the Zustand store by path during these events using `Array.find()` causes an O(N) array search, creating a bottleneck during large bulk operations.
**Action:** Pre-compute and maintain an O(1) lookup dictionary (`fileIdsByPath`) managed within the Zustand store (`src/store/useStore.js`) during file ingestion to resolve file IDs instantly, avoiding O(N) array searches.
