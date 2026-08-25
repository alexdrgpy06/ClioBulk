## 2026-08-25 - [O(N^2) File Lookup in downloadAll]
**Learning:** Using Array.prototype.find() inside a loop over processed files scales poorly for bulk operations, creating an O(N^2) bottleneck. However, the `files` array in the Zustand store updates constantly during batch processing, so memoizing a lookup map with `useMemo` causes severe main thread thrashing.
**Action:** Create the ID-to-File lookup map locally inside the specific callback function (like downloadAll) right before iterating, ensuring O(N) performance without thrashing the main thread with constant map rebuilds.
