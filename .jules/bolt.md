## 2024-05-08 - Affine Transformation Fusion
**Learning:** In Rust performance-critical image loops, sequential linear color adjustments (brightness, contrast, saturation) cause unnecessary per-pixel arithmetic and branching. They can be mathematically fused into a single 3x3 affine transformation matrix and offset.
**Action:** Pre-compute the 3x3 matrix and scalar offset vector before the loop, and apply it with a single matrix multiplication per pixel. Ensure the original offset is multiplied by the rows of the transformation matrix, not the columns.
