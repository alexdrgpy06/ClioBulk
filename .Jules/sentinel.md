## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-10-24 - Arbitrary File Write via Extension Bypass
**Vulnerability:** Tauri backend commands did not validate output file extensions, potentially allowing writes of non-image arbitrary files.
**Learning:** `app.fs_scope().is_allowed()` only validates the directory path allowance, not the specific file extensions or types being written.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files.
