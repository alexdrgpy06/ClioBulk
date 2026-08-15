## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-08-15 - Arbitrary File Write via Output Path Extension Bypass
**Vulnerability:** Tauri's fs_scope only validates directory paths, not file extensions. This allows writing arbitrary executable or malicious files (e.g., .sh, .exe) into allowed directories.
**Learning:** app.fs_scope().is_allowed() is insufficient for output file validation in processing pipelines.
**Prevention:** Always implement explicit case-insensitive whitelist validation of file extensions (e.g., .jpg, .png) before writing output files.
