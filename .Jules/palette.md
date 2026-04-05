## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-10-27 - [Keyboard Accessibility of Custom UI Controls]
**Learning:** Standard HTML5 controls dynamically rendered, like list buttons and `<input type="range">`, do not always automatically inherit or display global focus styles prominently, leading to a break in keyboard navigation visibility. Additionally, range inputs need explicit `<label>` linkage (`htmlFor` and `id`) to be properly read by screen readers.
**Action:** Always ensure explicitly defined `focus-visible` utility classes (e.g., `focus-visible:ring-2 focus-visible:ring-blue-500`) are applied to interactive elements like buttons and custom styled range inputs. Always link labels to inputs using `htmlFor` and `id`.
