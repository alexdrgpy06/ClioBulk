## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-22 - Arbitrary File Write Bypass via File Extensions
**Vulnerability:** The application allowed writing arbitrary file types (e.g., .sh, .exe) even if the destination directory was within the allowed `fs_scope()`.
**Learning:** `app.fs_scope().is_allowed()` only validates the path directory, not the file extension or type.
**Prevention:** Always explicitly whitelist allowed output file extensions (e.g., .jpg, .png) before saving files, and ensure the check is case-insensitive (using `.to_lowercase()`).
