## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-11-20 - [Range Input Accessibility]
**Learning:** Standard HTML5 `<input type="range">` elements only announce their raw numeric value to screen readers, which lacks context for formatted values like percentages or multipliers used in image adjustment settings.
**Action:** Use `aria-valuetext` on range inputs to provide screen readers with a human-readable formatted string (e.g., "150 percent" or "1.5 times") that matches the visual representation in the UI. Also, ensure explicit associations between `<label>` and `<input>` using `htmlFor` and `id`.
