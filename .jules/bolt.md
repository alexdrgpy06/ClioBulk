## 2024-03-06 - O(N) Array Lookups in High-Frequency Events
**Learning:** During real-time batch processing, updating state based on events coming from the Rust backend created a performance bottleneck due to O(N) linear searches over the files array to find the correct file ID by path.
**Action:** For high-frequency UI updates or state updates, pre-compute an O(1) lookup Map (e.g., `filesMapRef` mapping `path -> id`) right before the batch process starts to completely eliminate the O(N) array lookup overhead.
