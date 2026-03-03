## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2026-03-03 - Arbitrary File Write Bypass via Output Extension in Rust Commands
**Vulnerability:** The `process_image_inner` command in Tauri backend only checked directory permissions but allowed arbitrary output file extensions, permitting a malicious or misconfigured path to overwrite system files or executables (e.g., .sh, .exe, config files) if the parent directory was within the allowed scope.
**Learning:** Checking filesystem scope allows access to directories, but it doesn't protect against dangerous file types within those directories.
**Prevention:** Always implement explicit file extension validation (whitelisting safe formats like jpg, png, webp) before writing user-provided or processed output to disk.
