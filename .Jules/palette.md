## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-10-24 - [Accessible Range Sliders]
**Learning:** Standard HTML5 range inputs (`<input type="range">`) only announce their raw numeric value to screen readers, which is confusing if the value represents a percentage or a multiplier (e.g., "1.5" instead of "1.5x" or "-0.5" instead of "-50%").
**Action:** Always provide `aria-valuetext` to announce human-readable values to screen readers and explicitly link labels to their inputs using `htmlFor` and `id`.
