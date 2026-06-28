## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-28 - Arbitrary File Write via Unvalidated Output Extensions
**Vulnerability:** The application verified that the output directory was within scope but failed to validate the output file extension, allowing writing of arbitrary file types (like `.sh`, `.exe`, or HTML).
**Learning:** Tauri's filesystem scope (`fs_scope().is_allowed()`) only verifies directory/path access boundaries, not the types of files being written.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions before writing output files, especially when processing user-controlled filenames.
