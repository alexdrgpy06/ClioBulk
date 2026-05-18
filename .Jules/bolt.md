
## 2024-05-18 - Fused Transformation Matrix for Image Adjustments
**Learning:** In Rust performance-critical image processing loops, sequential linear color adjustments (e.g., brightness, contrast, saturation) can be mathematically fused into a single 3x3 affine transformation matrix and a scalar offset computed before the loop.
**Action:** Replace multiple per-pixel arithmetic instructions and conditionals with a single matrix multiplication to improve performance. When calculating the final offset vector, multiply the original offset by the rows of the transformation matrix, not the columns.
