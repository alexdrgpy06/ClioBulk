## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Arbitrary File Write via Unrestricted File Extensions
**Vulnerability:** The application verified write directory scopes but didn't restrict output file extensions, allowing arbitrary files (e.g., scripts or executables) to be saved within allowed directories.
**Learning:** `app.fs_scope().is_allowed()` only validates the destination directory path, not the file type.
**Prevention:** Explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) using case-insensitive validation before saving any file.
