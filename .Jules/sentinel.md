## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** The backend image processing command accepted arbitrary output file paths. While Tauri's fs_scope checks whether the path is in an allowed directory, it does not restrict the file type being written. This allows an attacker to overwrite sensitive files or write arbitrary file formats (e.g., scripts) if they can manipulate the frontend payload to target a permitted base directory but with a different extension.
**Learning:** `is_allowed()` only validates location. When writing files, explicit extension whitelisting must be performed to ensure only expected file formats are created.
**Prevention:** Always whitelist output file extensions (.jpg, .png, etc.) before invoking file writing functions like `image.save()`.
