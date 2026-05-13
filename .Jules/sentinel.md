## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-22 - Arbitrary File Write Bypass via File Extension
**Vulnerability:** The application relied on `app.fs_scope().is_allowed()` to validate output file paths, which only checks the directory but not the file extension, allowing writing of arbitrary file types like `.sh` or `.exe`.
**Learning:** Tauri's `fs_scope` does not prevent malicious file types if the directory is allowed.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) case-insensitively before saving files.
