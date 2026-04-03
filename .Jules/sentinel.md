## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Tauri v2 Filesystem Scope Bypass
**Vulnerability:** Generic filesystem permissions like "fs:allow-read" in Tauri capabilities grant overly broad access to the entire system, violating the principle of least privilege.
**Learning:** In Tauri v2, filesystem scopes must be explicitly restricted using configuration objects (e.g., restricted to specific directories like $PICTURE) rather than using generic permission strings.
**Prevention:** Always replace generic filesystem permissions in `capabilities/*.json` with strictly scoped objects.
