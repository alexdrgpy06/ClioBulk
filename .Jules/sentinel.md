## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** In Tauri applications, `app.fs_scope().is_allowed()` validates the destination directory path, but not the file extension, potentially allowing arbitrary file writes.
**Learning:** Relying solely on `fs_scope` is insufficient for file write operations; explicit extension validation is required to ensure only safe file types are written.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) and use case-insensitive validation (e.g., `.to_lowercase()`) before writing files to disk.
