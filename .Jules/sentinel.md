## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-06-14 - Arbitrary File Write via Unvalidated Output Extension
**Vulnerability:** The Tauri backend permitted writing to files with arbitrary extensions, allowing potential execution of malicious scripts or system configuration overrides.
**Learning:** `app.fs_scope().is_allowed()` only validates the allowed directory path boundaries and does not inspect the file extension being written.
**Prevention:** Always implement manual, case-insensitive whitelist validation for file extensions (e.g., .jpg, .png) before performing any file write operations.
