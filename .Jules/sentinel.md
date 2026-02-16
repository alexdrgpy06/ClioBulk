## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2026-02-16 - Cross-Platform Path Handling
**Vulnerability:** Manual path construction using hardcoded backslashes `\\` in the frontend created invalid paths on Linux/macOS and potential traversal risks on Windows.
**Learning:** Hardcoded path separators bypass platform-specific safety checks and break cross-platform compatibility.
**Prevention:** Always use platform-agnostic path joining functions (like `@tauri-apps/api/path`) and sanitize user input components before joining.
