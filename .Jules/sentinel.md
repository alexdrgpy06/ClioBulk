## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write Bypass via Image Export
**Vulnerability:** Even when `fs_scope` write checks are enforced, passing unsanitized extensions to `image.save()` allows writing arbitrary file types (like scripts or executables) within the allowed directory, leading to potential execution if the directory is misconfigured or accessible.
**Learning:** `fs_scope` validation only restricts the path/directory, not the content or type of file being written. The image processing library happily creates whatever extension is requested.
**Prevention:** Always combine `fs_scope` validation with explicit file extension whitelisting for the specific domain (e.g., `.jpg`, `.png` for image exports).
