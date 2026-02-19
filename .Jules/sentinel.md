## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Unrestricted Output Extension
**Vulnerability:** The image processing command allowed users to specify any output file extension (e.g., `.sh`, `.exe`), potentially enabling arbitrary file write vulnerabilities if the output path is within an executable directory.
**Learning:** `image::save` infers format from extension but doesn't restrict it to safe image types. Scope validation (`fs_scope`) prevents writing outside allowed directories but doesn't validate file type/extension safety.
**Prevention:** Explicitly validate output file extensions against an allowlist (e.g., `jpg`, `png`) before file operations.
