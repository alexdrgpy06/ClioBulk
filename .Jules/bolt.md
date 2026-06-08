## 2024-05-18 - Optimized Array Lookups
**Learning:** Found a performance bottleneck in the high-frequency event listener (process-progress) updating file states. Zustand uses array scanning (O(N)) on a large array to find elements by ID/path, which is significantly slow. Adding an O(1) file path mapped directly to file ID reduces the O(N) lookup.
**Action:** Replace `Array.find` or `Array.findIndex` with O(1) dictionary lookups (`fileIdsByPath[path]`) for high-frequency operations such as progress/event handlers updating component store.
