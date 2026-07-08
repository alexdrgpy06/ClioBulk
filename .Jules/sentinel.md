## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-07-08 - Arbitrary File Write via Unvalidated Output Extension
**Vulnerability:** The Tauri backend validated output paths using `app.fs_scope().is_allowed()`, but didn't restrict file extensions, allowing potential arbitrary file types (like scripts or executables) to be written if an attacker manipulated the destination path's extension.
**Learning:** Tauri's `fs_scope` only validates directory boundaries, not file types or extensions.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files in backend commands.
