## 2024-05-22 - [Hidden Interactive Elements]
**Learning:** Interactive elements like the "Remove File" button in `FileCard` were completely hidden (`opacity-0`) until hover, making them inaccessible to keyboard users and confusing for touch users.
**Action:** Ensure all interactive elements have a visible focus state (`focus:opacity-100`) and are accessible via keyboard, even if they are hidden by default for aesthetic reasons.

## 2024-06-25 - [Keyboard Accessible File Inputs]
**Learning:** Using `<label>` to wrap a hidden file input works for mouse users but fails for keyboard users if the input is `display: none` (hidden) or if the label itself isn't focusable. Additionally, `onClick` on a `<label>` is not triggered by keyboard.
**Action:** Use a visible `<button>` that programmatically triggers the file input (via `ref.current.click()`) or the native file dialog. This ensures the control is naturally focusable and actionable via keyboard.
## $(date +%Y-%m-%d) - Settings Sliders Accessibility Improvement
**Learning:** React range inputs inside generic \`div\` wrappers without explicit \`<label htmlFor>\` bindings break screen reader announcements for complex settings. Also, headless Chromium in Playwright struggles to reliably render \`focus-visible\` utility classes on elements focused via \`.focus()\` method.
**Action:** Always bind \`id\` and \`htmlFor\` explicitly for settings sliders, and use \`page.keyboard.press("Tab")\` in Playwright tests to accurately verify keyboard focus states.
