## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-28 - Arbitrary File Write Bypass via Allowed Directory Scopes
**Vulnerability:** Even if `fs_scope().is_allowed()` is checked, it only validates that the destination directory is permitted. It does not validate the file extension, allowing writing of arbitrary files (e.g., scripts) to allowed directories.
**Learning:** Tauri's `fs_scope` operates on paths, not extensions. Backend commands writing files must manually enforce file type whitelists to prevent malicious file creation.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files.
