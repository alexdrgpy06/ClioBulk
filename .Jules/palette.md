## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-11-20 - [Range Input and Preset Button Accessibility]
**Learning:** Standard HTML5 controls like range inputs (`<input type="range">`) and dynamically rendered preset buttons in this project do not automatically inherit global focus styles. They appear invisible to keyboard users navigating through the interface unless explicitly styled. Additionally, range inputs need explicit text equivalents for screen readers.
**Action:** Always add explicit Tailwind `focus-visible` classes (e.g., `focus-visible:ring-2`) to ensure keyboard accessibility. Range inputs also require `aria-valuetext` to announce the value cleanly to screen readers, and their associated `<label>` elements must be explicitly linked using `id` and `htmlFor` for programmatic association.
