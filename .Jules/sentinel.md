## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-06-07 - Arbitrary File Write Vulnerability via Extension Bypass
**Vulnerability:** The application allowed writing output images to arbitrary file extensions because `app.fs_scope().is_allowed()` only validates the directory path.
**Learning:** Tauri's `fs_scope` does not restrict file extensions. If the extension isn't manually validated, attackers could potentially write arbitrary files (like scripts) if the underlying image library can be manipulated.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions before writing output files in backend commands.
