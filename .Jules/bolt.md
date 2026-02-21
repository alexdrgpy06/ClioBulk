## 2024-05-23 - [Settings Panel Extraction]
**Learning:** Extracting high-frequency state updates (like sliders) into a separate component connected to a global store prevents root component re-renders, significantly improving UI responsiveness for large lists.
**Action:** Identify other high-frequency local state in large components and refactor them similarly using Zustand selectors or isolated components.
