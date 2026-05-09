## 2024-05-10 - Optimizing High-Frequency Progress Listeners
**Learning:** Re-computing mappings or performing O(N) searches (like array.find) in high-frequency event listeners (like progress updates) becomes a severe bottleneck. Maintaining a lookup map by re-computing it on rapid state changes is worse than the original array search due to rebuild penalties.
**Action:** Manage an O(1) lookup Map directly in the store state strictly during low-frequency list modifications (e.g., adding/removing files). Do not dynamically rebuild this map during high-frequency read/update cycles.
