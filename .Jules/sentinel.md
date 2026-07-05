## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write Bypass via Extension
**Vulnerability:** Arbitrary file write vulnerability where users could supply out-of-bounds extensions (e.g., .sh, .bat) to the output path, which bypassed directory-only checks from `app.fs_scope().is_allowed()`.
**Learning:** Tauri's `fs_scope()` solely checks directory paths, lacking validation for the file's extension.
**Prevention:** Always implement an explicit, manual whitelist validation of file extensions before performing file write operations.
