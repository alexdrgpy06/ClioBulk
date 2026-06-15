## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-06-25 - Arbitrary File Write Vulnerability via Extension Bypass
**Vulnerability:** The `process_image_inner` function writes to any `out_path` provided by the frontend. The Tauri `app.fs_scope().is_allowed()` only checks if the destination directory is permitted, but doesn't validate the file extension. This could allow an attacker to write arbitrary executable files (e.g., `.exe`, `.dll`) to a permitted directory.
**Learning:** `app.fs_scope().is_allowed()` does not restrict file extensions, only paths. Relying on it alone is insufficient for restricting file types.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions before performing file write operations.
