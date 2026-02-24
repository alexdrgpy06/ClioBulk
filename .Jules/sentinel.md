## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Output Path
**Vulnerability:** The `process_image` command accepted arbitrary file extensions for the output path, potentially allowing users to write dangerous files (e.g., `.sh`, `.exe`) even within the allowed scope.
**Learning:** `app.fs_scope().is_allowed()` only validates the directory path, not the file type or extension. Explicit validation of file extensions is necessary when the application controls file creation.
**Prevention:** Implement a whitelist of allowed file extensions (e.g., `jpg`, `png`, `webp`) and validate all output paths against this list before performing any file operations.
