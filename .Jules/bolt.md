## 2024-05-24 - Fusing Sequential Linear Color Adjustments
**Learning:** In Rust performance-critical image processing loops, sequential linear color adjustments (brightness, contrast, saturation) can be mathematically fused into a single 3x3 affine transformation matrix and a scalar offset.
**Action:** Always pre-calculate the combined matrix and ensure the original offset is multiplied by the rows of the transformation matrix, replacing multiple per-pixel instructions with one matrix multiplication.
