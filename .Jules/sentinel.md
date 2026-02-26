## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2026-02-26 - Arbitrary File Extension Write
**Vulnerability:** Backend commands allowed users to specify any output file extension (e.g., `.sh`, `.exe`), potentially enabling the creation of malicious executable files even within allowed scopes.
**Learning:** `app.fs_scope().is_allowed()` only validates directory access, not file type or extension. Scope checks alone are insufficient to prevent arbitrary file creation.
**Prevention:** Implement strict allowlists for file extensions (e.g., jpg, png, webp) on all user-provided output paths.
