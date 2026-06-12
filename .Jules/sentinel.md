## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2026-06-12 - Prevent Arbitrary File Write in Tauri Backend
**Vulnerability:** The Tauri backend relied solely on `app.fs_scope().is_allowed()` to validate output file paths, which only checks if the destination directory is permitted but ignores the file extension. This could allow an attacker to write arbitrary files (e.g., `.sh`, `.exe`) into an allowed directory.
**Learning:** `app.fs_scope().is_allowed()` does not provide protection against malicious file extensions when writing outputs. Tauri's scoped filesystem checks directory boundaries, not file types.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) on the backend before writing any files to disk, even if the target directory is within the allowed `fs_scope`.
