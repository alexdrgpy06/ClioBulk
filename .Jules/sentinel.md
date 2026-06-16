## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-10-24 - Prevent arbitrary file write via extension validation
**Vulnerability:** The `app.fs_scope().is_allowed()` check in the Tauri backend only validates if the destination directory is permitted, but does not restrict the file extension of the output file, potentially allowing arbitrary file writes (e.g., executable files or scripts) if an attacker controls the output path string.
**Learning:** Tauri's `fs_scope` operates at the directory and path level for permissions but is format-agnostic. Security relies on explicit application-level validation of file extensions before performing file operations.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) alongside `fs_scope` checks before writing output files.
