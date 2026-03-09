## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-07-10 - [Range Input Accessibility]
**Learning:** Standard HTML `<input type="range">` elements lack context for screen readers when values aren't inherently meaningful (e.g., 0.1 for 10% brightness) and visually lack focus indicators by default. Implicit label wrapping (`<label><input/></label>`) doesn't always announce the label text properly on all screen readers.
**Action:** Always link range inputs explicitly with `<label htmlFor="id">` and `<input id="id">`, provide human-readable `aria-valuetext`, and ensure keyboard navigation works well by adding `focus-visible` styling.
