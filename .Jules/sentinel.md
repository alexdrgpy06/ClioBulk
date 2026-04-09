## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Arbitrary File Write Bypass
**Vulnerability:** Even if Tauri's `fs_scope` is validated via `is_allowed`, if there are no checks on the file extension, it may lead to writing arbitrary file types into the allowed scopes (e.g., executing scripts).
**Learning:** `fs_scope` validates the location, not the content or format of the file. Explicit checks must be applied.
**Prevention:** Explicitly whitelist permitted file extensions for output paths in the backend commands before any file writing or saving logic is executed.
