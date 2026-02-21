## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Output File Validation Gap
**Vulnerability:** Application strictly validates input directory scopes but lacks output file type restrictions, allowing potential "polyglot" or unintended file writes.
**Learning:** `app.fs_scope().is_allowed()` only verifies *directory* access, not filename safety or extension integrity.
**Prevention:** Implement explicit `is_safe_extension` validation for all file output operations to enforce intended file formats.
