## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unvalidated Extensions
**Vulnerability:** Output file extensions were not validated before saving, allowing arbitrary file writes (e.g., `.sh`, `.exe`) even when the directory was within the allowed `fs_scope`.
**Learning:** Tauri's `fs_scope().is_allowed()` only checks if the destination directory is permitted, not the file extension or type.
**Prevention:** Always implement manual whitelist validation for file extensions when writing files based on user input.
