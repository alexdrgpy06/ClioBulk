## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Arbitrary File Write via Output Path
**Vulnerability:** The application wrote files to user-provided output paths (`out_path`) without checking the file extension.
**Learning:** `fs_scope().is_allowed()` only validates that the *directory* is permitted, not the file type. This allows attackers to write executable files (like `.sh` or `.exe`) if they provide a malicious path with a non-image extension, potentially leading to arbitrary code execution.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) before saving files to disk.
