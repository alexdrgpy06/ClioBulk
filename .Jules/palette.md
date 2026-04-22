## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2026-04-22 - [Accessible Range Inputs and List Buttons]
**Learning:** Standard HTML5 controls like range inputs (`<input type="range">`) and dynamically rendered list buttons do not automatically inherit global focus styles, making them difficult for keyboard users to track. Additionally, range inputs need `aria-valuetext` and explicit `<label>` linkage (via `id` and `htmlFor`) to be fully accessible to screen readers.
**Action:** Always add explicit Tailwind focus-visible classes (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`) to custom or native interactive elements, and ensure inputs are properly linked to labels and provide semantic value context.
