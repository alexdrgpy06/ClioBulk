## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2025-01-20 - Arbitrary File Write bypass
**Vulnerability:** Output file paths from Tauri commands allowed any extension to be written, bypassing logical application boundaries even if the directory was in `fs_scope`.
**Learning:** `fs_scope` only restricts *where* a file can be written, not *what* type of file. Writing arbitrary files (e.g. `.exe`, `.sh`) is a security risk.
**Prevention:** Always whitelist allowed file extensions (e.g., `.jpg`, `.png`, `.webp`) in backend commands that write files.
