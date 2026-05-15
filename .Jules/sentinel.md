## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** The out_path in image processing commands was only validated against the fs_scope directory, allowing potential creation of non-image files (e.g., scripts) if the file extension is not restricted.
**Learning:** app.fs_scope().is_allowed() only validates the directory path, not the file type. This can lead to arbitrary file writes if the file extension is not explicitly verified.
**Prevention:** Always explicitly whitelist allowed output file extensions (e.g., .jpg, .png, .webp) before saving, ensuring case-insensitive validation.
