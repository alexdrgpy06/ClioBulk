## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2025-05-22 - Missing Output File Extension Whitelisting
**Vulnerability:** The application saves processed images without verifying the output file extension, relying solely on Tauri's fs_scope. This could allow writing arbitrary file types (e.g., scripts) if an attacker controls the output path.
**Learning:** In Tauri, fs_scope validation only checks if a directory/path is allowed; it does not restrict the file type being written. Explicit extension whitelisting must be implemented in the backend command before writing files.
**Prevention:** Always whitelist and validate file extensions for output paths in native backend commands, even when paths are scoped. Use `path.to_lowercase().ends_with()` against a strict list of allowed extensions.
