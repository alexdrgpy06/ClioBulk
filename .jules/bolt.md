## 2024-05-23 - [Frontend State Isolation]
**Learning:** Decoupling high-frequency UI state (sliders) from the main component prevents expensive re-renders of large lists (FileCards). Using `useStore.getState()` inside callbacks avoids dependency churn.
**Action:** When optimizing React apps with heavy lists, always isolate control inputs into separate components and use global state or refs for values needed only at trigger time.
