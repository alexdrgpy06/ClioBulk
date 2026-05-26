## 2026-05-26 - O(1) Lookup Map for High-Frequency Events
**Learning:** During high-frequency events like real-time progress updates, iterating over an array to find a specific element introduces O(N) complexity which can bottleneck performance.
**Action:** Always pre-compute and maintain O(1) lookup dictionaries within the store state, mutating them strictly during infrequent list-modification actions to avoid rebuild penalties.
