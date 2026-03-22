## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2025-03-22 - [Accessible Range Inputs]
**Learning:** Standard HTML5 `<input type="range">` elements are not inherently accessible. They require explicit linkage to a `<label>` using `id` and `htmlFor`, an `aria-valuetext` attribute to announce human-readable values to screen readers (especially when values are formatted like percentages or multipliers), and visible `:focus-visible` styles to ensure keyboard users know when the input is active.
**Action:** Always pair range inputs with explicit labels, use `aria-valuetext` for formatted values, and implement visible focus styles for keyboard navigation.
