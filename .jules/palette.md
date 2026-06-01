## 2024-06-01 - Missing Focus Styles on Dynamically Rendered UI
**Learning:** Standard HTML5 controls like `<input type="range">` and dynamically rendered `<button>` elements in this project do not automatically inherit global focus styles. Furthermore, range inputs without proper `htmlFor` and `id` bindings to their descriptive text lack screen reader context.
**Action:** Always explicitly apply Tailwind `focus-visible` utility classes (`focus-visible:ring-2`, etc.) and ensure proper semantic ARIA attributes (`aria-valuetext`, `htmlFor`, `id`) are implemented for accessibility.
