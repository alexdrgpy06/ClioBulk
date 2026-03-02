## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2025-03-02 - [Range Inputs & Expandable Panels Accessibility]
**Learning:** Standard `<input type="range">` elements only announce raw numeric values to screen readers, which is confusing when the visual UI shows formatted values like percentages or multipliers. Furthermore, buttons that toggle visibility of panels (like settings) need explicit ARIA states to provide context.
**Action:** Always add `aria-valuetext` to range sliders if their visual value includes formatting (e.g. `%`, `x`). When creating toggleable panels, ensure the button has `aria-expanded` and `aria-controls` pointing to the panel's `id`.
