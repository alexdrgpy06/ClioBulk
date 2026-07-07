## 2024-05-15 - Local HashMap for Derived Data
**Learning:** Using `useMemo([array])` to derive a map in a constantly updating Zustand store (like during batch processing) causes severe main thread thrashing.
**Action:** Generate local HashMaps inside specific callback functions (like `downloadAll`) for one-off O(1) lookups instead of global memoization.
