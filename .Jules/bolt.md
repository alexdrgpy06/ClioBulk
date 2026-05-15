## 2024-05-18 - Fusing Linear Color Adjustments in Rust
**Learning:** In Rust performance-critical image processing loops, sequential linear color adjustments (brightness, contrast, saturation) can be mathematically fused into a single 3x3 affine transformation matrix and a scalar offset.
**Action:** Pre-compute the affine matrix and scalar offset before the loop to replace multiple per-pixel conditionals and arithmetic operations, significantly speeding up the hot path.
