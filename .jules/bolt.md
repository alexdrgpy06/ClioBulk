
## 2025-02-28 - [High-Frequency React Rendering Bottleneck via Zustand]
**Learning:** High-frequency state updates, like a progress bar updating from Tauri events via Zustand (`setProgress`), will cause unnecessary and excessive React re-renders if a component subscribes to the property directly via `useStore`.
**Action:** When working with high-frequency updates, avoid subscribing to the property directly. Instead, bypass React's render lifecycle by using a `useRef` pointing to the DOM element and listening to changes via `useStore.subscribe()`. Manually sync the initial DOM state using `useStore.getState()` and check state deltas inside the subscriber to prevent unnecessary DOM mutations.
