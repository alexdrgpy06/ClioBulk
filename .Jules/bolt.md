## 2024-05-18 - Pre-computed Dictionary Lookups
**Learning:** High-frequency event listeners (like progress trackers) in React that rely on O(N) array searches (e.g., `array.find()`) can cause significant performance bottlenecks and CPU thrashing when handling large data sets (e.g., batch processing thousands of files).
**Action:** Always utilize a pre-computed O(1) lookup dictionary (e.g., mapping paths/IDs) managed within the global state (like Zustand) to resolve items instantly during high-frequency events.
