## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Whitelisting Output Extensions
**Vulnerability:** Arbitrary File Write vulnerability due to the application not validating the file extension of output paths, allowing potentially dangerous files like `.sh` or `.exe` to be saved if the directory is permitted by `fs_scope`.
**Learning:** `app.fs_scope().is_allowed()` only checks if the directory is allowed, it does not validate the file type or extension.
**Prevention:** Always whitelist and strictly enforce allowed file extensions (e.g., `.jpg`, `.png`, `.webp`) before saving files in Tauri backend commands.
