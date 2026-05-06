## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2025-05-06 - Enforce Output Extension Whitelist in Rust Backend
**Vulnerability:** Arbitrary file write due to insufficient destination file type validation. `fs_scope` only checks directory path, allowing attackers to overwrite or create malicious file types (e.g. `.sh`, `.exe`) by manipulating the requested `out_path` if the backend's image save function attempts to save to that extension.
**Learning:** `app.fs_scope().is_allowed()` only validates the destination directory path, not the file type.
**Prevention:** Always explicitly whitelist output file extensions (e.g., `.jpg`, `.png`, `.webp`) before saving, and ensure the validation is case-insensitive (e.g., using `.to_lowercase()`) to prevent bypasses via mixed-case extensions.
