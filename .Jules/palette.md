## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-10-24 - [HTML5 Range Input Accessibility Requirements]
**Learning:** Standard HTML5 `<input type="range">` elements lack inherent keyboard accessibility (no visible focus state by default in this app's styling) and screen reader context when not properly configured. They must be explicitly linked to labels via `id` and `htmlFor`, require `aria-valuetext` to announce dynamic human-readable values to screen readers, and need explicit `focus-visible` outline classes to support keyboard navigation.
**Action:** Always ensure that range inputs have a linked `<label>`, an `aria-valuetext` attribute dynamically tied to their state, and visible `focus-visible:ring-2` styles applied for keyboard usability.
