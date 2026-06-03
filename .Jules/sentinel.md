## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-03 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** The backend command `process_image_inner` saved files to paths specified by the frontend without checking the file extension, potentially allowing arbitrary file writes (e.g., writing executable or script files) into allowed directories.
**Learning:** `app.fs_scope().is_allowed()` validates directory scope boundaries but does not restrict file extensions, leaving a gap where any file type could be written if the directory is allowed.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before performing file writes.
