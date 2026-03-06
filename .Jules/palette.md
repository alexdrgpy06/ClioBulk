## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-07-26 - [Range Input Accessibility]
**Learning:** Standard `<input type="range">` elements only announce their raw numeric `value` to screen readers. For settings like Brightness or Contrast where the internal value (-1 to 1) doesn't match the displayed user value (0% to 100%), this is confusing.
**Action:** Always use `aria-valuetext` on range inputs when the visual text representation (e.g., percentages, multipliers) differs from the underlying step value, and hide the redundant visual text span using `aria-hidden="true"`.
