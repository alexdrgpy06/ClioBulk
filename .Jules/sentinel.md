## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2025-03-08 - [High] Arbitrary File Write Vulnerability
**Vulnerability:** The application was not verifying if the output extension was a safe image extension, which could lead to saving files as scripts (e.g. `.sh`, `.bashrc`) and thereby introducing arbitrary file write vulnerabilities in Tauri backend command logic.
**Learning:** `app.fs_scope().is_allowed()` only validates that the *directory* is permitted. It does not validate or restrict the file's extension.
**Prevention:** Always use explicit file extension validation (e.g., using `crate::security::is_safe_extension`) before processing and saving files to disc when an arbitrary file name is provided from the frontend.
