## 2024-05-29 - Pre-computed O(1) lookups for high-frequency events
**Learning:** The process-progress event listener fires very frequently. Finding files by path using an O(N) array search on every event can cause severe performance degradation with large file sets.
**Action:** Always maintain a pre-computed dictionary for high-frequency O(1) lookups during intensive event listening.
