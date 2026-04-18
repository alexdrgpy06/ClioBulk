## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-22 - Arbitrary File Write Bypass via Allowed Directory
**Vulnerability:** Even if Tauri's `fs_scope` correctly restricts file writes to an allowed directory (e.g., $PICTURES), arbitrary file types (like scripts or executables) can still be written to that directory if no explicit extension checks are enforced before `img.save(&out_path)`.
**Learning:** `fs_scope` validates location but not content type. When user-provided output paths are used for generating files, they must be explicitly whitelisted to expected extensions.
**Prevention:** Always combine `fs_scope` validation with hardcoded extension whitelisting (e.g., `[".jpg", ".png"].iter().any(...)`) when handling file saving operations.
