## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2026-05-18 - Arbitrary File Write Bypass via Missing Extension Validation
**Vulnerability:** Arbitrary file write vulnerability where `app.fs_scope().is_allowed()` only validates the destination directory but not the file extension, allowing malicious files like `.sh` or `.exe` to be written to allowed directories.
**Learning:** `fs_scope` checks are insufficient for ensuring safe file creation, as they do not restrict the type of file being saved.
**Prevention:** Always explicitly whitelist and validate output file extensions (case-insensitively) before saving files, in addition to enforcing directory scopes.
