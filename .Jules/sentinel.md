## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Missing Extension Validation
**Vulnerability:** Tauri's `fs_scope()` only validates directory paths, not file extensions. This allows writing arbitrary files (e.g., `.sh`, `.exe`) within allowed directories during image processing output.
**Learning:** `app.fs_scope().is_allowed()` is insufficient for file-level constraints. Additional manual validation is required to restrict operations to safe file types.
**Prevention:** Always implement explicit file extension validation (e.g., `is_safe_extension`) in addition to `fs_scope` checks before performing file write operations.
