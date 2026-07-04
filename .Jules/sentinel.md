## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Arbitrary File Write via Unvalidated Extensions
**Vulnerability:** The application allowed writing arbitrary file extensions (e.g., .sh, .exe) as output from the image processing command, relying solely on Tauri's `fs_scope()` which only validates the directory.
**Learning:** Tauri's `fs_scope().is_allowed()` only validates that the destination path falls within an allowed directory. It does NOT enforce file type or extension restrictions, allowing an attacker to bypass intended file type constraints if they control the output filename.
**Prevention:** Always implement explicit, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) in backend commands before performing write operations, in addition to using `fs_scope()`.
