## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-07-26 - [Range Input Accessibility]
**Learning:** Native `<input type="range">` elements require explicit text values via `aria-valuetext` to announce human-readable values to screen readers (e.g., percentages or multipliers). They also need explicitly linked `<label>` tags (via `id` and `htmlFor`) and visible `focus-visible` styles to be fully accessible for keyboard navigation.
**Action:** Always add `aria-valuetext`, a linked `<label>`, and custom focus ring styles to HTML5 range inputs.
