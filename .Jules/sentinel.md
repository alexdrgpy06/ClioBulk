## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-23 - Arbitrary File Write via Output Path Bypass
**Vulnerability:** The Tauri commands allow arbitrary file writes (e.g., executable files) because `app.fs_scope().is_allowed()` only validates the destination directory, not the file type or extension.
**Learning:** Tauri's `fs_scope` does not restrict file extensions by default. Destination paths constructed or passed by the frontend must be independently validated on the backend to enforce safe file types.
**Prevention:** Always explicitly whitelist allowed output file extensions (using case-insensitive checks) for any backend command that saves files to disk.
