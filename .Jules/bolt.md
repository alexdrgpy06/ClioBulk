## 2024-05-24 - O(N) Find Inside React Event Listeners
**Learning:** In React components listening to high-frequency events (like Tauri's real-time Rust backend progress), `Array.find()` inside the listener degrades performance to O(N^2) overall.
**Action:** Always implement O(1) pre-computed `Map` lookups (using `useMemo` or a synchronized `useRef` map) for array lookups happening inside hot paths or loops to guarantee instantaneous performance.
## 2024-05-24 - Math Fusion in Pixel Shaders
**Learning:** Sequential linear color adjustments in tight performance-critical loops (like pixel processors) waste CPU cycles on redundant conditionals and individual arithmetic operations.
**Action:** Mathematically fuse these operations (brightness, contrast, saturation) into a single pre-computed 3x3 affine transformation matrix and a scalar offset before the loop, enabling a clean single matrix multiplication per pixel.
