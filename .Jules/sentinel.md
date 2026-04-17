## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write Bypass via Output Extension
**Vulnerability:** The backend `process_image` command validates standard filesystem scopes (`fs_scope().is_allowed(&out_path)`) but doesn't restrict the output file extension, allowing potential arbitrary file creation (e.g., `.sh`, `.exe`) within the allowed scope.
**Learning:** In Tauri, `fs_scope` alone only restricts *where* files can be read/written, not *what* file types are written. It's insufficient for protecting against arbitrary file writes when generating files from user-controlled paths.
**Prevention:** Always explicitly whitelist allowed file extensions (e.g., `.jpg`, `.png`, `.webp`) before validating the scope and saving the file.
