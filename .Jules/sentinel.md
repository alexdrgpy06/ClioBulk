## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unvalidated Extensions
**Vulnerability:** The Rust backend accepted arbitrary file paths for saving processed images, allowing potential execution of malicious files (e.g., `.sh`, `.exe`) if the path was within the allowed `fs_scope`.
**Learning:** `app.fs_scope().is_allowed()` only validates that the destination directory is permitted, but it does NOT restrict the type of file being created.
**Prevention:** Always explicitly whitelist allowed output file extensions (e.g., `.jpg`, `.png`, `.webp`) before saving files to disk, ensuring case-insensitive validation to prevent bypasses.
