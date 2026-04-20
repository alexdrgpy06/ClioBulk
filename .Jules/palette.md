## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-07-15 - [Keyboard Focus on Standard Controls]
**Learning:** Standard HTML5 controls like `<input type="range">` and dynamic lists of generic buttons (like Presets) lack clear visual focus indicators by default in this setup, making them hard to use for keyboard-only navigation. Labels for range inputs must also be linked using `htmlFor`/`id` to ensure screen reader compatibility.
**Action:** Always add explicit `focus-visible` ring classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`) to these controls and structurally link labels.
