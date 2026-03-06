## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Missing Extension Validation
**Vulnerability:** Even if a directory is allowed by Tauri's `fs_scope`, lacking validation on the *extension* of output files in backend commands allows writing arbitrary files (e.g. `.exe`, `.sh`, `.bashrc`) to those allowed directories.
**Learning:** `fs_scope` only validates if an application has permission to access a directory or file path. It does not validate the type or safety of the content being written, leaving the application vulnerable to dropping malicious scripts or executables if the output file path is user-controlled.
**Prevention:** Always explicitly validate the file extension or file type in Rust commands prior to performing file writes, especially when dealing with image processing or file conversion outputs.
