## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** The image processing command validated the output directory scope but not the output file extension, allowing arbitrary file writes (e.g., .sh, .exe) if an attacker controls the output path.
**Learning:** Tauri's `fs_scope().is_allowed()` only validates the directory/path permissions, not the file type or extension being written.
**Prevention:** Always explicitly whitelist output file extensions (e.g., .jpg, .png, .webp) before saving files to disk.
