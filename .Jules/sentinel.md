## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-08-16 - Missing File Extension Validation in Output Paths
**Vulnerability:** The application verifies if the output directory is allowed using `app.fs_scope().is_allowed(&out_path)` but fails to validate the file extension of the output path. This could allow an attacker to write arbitrary files (like executables or scripts) if the application doesn't restrict the format of the output image based on extension.
**Learning:** `app.fs_scope().is_allowed()` only checks if the target path is within the allowed directories, not its type or extension.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files, especially when user input dictates the output file name.
