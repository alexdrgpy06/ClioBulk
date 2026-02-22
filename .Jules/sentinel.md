## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-25 - Unrestricted File Write via Image Export
**Vulnerability:** The application blindly accepted any output file path and extension, allowing users (or compromised renderers) to create potentially dangerous files (e.g., .exe, .sh) if the destination path was within the allowed FS scope.
**Learning:** `fs_scope` only restricts *where* files can be written, not *what* kind of files. Image processing libraries often infer format from extension, making this an easy vector for writing executable code disguised as images or simply overwriting critical files with image data.
**Prevention:** Implement strict allowlist validation for output file extensions (e.g., jpg, png) in backend commands before performing any write operations.
