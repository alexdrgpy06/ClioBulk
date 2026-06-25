## 2024-06-25 - Avoid useMemo for frequently updated batch arrays
**Learning:** In ClioBulk, the `files` array updates constantly during batch processing. Using `useMemo([files])` to create derived structures (like an ID-to-File map) causes severe main thread thrashing due to continuous recalculation.
**Action:** Generate local derived structures (like Maps for O(1) lookups) directly inside specific one-off callback functions (e.g., `downloadAll`) instead of global memoization.
