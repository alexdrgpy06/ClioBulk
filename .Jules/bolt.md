## 2024-05-22 - [Frontend State Bottleneck]
**Learning:** Storing high-frequency update state (like slider values) in the root `App` component causes the entire component tree (including expensive list renders) to re-render on every change.
**Action:** Move such state to a global store (Zustand) or a separate context/component, and read it imperatively via `getState()` in callbacks (like `startProcessing`) to avoid unnecessary reactivity.
