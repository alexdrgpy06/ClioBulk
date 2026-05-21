## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** Output file paths were validated against the Tauri fs scope, but the file extensions were not restricted. This allows arbitrary file writes (e.g. `.sh`, `.exe`) in an allowed directory.
**Learning:** `app.fs_scope().is_allowed()` only validates the path directory/prefix, not the file type or extension.
**Prevention:** Always explicitly whitelist output file extensions before writing files to prevent arbitrary file execution or overwrite vulnerabilities.
