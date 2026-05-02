## 2024-05-02 - Matrix Fusion for Image Adjustments
**Learning:** In Rust performance-critical image processing loops, sequential linear color adjustments (e.g., brightness, contrast, saturation) should be mathematically fused into a single 3x3 affine transformation matrix and a scalar offset computed before the loop. This replaces multiple per-pixel arithmetic instructions and conditionals with a single matrix multiplication.
**Action:** Fuse sequential pixel modifications into an affine matrix before iterating to save CPU cycles.
