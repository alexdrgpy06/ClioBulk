## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-23 - Tauri Filesystem Scope Extension Bypass
**Vulnerability:** `app.fs_scope().is_allowed()` only validates destination directory path, not the file type, allowing arbitrary file writes (e.g., `.sh`, `.exe`) within allowed directories.
**Learning:** Tauri scopes do not restrict file extensions. Backend commands saving files must explicitly whitelist output file extensions to prevent malicious file creation.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) before saving files in Rust commands.
