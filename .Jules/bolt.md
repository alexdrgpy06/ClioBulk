## 2024-06-26 - [Localize Caching to Prevent Main Thread Thrashing]
**Learning:** In batch processing apps where the store (like Zustand's `files` array) updates constantly, derived data structures via `useMemo([files])` cause severe main thread thrashing because they recalculate on every progress event.
**Action:** When needing O(1) lookups for one-off operations (like `downloadAll`), generate the mapping structure locally inside the callback instead of caching it globally or reactively.
