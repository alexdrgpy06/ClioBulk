## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-24 - Insecure Cross-Platform Path Construction
**Vulnerability:** Constructing file paths using string concatenation (e.g., `${dir}\\${file}`) creates invalid paths on non-Windows systems and can lead to unintended file creation or path traversal if input isn't strictly sanitized.
**Learning:** Hardcoded separators are dangerous in cross-platform apps. Frontend-side filename inputs from `File` objects can contain unsafe characters.
**Prevention:** Use `@tauri-apps/api/path`'s `join` for OS-agnostic path construction and implement strict filename sanitization (removing control chars, reserved symbols, and traversal sequences) before passing paths to the backend.
