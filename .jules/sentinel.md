## 2024-05-27 - [Arbitrary File Write in Image Processor]
**Vulnerability:** The `process_image_inner` function allowed writing an arbitrary file extension since it only validated the filesystem scope (`is_allowed()`) and didn't whitelist actual extensions.
**Learning:** In Tauri, `fs_scope` validation alone is insufficient to prevent arbitrary file writes (like `.exe` or `.sh` files) when generating files, as it does not restrict the file type being written.
**Prevention:** Always enforce explicit file extension whitelisting (e.g., .jpg, .png, .webp) when saving user-controlled files.
