## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-26 - Arbitrary File Write via Scope Bypass
**Vulnerability:** Arbitrary file writes can bypass `app.fs_scope().is_allowed()` if only the directory path is checked.
**Learning:** Tauri's `is_allowed()` only validates the destination directory path, not the file type.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) before saving, and ensure validation is case-insensitive (e.g., using `.to_lowercase()`) to prevent bypasses via mixed-case extensions.
