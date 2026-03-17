## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-07-26 - [Accessible Range Inputs]
**Learning:** Standard HTML5 `<input type="range">` elements are not fully accessible out of the box. They require an `id` linked to a `<label>` via `htmlFor`, an `aria-valuetext` attribute for screen readers to announce human-readable values, and explicit `focus-visible` styles to show keyboard focus indicators, since browsers often omit them for range inputs.
**Action:** Always link range inputs to their labels, add `aria-valuetext` when the value is a percentage or multiplier rather than just a number, and provide clear keyboard focus indicators via utility classes like `focus-visible:ring-2`.
