## 2024-07-03 - Avoid useMemo on frequently updating Zustand arrays
**Learning:** Using `useMemo` on a constantly updating Zustand array (like `files` during batch processing) causes severe main thread thrashing as it recomputes constantly.
**Action:** Instead of global memoization for derived states, generate required structures (like an ID-to-File HashMap) locally inside the specific callback function for one-off operations like batch downloading.
