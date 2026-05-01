## 2024-05-01 - Fusing Linear Color Transformations
**Learning:** Sequential linear color adjustments (brightness, contrast, saturation) applied per-pixel involve redundant additions, subtractions, and variable assignments. Since these are all affine transformations, they can be mathematically combined into a single 3x3 transformation matrix and a scalar offset before the loop.
**Action:** Always look for opportunities to combine sequential math operations on vectors (like RGB pixels) into a precomputed transformation matrix to reduce arithmetic instructions inside hot loops.
