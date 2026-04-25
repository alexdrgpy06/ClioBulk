## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-22 - Missing Whitelist Validation for Outputs
**Vulnerability:** The application verifies output directory using `is_allowed()` but allows arbitrary extensions when saving files.
**Learning:** `app.fs_scope().is_allowed()` only validates the directory, not the file type, risking writes of executables like `.sh` or `.exe`.
**Prevention:** Explicitly whitelist and validate target file extensions before performing file save operations.
