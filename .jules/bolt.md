## 2026-03-05 - [High-Frequency UI Updates Optimization]
**Learning:** Subscribing to Zustand store properties like 'progress' in React components causes a full re-render on every update, which can be thousands of times per second during batch processing. This degrades performance.
**Action:** Use `useStore.subscribe` outside of the render cycle with a `useRef` to update DOM element styles directly (e.g., width for progress bars) to bypass React's render phase entirely for high-frequency updates.
