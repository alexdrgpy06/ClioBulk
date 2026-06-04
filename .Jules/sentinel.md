## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-25 - Prevent Arbitrary File Write Vulnerability
**Vulnerability:** The `app.fs_scope().is_allowed()` method only validates the destination directory, not the file extension, allowing potential arbitrary file writes (e.g. writing executables) if user specifies an arbitrary extension.
**Learning:** In Tauri, the `is_allowed()` check on paths does not restrict file types. Developers might assume it restricts to image formats simply because it's an image processing app.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files in Tauri backend commands.
