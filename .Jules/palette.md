## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.
## 2026-02-28 - [Accessible Range Inputs]
**Learning:** Screen readers might only announce the raw numeric value for `<input type="range">`. Adding `aria-valuetext` ensures human-readable formats (e.g. percentages or multipliers) are announced instead. Also, labels must be explicitly linked via `htmlFor`/`id` since generic wrappers lack standard semantic grouping.
**Action:** Always link labels to range inputs explicitly and add `aria-valuetext` when the raw numeric value does not map smoothly to human-readable strings.
