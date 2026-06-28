## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-06-28 - [Accessible Range Sliders]
**Learning:** React range sliders (`<input type="range">`) within a mapped group or stacked list often lack an explicit `htmlFor` connection to their adjacent labels. While visual users can guess the association by proximity, screen readers cannot, and keyboard users lack a clear focus indicator on native range inputs without custom styles.
**Action:** Always wrap or explicitly link range inputs with their sibling `<label>` using matching `id` and `htmlFor` attributes, and add visible focus rings (e.g., `focus-visible:ring-2`) to native range inputs for keyboard navigation.
