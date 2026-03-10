## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.

## 2024-11-20 - [Range Input Accessibility]
**Learning:** Standard `<input type="range">` elements lack default accessibility properties. They do not naturally announce their human-readable values to screen readers (requiring `aria-valuetext`), do not automatically link to visual labels (requiring `id` and `htmlFor`), and often lack clear visual focus indicators for keyboard navigation.
**Action:** Always ensure range inputs are explicitly linked to labels via `id` and `htmlFor`, include `aria-valuetext` to announce the formatted value (e.g., "120%"), and add explicit `focus-visible` styles (`focus-visible:ring-2`, `focus-visible:ring-offset-2`) so keyboard users know when the slider is active.
