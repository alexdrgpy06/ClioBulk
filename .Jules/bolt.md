## 2024-05-30 - Optimize file lookup in high-frequency events
**Learning:** During high-frequency events like Tauri progress updates, $O(N)$ array lookups over state can cause performance bottlenecks. Pre-computing an $O(1)$ lookup dictionary in Zustand avoids redundant traversal.
**Action:** Always maintain pre-computed identifier maps in the global store for elements that need rapid access by path or name during stream processing or IPC events.
