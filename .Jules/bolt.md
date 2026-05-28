## 2024-05-28 - O(1) File Lookup Dictionary
**Learning:** During high-frequency IPC events (like real-time processing progress), O(N) array searches across thousands of elements block the main thread and cause UI stutter.
**Action:** Use a pre-computed O(1) lookup dictionary in the Zustand store to resolve IDs by path instantly during event callbacks.
