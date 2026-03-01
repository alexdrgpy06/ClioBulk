## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.
## 2026-03-01 - [Accessible Range Inputs and Toggles]
**Learning:** Native HTML5 range inputs only announce raw numeric values to screen readers, missing important context like percentages or units. Furthermore, toggle buttons need explicit connection (`aria-controls`) and state (`aria-expanded`) to their target panels to be properly understood by assistive technologies.
**Action:** Add `aria-valuetext` to range inputs to announce human-readable values. Use `aria-expanded` and `aria-controls` on toggle buttons, and link labels to inputs with `htmlFor`.
