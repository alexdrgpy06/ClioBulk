## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2026-08-17 - Arbitrary File Write Prevention
**Vulnerability:** Tauri's `app.fs_scope().is_allowed()` only validates the destination directory path, not the file extension, allowing potential arbitrary file writes.
**Learning:** Backend commands must enforce file type constraints explicitly even if directory access is scoped.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions before writing output files.
