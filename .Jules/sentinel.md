## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - File Extension Bypass in Tauri Scopes
**Vulnerability:** Arbitrary file write due to insufficient path validation.
**Learning:** `app.fs_scope().is_allowed()` only verifies that a path falls within a permitted directory. It does NOT restrict file extensions, allowing potential arbitrary file writes (e.g., `.sh`, `.exe`) within allowed folders.
**Prevention:** Always explicitly whitelist safe output file extensions (e.g., `.jpg`, `.png`) using case-insensitive comparisons before writing files, even when the path passes scope validation.
