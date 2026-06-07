## 2024-06-07 - O(1) Lookups for High-Frequency Events
**Learning:** In bulk processing apps, high-frequency event listeners (like progress updates) trigger often. Searching through large arrays like `files.find()` inside these listeners becomes an O(N) bottleneck, causing micro-stutters.
**Action:** Use a pre-computed dictionary/hash-map (e.g., `fileIdsByPath`) in the global state to achieve O(1) lookups during high-frequency events.
