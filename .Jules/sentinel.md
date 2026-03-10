## 2024-03-10 - [Arbitrary File Write in Image Processing]
**Vulnerability:** The `process_image_inner` function did not validate the output file extension, allowing users to write to arbitrary file types (e.g., `.sh`, `.json`, `.txt`) using image data if they bypass UI checks, potentially leading to arbitrary file writes despite Tauri filesystem scoping (which only validates directories).
**Learning:** Tauri `fs_scope` checks only validate that a file is within allowed directories, not the file type itself. Explicit file extension validation is necessary in commands that save files.
**Prevention:** Created `is_safe_extension` in `security.rs` to explicitly validate that output paths use safe image extensions ("jpg", "jpeg", "png", "webp") before writing to disk.
