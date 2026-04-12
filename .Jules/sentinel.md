## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write Bypass and Open Filesystem Capability
**Vulnerability:** Application allowed writes to any path through `fs:allow-write` and processing without file extension verification.
**Learning:** `is_allowed()` checks scope, but does not enforce file type constraints, which allows arbitrary file creation within the scope if extensions are not whitelisted. The default capabilities also exposed the entire filesystem rather than limiting to specific safe paths.
**Prevention:** Always restrict capabilities (e.g. `$PICTURE/**`) and explicitly validate file extensions in rust functions before saving to disk.
