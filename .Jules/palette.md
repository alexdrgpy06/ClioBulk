## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.
## 2026-08-24 - [Accessible Range Inputs]
**Learning:** The range inputs for image adjustments (Brightness, Contrast, Saturation) in the settings sidebar lacked proper id and htmlFor attributes linking the label to the input, making it difficult for screen readers to associate the setting name with the slider control.
**Action:** Add explicit id and htmlFor attributes to link labels and inputs for range sliders, improving accessibility for screen reader users.
