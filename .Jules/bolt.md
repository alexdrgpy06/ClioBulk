## 2024-05-18 - High-Frequency Event Rendering
**Learning:** High-frequency events (like processing progress from Rust to React) can trigger massive re-render storms if subscribed to via Zustand's standard `useStore` hook. React diffing on 60+ updates per second causes severe UI lagging.
**Action:** For high-frequency purely visual updates (like progress bars), bypass React renders by subscribing manually via `useStore.subscribe`, using a `useRef` to directly manipulate DOM attributes, and only subscribing to the toggle state (e.g., `processing: true/false`) in the standard hook.
