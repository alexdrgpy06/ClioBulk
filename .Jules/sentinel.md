## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-07-06 - Arbitrary File Write via Unvalidated Extensions
**Vulnerability:** The backend image saving function did not validate the output file extension, relying only on Tauri's `fs_scope()` which validates directory paths but allows writing arbitrary file types (like executable `.exe` or `.sh` files).
**Learning:** In Tauri backend commands, `app.fs_scope().is_allowed()` only validates the destination directory path, not the file extension.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files.
