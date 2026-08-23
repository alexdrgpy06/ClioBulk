## 2026-08-23 - [Avoid useMemo for constantly updating Zustand arrays]
**Learning:** The files array in this app's Zustand store updates constantly during batch processing. Creating derived state like an ID-to-File map with useMemo([files]) causes severe main thread thrashing on every progress tick.
**Action:** Always generate required map structures locally inside specific callback functions for one-off operations instead of memoizing them at the component level.
