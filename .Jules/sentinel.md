## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Incomplete Input Validation in File Operations
**Vulnerability:** Relying solely on Tauri's filesystem scope (`fs_scope`) is insufficient to prevent writing dangerous file types (e.g., executables) if the scope is broad (e.g., user's Downloads folder).
**Learning:** `fs_scope` controls *where* files can be written, but not *what* content or extension is written. Backend commands must explicitly validate file extensions to enforce intended usage.
**Prevention:** Implement strict allowlists for file extensions in both input (read) and output (write) operations within Rust commands.
