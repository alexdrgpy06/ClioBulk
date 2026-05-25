## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2026-05-25 - Arbitrary File Write via Unvalidated Output Extensions
**Vulnerability:** Even when `app.fs_scope().is_allowed()` is used, it only validates the destination directory path. A malicious actor could provide a filename with a non-image extension (like `.sh` or `.exe`) to write arbitrary files into allowed directories.
**Learning:** Tauri's filesystem scope validates paths at the directory level but does not restrict file types. Application logic must enforce file type restrictions explicitly.
**Prevention:** Always whitelist and validate file extensions case-insensitively (e.g., using `.to_lowercase()`) before saving output files.
