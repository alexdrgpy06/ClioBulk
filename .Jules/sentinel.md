## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-17 - Arbitrary File Write via Unvalidated Output Extensions
**Vulnerability:** The backend image processing command validates the directory via `app.fs_scope().is_allowed()`, but fails to restrict the output file extension. An attacker could potentially coerce the system to write files with dangerous extensions if the path is within the allowed scope.
**Learning:** `app.fs_scope().is_allowed()` only checks if the target path resides within an allowed directory tree; it does not intrinsically restrict file types.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files in backend commands.
