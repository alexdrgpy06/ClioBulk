## 2024-10-24 - Global Focus Styles on Interactive Elements
**Learning:** Standard HTML5 controls like `<input type="range">` and dynamically rendered `<button>` elements do not inherit global focus styles in this project.
**Action:** Explicitly apply Tailwind `focus-visible` utility classes (e.g., `focus-visible:ring-2`) and provide `aria-valuetext` with proper `<label>` `htmlFor`/`id` bindings to ensure accessibility.
