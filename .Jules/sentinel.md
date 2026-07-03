## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2025-01-22 - Arbitrary File Write Vulnerability
**Vulnerability:** The application saves image processing output to a file without checking the file extension, leading to arbitrary file write vulnerabilities since `fs_scope().is_allowed()` only checks directory permissions.
**Learning:** `app.fs_scope().is_allowed()` in Tauri only validates the destination directory path, not the file extension. Saving output blindly based on user-controlled extensions can overwrite arbitrary config or script files.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions before writing output files.
