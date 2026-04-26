## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Arbitrary file write due to insufficient path validation in native commands.
**Learning:** app.fs_scope().is_allowed() only checks if the directory is permitted, but does not restrict file extensions, allowing arbitrary file creation (e.g. .sh, .exe).
**Prevention:** Always explicitly whitelist acceptable file extensions when saving files, even within allowed scopes.
