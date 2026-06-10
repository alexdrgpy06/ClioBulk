## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-10-25 - Arbitrary File Write via Unvalidated Output Extension
**Vulnerability:** The application allowed writing output files with any extension by solely relying on Tauri's `app.fs_scope().is_allowed()`, which only validates the directory, not the file extension.
**Learning:** `app.fs_scope().is_allowed()` does not restrict file extensions, only the directory path. This allowed potential arbitrary file write if an attacker manipulated the output path.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files.
