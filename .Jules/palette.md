## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-05-23 - [Keyboard Accessibility of File Inputs]
**Learning:** Wrapping a hidden file input inside a `<label>` provides mouse interactivity but fails for keyboard users as labels are not focusable by default.
**Action:** Always use a `<button>` to trigger file selection (via a hidden input ref or API call) to ensure the action is focusable and accessible via keyboard.
