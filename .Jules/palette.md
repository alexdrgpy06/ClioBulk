## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-05-23 - [Inaccessible HTML5 Range Inputs]
**Learning:** Native HTML5 range inputs (`<input type="range">`) do not automatically inherit global focus styles and their `<label>` elements were not properly linked using `htmlFor` and `id`. This made them difficult to identify and use for keyboard-only users.
**Action:** Always link labels to range inputs using `htmlFor` and `id`, provide `aria-valuetext` for screen readers, and explicitly add `focus-visible:ring-2` Tailwind classes to ensure they are visually distinct when navigated via keyboard.
