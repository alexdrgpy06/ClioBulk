## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** The image processing commands accepted any output file path, allowing arbitrary extensions (e.g., `.sh`, `.exe`) as long as the destination directory was permitted by `fs_scope`.
**Learning:** `app.fs_scope().is_allowed()` only validates the directory path and does not restrict file types.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`) before saving files to prevent arbitrary file writes.
