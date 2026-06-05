## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-23 - Arbitrary File Write via Unvalidated Extensions
**Vulnerability:** The image processing command validated the output directory against the filesystem scope but did not validate the output file extension, allowing arbitrary file writes.
**Learning:** `app.fs_scope().is_allowed()` only validates directory access, not the content type or file extension being written.
**Prevention:** Always implement a strict case-insensitive whitelist of allowed file extensions before writing files, even when directory scope is validated.
