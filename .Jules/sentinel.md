## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** The image saving function allows arbitrary file writes because it doesn't validate the output file extension. `is_allowed` checks the path scope but not the file type, allowing an attacker to save an image as `.sh`, `.exe`, or other potentially dangerous executable extensions.
**Learning:** `fs_scope` validation (`is_allowed`) alone is insufficient when generating files; it does not restrict the file type being written.
**Prevention:** Always apply explicit file extension whitelisting (e.g., .jpg, .png, .webp) to prevent arbitrary file writes when generating output files.
