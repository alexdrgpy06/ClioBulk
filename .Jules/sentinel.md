## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - Arbitrary File Write Prevention & Overly Permissive Filesystem Access in Tauri
**Vulnerability:** The application was vulnerable to arbitrary file writes because it didn't restrict file extensions when saving processed images, allowing potentially dangerous files to be written to the system. Additionally, the default filesystem capabilities were overly permissive, granting broad read/write access instead of restricting it to specific directories like `$PICTURE`.
**Learning:** Relying solely on Tauri's default broad scopes (`fs:allow-read`, `fs:allow-write`) is insecure. Furthermore, even with restricted scopes, explicit file extension whitelisting is required to prevent users from writing unexpected file types (e.g., executable scripts) to allowed directories.
**Prevention:** Always replace generic filesystem scopes with explicitly defined, limited paths (e.g., `$PICTURE/**`). Always validate output file extensions against an explicit whitelist of expected types (e.g., `.jpg`, `.png`, `.webp`) before writing any file.
