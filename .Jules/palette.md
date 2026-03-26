## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-08-01 - [Accessible HTML5 Range Inputs]
**Learning:** Standard HTML5 range inputs (`<input type="range">`) lack implicit human-readable values for screen readers and visual focus indicators for keyboard navigation.
**Action:** Always provide explicit `<label>` linkage via `id` and `htmlFor`, add `aria-valuetext` to announce the formatted value (e.g., "120 percent"), and ensure visible `focus-visible` styles for keyboard accessibility.
