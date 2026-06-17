## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-07-16 - [Keyboard Accessible Sliders]
**Learning:** `<input type="range">` elements inside a layout with purely visual text labels (e.g., `<div><label>Label</label>...<input></div>`) do not announce their purpose to screen readers if the `id` and `htmlFor` attributes are missing. Furthermore, native browser focus styles for range inputs can be easily lost against dark backgrounds.
**Action:** Always link structural `<label>` tags to their corresponding inputs using `htmlFor` and an `id`. Ensure inputs use explicit `focus-visible` styles with sufficient contrast against the background to guarantee keyboard navigability.
