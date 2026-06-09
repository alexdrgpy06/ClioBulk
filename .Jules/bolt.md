
## 2024-06-09 - O(1) Lookup for High-Frequency Events
**Learning:** High-frequency events (like processing progress updates) that trigger a search through a growing array (O(N)) can quickly become a bottleneck, especially as the array size increases.
**Action:** Replace O(N) array searches with O(1) dictionary lookups by maintaining a lookup table in the state store for data needed during frequent event callbacks.
