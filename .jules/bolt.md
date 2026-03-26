## 2024-05-14 - O(1) Map Lookup for High-Frequency Tauri Events
**Learning:** When handling high-frequency Tauri events (like progress updates) in React that correlate with list items, doing an O(N) lookup (e.g., `array.find()`) on every event causes serious performance bottlenecks that can block the main thread, especially as the number of files increases.
**Action:** Always use an O(1) lookup mechanism, such as a pre-populated `useRef(new Map())`, to map identifiers (like paths) to React item IDs before the high-frequency event processing begins.
