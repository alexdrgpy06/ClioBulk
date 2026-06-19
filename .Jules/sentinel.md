## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-06-19 - Prevent Arbitrary File Write
**Vulnerability:** The application was not validating the file extensions for the output paths during bulk processing.
**Learning:** `app.fs_scope().is_allowed()` only validates destination directories, allowing an attacker to write executable files if the path points to an allowed directory.
**Prevention:** Implement case-insensitive whitelist validation of file extensions (e.g., .jpg, .png) before writing any output files in backend commands.
