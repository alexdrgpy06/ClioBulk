## 2025-05-23 - React State Optimization
**Learning:** Moving high-frequency UI state (like slider values) from a parent component to a dedicated child component or global store prevents unnecessary re-renders of the entire parent tree. This is especially impactful when the parent renders large lists (like `files`).
**Action:** Always check for high-frequency state updates in large components and extract them to smaller components or global state.
