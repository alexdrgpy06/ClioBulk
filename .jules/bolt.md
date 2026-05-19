## 2025-02-12 - Mathematical Fusion of Linear Color Adjustments
**Learning:** Sequential linear color adjustments (brightness, contrast, saturation) applied inside performance-critical pixel loops can be mathematically fused into a single 3x3 affine transformation matrix and a scalar offset vector computed once outside the loop.
**Action:** Before optimizing multi-step pixel color manipulation loops in Rust, check if the operations are affine and can be combined into a single matrix multiplication to replace multiple arithmetic instructions and conditional branches per pixel.
