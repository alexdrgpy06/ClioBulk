## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-06-01 - Arbitrary File Write via Unvalidated Output Extensions
**Vulnerability:** Backend write operations rely solely on `app.fs_scope().is_allowed()`, which only validates the destination directory, not the file extension, allowing arbitrary file writes.
**Learning:** Tauri's `fs_scope` does not inherently prevent writing executable or script files if the directory is allowed.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions before writing output files.
