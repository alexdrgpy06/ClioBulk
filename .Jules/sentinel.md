## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-26 - Arbitrary File Write Bypass via Extension
**Vulnerability:** app.fs_scope().is_allowed() only validates the directory path, allowing arbitrary file extensions to be written.
**Learning:** Tauri's scope validation does not restrict file types, making it possible for an attacker to write malicious scripts or executables in allowed directories if file extension isn't manually verified.
**Prevention:** Implement case-insensitive whitelist validation of file extensions before performing file write operations.
