## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Prevent Arbitrary File Writes in Image Processing
**Vulnerability:** The application allowed processing to output files with any extension, which could lead to arbitrary file writes even within allowed directories.
**Learning:** File extension whitelisting is necessary to ensure only valid image extensions (.jpg, .jpeg, .png, .webp) are allowed, as checking scope limits directory access but not file type.
**Prevention:** Explicitly validate output paths against an allowed list of extensions before processing.
