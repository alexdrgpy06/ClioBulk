## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2026-03-30 - [Accessible Standard Range Inputs]
**Learning:** Standard HTML5 `<input type="range">` elements in a Tailwind environment do not inherently adopt `focus-visible` styles like buttons do, and they are invisible to screen readers without proper linkages. Without `aria-valuetext`, screen readers just announce raw float values (e.g., "0.0") instead of formatted units ("0.0x" or "0 percent").
**Action:** Always wrap standard range inputs with explicit `id` to `<label htmlFor="...">` associations. Always add `focus-visible:ring-2 focus-visible:outline-none` so keyboard tracking is apparent, and always map the visual formatted output to `aria-valuetext` so screen readers get the same context as sighted users.
