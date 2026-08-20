## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2026-08-20 - [Explicit Label Associations for Sliders]
**Learning:** Range inputs for settings adjustments lacked explicitly associated labels via `id` and `htmlFor`, making them inaccessible to screen readers which fail to announce the setting's name (like Brightness or Contrast).
**Action:** When building custom settings sliders or range inputs, explicitly associate the `<label>` and `<input>` elements using matching `htmlFor` and `id` attributes.
