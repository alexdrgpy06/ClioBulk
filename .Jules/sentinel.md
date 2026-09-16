## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2026-08-18 - Arbitrary File Write via Unvalidated Output Extension
**Vulnerability:** The backend allows writing files with arbitrary extensions because `app.fs_scope().is_allowed()` only validates the destination directory, not the file type.
**Learning:** The image processing library or standard file writing operations might be tricked into writing unexpected file types (like scripts or executables) if the extension is not restricted.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files in Tauri commands.
