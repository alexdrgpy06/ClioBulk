## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-05-22 - [Keyboard Accessible Sliders and Preset Buttons]
**Learning:** Standard HTML5 controls like `<input type="range">` and dynamically rendered `<button>` elements (e.g., Presets) do not automatically inherit global focus styles in this Tailwind setup. This makes them invisible to keyboard navigation. Additionally, range inputs need explicit `<label>` association and `aria-valuetext` for screen readers to properly read their dynamic values.
**Action:** Explicitly apply Tailwind `focus-visible` utility classes (e.g., `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none`) to all range sliders and dynamically rendered buttons. Provide `aria-valuetext` and proper `<label>` `htmlFor`/`id` bindings for full keyboard and screen reader accessibility.
