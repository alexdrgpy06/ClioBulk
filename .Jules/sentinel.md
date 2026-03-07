## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write via Output Path
**Vulnerability:** The `process_image_inner` command accepts `out_path` from the frontend and uses it directly in `img.save(&out_path)`. While directory access is verified via Tauri's scopes (`is_allowed`), this does not enforce file extension safety. An attacker could potentially write arbitrary files (like `.sh`, `.exe`, etc.) to allowed directories.
**Learning:** Checking a directory scope is not enough when saving user-controlled file paths. File extension validation must be applied to strictly restrict the types of files created by backend commands.
**Prevention:** Always validate file extensions against an allowlist (e.g., `jpg`, `png`, `webp`) before performing filesystem write operations, ensuring no arbitrary file types are written.
