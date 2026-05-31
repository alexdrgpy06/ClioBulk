## 2024-05-31 - O(1) State Lookups in High-Frequency Events
**Learning:** During high-frequency events (like progress updates from a backend), using `Array.prototype.find()` on large state arrays causes O(N^2) overall performance degradation, manifesting as severe main thread blocking.
**Action:** Always maintain a pre-computed O(1) lookup dictionary alongside the array in the global state (e.g., Zustand) when frequent element resolution by a unique key (like a file path) is required.
