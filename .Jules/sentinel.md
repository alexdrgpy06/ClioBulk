## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-22 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** Arbitrary file writes are possible because Tauri's fs_scope only validates destination directories, not file extensions.
**Learning:** The fs_scope().is_allowed() check ensures the user picked an allowed folder, but does not prevent them from saving dangerous file types (like .sh or .exe).
**Prevention:** Always explicitly whitelist and validate output file extensions case-insensitively before saving files.
