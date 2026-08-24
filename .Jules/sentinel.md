## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2026-08-24 - [Arbitrary File Write via Unvalidated Extensions]
**Vulnerability:** Missing output file extension validation allows arbitrary file writes because Tauri's fs_scope only validates directory paths.
**Learning:** In Tauri backend commands, app.fs_scope().is_allowed() only validates the destination directory path, not the file extension. This can lead to arbitrary file write vulnerabilities.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions before writing output files.
