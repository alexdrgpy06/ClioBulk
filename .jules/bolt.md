
## 2024-03-22 - Optimizing High-Frequency Tauri Events in React
**Learning:** Handling rapid stream of progress events from a Tauri backend via `listen('process-progress')` can block the React main thread if status updates rely on an O(N) `array.find()` search. Even when intermediate redundant renders are skipped, finding the corresponding file state per chunk processed causes N² overall time complexity.
**Action:** Always map complex lists (like file objects) to a fast `useRef(new Map())` for O(1) ID lookups just before processing starts. This allows the backend to send thousands of high-frequency events without UI stuttering on the frontend.
