## 2024-06-11 - Optimize process-progress event listener with O(1) lookup
**Learning:** The `process-progress` event listener in `src/App.jsx` handles high-frequency events from the Rust backend. Finding files by path using an $O(N)$ array search (`files.find()`) inside this listener causes unnecessary performance overhead and bottlenecks.
**Action:** Utilize a pre-computed $O(1)$ lookup dictionary (`fileIdsByPath`) within the Zustand store (`src/store/useStore.js`) to resolve file IDs by path, avoiding array searches during high-frequency events.
