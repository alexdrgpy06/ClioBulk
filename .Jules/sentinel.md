## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-17 - File Extension Whitelisting
**Vulnerability:** Arbitrary file extension write
**Learning:** Tauri's fs_scope().is_allowed() only validates directory path, not file types.
**Prevention:** Always explicitly whitelist allowed file extensions (case-insensitively) before file writing operations in Tauri apps.
