## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-23 - Prevent Arbitrary File Write in Tauri Commands
**Vulnerability:** The application relied solely on `app.fs_scope().is_allowed()` to validate the destination path for processed images, which only validates the directory, not the file extension.
**Learning:** Tauri's `fs_scope` does not inherently restrict file extensions, meaning a compromised frontend could potentially write arbitrary files (like executables or scripts) to allowed directories.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) in the Rust backend before writing output files.
