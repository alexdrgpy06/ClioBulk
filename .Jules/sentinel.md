## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** The application allowed saving processed images to any file extension if the destination folder was in scope, enabling arbitrary file writes (e.g., scripts, executables).
**Learning:** Validating filesystem scope only restricts the directory path, not the type of file being saved. Unrestricted extensions allow users to overwrite config files or save executable code.
**Prevention:** Always whitelist output file extensions (e.g., .jpg, .png) case-insensitively before saving files to the filesystem.
