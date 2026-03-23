## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2025-02-28 - [Accessible Range Inputs]
**Learning:** Native `<input type="range">` elements need `aria-valuetext` to properly convey meaning to screen readers, and programmatic interaction without visible focus styles (`focus-visible`) impairs keyboard navigation. Linking `<label>` correctly via `htmlFor` is also essential for context.
**Action:** Always add `aria-valuetext` with human-readable formatting, `htmlFor` mapping to `id`, and explicit `focus-visible` styling to all range inputs across the app.
