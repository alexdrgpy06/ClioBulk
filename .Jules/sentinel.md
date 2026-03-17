## 2026-03-17 - Arbitrary File Write via Image Output
**Vulnerability:** The `process_image_inner` Rust command permitted writing files with any extension (e.g., .exe, .sh, .html) because it did not validate the `out_path` suffix.
**Learning:** Even if the filesystem scope is checked via `app.fs_scope().is_allowed()`, allowing arbitrary file extensions when saving image data can be exploited to overwrite configuration files or drop malicious executables if the output directory is broad (e.g., user home directory).
**Prevention:** Explicitly validate and whitelist output file extensions against safe image formats (e.g., .jpg, .png, .webp) before attempting to save the file.
