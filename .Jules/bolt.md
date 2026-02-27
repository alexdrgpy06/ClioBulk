## 2024-05-24 - [Avoid Unnecessary Image Cloning]
**Learning:** `DynamicImage::to_rgb8()` allocates a new buffer and copies data, taking ~500ms for a 24MP image. `DynamicImage::into_rgb8()` consumes the image and reuses the buffer, taking ~86ns.
**Action:** Always prefer `into_*` methods (like `into_rgb8`, `into_luma8`) over `to_*` (like `to_rgb8`, `to_luma8`) when the original image is no longer needed, especially in high-performance pipelines.
