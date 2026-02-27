## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-08-27 - [Announcing Calculated Values]
**Learning:** Standard HTML5 range inputs announce their raw numeric value by default. When the UI displays a calculated or formatted representation (e.g., a percentage "50%" for a value of 0.5, or a multiplier "1.2x"), screen reader users miss this context if only the raw number is announced.
**Action:** Always use `aria-valuetext` on range inputs when the visual label or unit differs from the underlying input value, ensuring screen reader announcements match the visible UI.
