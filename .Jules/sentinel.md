## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-22 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** `app.fs_scope().is_allowed()` only validates the destination directory path, not the file type, allowing arbitrary file writes (e.g., `.sh`, `.exe`).
**Learning:** Even when destination directories are restricted by scopes, an attacker controlling the output filename can write malicious executables if extensions are not validated.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) before saving, and ensure the validation is case-insensitive using `.to_lowercase()` to prevent bypasses via mixed-case extensions.
