## 2024-05-20 - High-Frequency Event State Updates
**Learning:** When handling high-frequency Tauri events (like progress updates) in React that correlate with list items, always use an O(1) lookup mechanism (e.g., a pre-populated `useRef(new Map())`) to avoid O(N²) time complexity bottlenecks that block the main thread.
**Action:** Replace `Array.prototype.find` array searches within progress or fast-firing callbacks with `Map.prototype.get` lookups using a `useRef` Map that caches the needed data keys before the high-frequency events begin.
