## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-23 - Arbitrary File Write via Output Path Extension Bypass
**Vulnerability:** The application allowed specifying any file extension for the output image path (e.g., .sh, .exe).
**Learning:** Tauri's `fs_scope().is_allowed()` only checks if the target path is within permitted directories, not the file type or extension.
**Prevention:** Always explicitly whitelist output file extensions (e.g., .jpg, .png, .webp) before performing file save operations in Tauri commands.
