## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-07-28 - [Keyboard Accessible Standard Inputs]
**Learning:** Standard HTML controls like `<input type="range">` and custom preset `<button>` elements in this UI do not automatically inherit visible focus styles, making them invisible to keyboard navigation. Moreover, without explicit `id`/`htmlFor` bindings and `aria-valuetext` mapping to visual labels, screen readers fail to communicate their purpose and current value effectively.
**Action:** Always bind labels to inputs using `htmlFor` and `id`, provide `aria-valuetext` when the visual value is a separate string, and explicitly add Tailwind focus states (e.g., `focus-visible:ring-2`) to all interactive elements to ensure full accessibility.
