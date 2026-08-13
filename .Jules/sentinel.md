## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2026-08-13 - Arbitrary File Write via Unvalidated Output Extension
**Vulnerability:** The Tauri backend relied solely on `app.fs_scope().is_allowed()` which only checks if the directory is permitted, allowing an attacker to write files with arbitrary extensions (like `.sh` or `.bat`) into the allowed directory.
**Learning:** `fs_scope` only validates directory paths, not file types or extensions.
**Prevention:** Always implement manual, case-insensitive whitelist validation for file extensions before processing and writing output files.
