## 2024-06-04 - O(1) Dictionary Lookups for High-Frequency Events
**Learning:** High-frequency events (like process-progress in Tauri) causing O(N) array searches on large file states can severely block the main thread and impact UI responsiveness.
**Action:** Always pre-compute and maintain an O(1) lookup dictionary in the state management store (e.g. Zustand) to resolve items efficiently during high-frequency listeners.
