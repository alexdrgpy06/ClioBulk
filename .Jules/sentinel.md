## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2026-05-29 - Arbitrary File Write via Extension Bypass
**Vulnerability:** File writes in Tauri backend rely solely on directory validation via `fs_scope().is_allowed()`, allowing an attacker to bypass intended file types and potentially write arbitrary files by using unauthorized extensions.
**Learning:** `app.fs_scope().is_allowed()` only validates the destination directory path and does not inspect file extensions.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files in backend commands.
