## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-13 - Arbitrary File Extension Write Bypass
**Vulnerability:** Output file paths were only validated for directory access via `fs_scope`, allowing arbitrary file extensions to be specified.
**Learning:** `app.fs_scope().is_allowed()` only checks if the target directory is within the permitted scope, it does not validate file extensions.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files to prevent arbitrary file write vulnerabilities.
