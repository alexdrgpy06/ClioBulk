## 2024-06-01 - O(1) Lookups for High-Frequency Events
**Learning:** During bulk processing, searching an array sequentially ($O(N)$) for every single progress event creates an $O(N^2)$ bottleneck that severely degrades performance as file count grows.
**Action:** Always utilize a pre-computed dictionary ($O(1)$ lookup map) in global state when resolving item properties against high-frequency continuous event streams.
