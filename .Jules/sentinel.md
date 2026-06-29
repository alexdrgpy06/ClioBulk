## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-24 - File Extension Bypass in Tauri Write Operations
**Vulnerability:** Arbitrary file write due to insufficient path validation. `fs_scope().is_allowed()` only validates the destination directory, allowing writes to arbitrary extensions like `.bat` or `.sh`.
**Learning:** `fs_scope().is_allowed()` does not restrict file types. Application-level logic must enforce a strict whitelist for file extensions.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files.
