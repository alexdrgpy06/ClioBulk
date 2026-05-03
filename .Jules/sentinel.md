## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Allowed Directory Scopes
**Vulnerability:** Arbitrary file write due to missing extension validation in Tauri output paths.
**Learning:** `app.fs_scope().is_allowed()` only validates the directory path, not the file type. Attackers can write executable files (e.g., `.sh`, `.exe`) into allowed directories.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) before saving files to disk.
