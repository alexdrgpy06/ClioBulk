## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** Output file paths were validated against allowed directories using `is_allowed()`, but file extensions were not validated, allowing arbitrary file writes (e.g., `.sh`, `.exe`).
**Learning:** Tauri's `fs_scope().is_allowed()` only validates the directory path. It does not restrict the file type.
**Prevention:** Always explicitly whitelist allowed output file extensions case-insensitively before saving files to disk.
