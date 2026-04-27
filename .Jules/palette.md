## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-05-24 - [Keyboard Accessible Sliders and Generated Buttons]
**Learning:** Standard HTML5 `<input type="range">` elements and dynamically mapped preset `<button>` elements in sidebars do not automatically inherit visually distinct global focus rings. This makes keyboard navigation of critical adjustment settings extremely difficult to follow for users reliant on tab-indexing.
**Action:** Always explicitly apply `focus-visible` utility classes (e.g., `focus-visible:ring-2`) and ensure full screen reader support by binding `<label>` to `htmlFor` and providing `aria-valuetext` for ranges.
