## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Arbitrary File Write Bypass
**Vulnerability:** The application saves image files to arbitrary paths without validating the file extension, potentially allowing the creation of executable or system files if the user crafts a malicious output path.
**Learning:** In Tauri, `fs_scope` validation (`is_allowed`) alone is insufficient as it only restricts the path, not the file type being written. Explicit file extension whitelisting must be applied when generating files.
**Prevention:** Always whitelist and validate file extensions before writing files to the disk to prevent arbitrary file writes.
