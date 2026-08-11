## 2024-10-24 - O(N) Lookups in Batch Operations
**Learning:** Creating a Map inside one-off bulk operation callbacks prevents O(N²) array lookups without causing main thread thrashing from useMemo array dependencies.
**Action:** For batch operations in React with constantly updating arrays, build lookup dictionaries locally inside the callback instead of using reactive hooks.
