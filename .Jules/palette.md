## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-06-26 - [Keyboard Accessible HTML5 Range Inputs]
**Learning:** Standard HTML5 `<input type="range">` elements and dynamically rendered list buttons do not automatically inherit global focus styles in Tailwind. They require explicit `focus-visible` classes (e.g., `focus-visible:ring-2`) to ensure keyboard accessibility. Range inputs also need `aria-valuetext` and `<label>` linkage via `id` and `htmlFor` to be fully accessible to screen readers.
**Action:** Always add explicit `focus-visible` styles and proper ARIA labels/linkages to range inputs and interactive list items to ensure they are accessible via keyboard navigation.
