## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Arbitrary File Write Bypass via File Extensions
**Vulnerability:** The application allowed arbitrary file types (like scripts or executables) to be saved via backend commands, even if the destination was within the allowed `fs_scope`, by just passing the arbitrary extension in the output path.
**Learning:** Tauri's `fs_scope` validation (`is_allowed`) only checks if the directory path is permissible, not the actual file extension being written. This requires explicit file extension whitelisting (e.g., `.jpg`, `.png`, `.webp`) to prevent arbitrary file writes when generating files.
**Prevention:** Explicit file extension whitelisting must be applied when saving files from the backend, in addition to scope checks.
