## 2026-03-30 - [O(N^2) Array Lookup Bottleneck]
**Learning:** In the Tauri event listener for `process-progress`, performing an array `find` over `useStore.getState().files` on every completion/failure event creates an O(N^2) time complexity bottleneck, blocking the main thread when processing a large number of files.
**Action:** Use an O(1) Map lookup mechanism by populating a `useRef` before initiating bulk processing, or by optimizing state lookup.
