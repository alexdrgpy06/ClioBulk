## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-24 - Arbitrary File Write via Unvalidated Extension in Tauri Scope
**Vulnerability:** The application allowed arbitrary file write vulnerabilities because `app.fs_scope().is_allowed()` only validates the destination directory path, not the output file extension.
**Learning:** Tauri's filesystem scope validates directories, but allows creating any file type (e.g., scripts or executables) within an allowed directory if the application does not manually restrict extensions.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`, `.webp`) before writing output files in backend commands.
