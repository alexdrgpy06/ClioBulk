## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-19 - Arbitrary File Write Bypass in Tauri Scopes
**Vulnerability:** Tauri's `app.fs_scope().is_allowed()` only validates the destination directory path, not the file type, allowing arbitrary file writes (e.g., .sh, .exe) if the directory is allowed.
**Learning:** File scopes ensure directory boundaries but do not provide file type safety for outputs.
**Prevention:** Always explicitly whitelist output file extensions (e.g., .jpg, .png, .webp) before saving, and ensure validation is case-insensitive (e.g., using `.to_lowercase()`) to prevent bypasses.
