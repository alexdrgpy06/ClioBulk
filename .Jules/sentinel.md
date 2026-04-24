## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write Bypass via Missing Extension Whitelisting
**Vulnerability:** The application allowed writing arbitrary file types (e.g., .sh, .exe) to the filesystem as long as the destination directory was within the allowed `fs_scope`.
**Learning:** In Tauri, `fs_scope` validation (`is_allowed`) only restricts *where* a file can be written, not *what* type of file. It is insufficient for preventing arbitrary file writes when generating files.
**Prevention:** Explicit file extension whitelisting (e.g., .jpg, .png, .webp) must be implemented alongside path scope validation to restrict the file type being written.
