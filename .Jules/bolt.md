## 2024-06-06 - O(1) Lookups for High-Frequency Events
**Learning:** In ClioBulk, the `process-progress` event listener fires continuously during bulk image processing. Using array methods like `.find()` inside this listener causes O(N^2) time complexity over the full job, severely impacting main thread performance when processing thousands of images.
**Action:** Always use pre-computed O(1) lookup dictionaries (like `fileIdsByPath` in Zustand) to resolve items during high-frequency Rust-to-Frontend IPC events to prevent CPU bottlenecking.
