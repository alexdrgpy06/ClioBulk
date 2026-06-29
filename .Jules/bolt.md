## 2024-06-29 - O(N^2) Array Lookups in Batch Callbacks
**Learning:** In React components with batch operations (e.g. `downloadAll`), repeatedly doing `files.find` inside a loop over a large map of objects creates an O(N^2) performance bottleneck. Naively moving this to `useMemo` isn't ideal because `files` updates constantly during processing, causing main thread thrashing.
**Action:** Generate the derived data structure (like an ID-to-File map) locally inside the specific callback function for one-off operations, replacing `files.find` with `idToFileMap.get(id)`.
