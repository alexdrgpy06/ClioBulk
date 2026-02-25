## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2025-05-23 - Arbitrary File Extension Write
**Vulnerability:** Output file extensions were inferred from user input without validation, allowing users to potentially create non-image files (e.g., .exe, .sh) or misleading file types via the `process_image` command.
**Learning:** Checking `app.fs_scope().is_allowed()` only validates the directory/path permission, not the file type or extension safety. Library functions like `image.save()` rely on extensions to determine format, which can be manipulated.
**Prevention:** Implement strict allowlist validation for output file extensions (e.g., jpg, png) in backend commands before performing file write operations.
