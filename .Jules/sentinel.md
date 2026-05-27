## 2024-05-20 - Tauri fs_scope Output Extension Bypass
**Vulnerability:** Arbitrary file write vulnerability where `app.fs_scope().is_allowed()` only validates the output directory, not the file extension.
**Learning:** The Tauri v2 filesystem scope checks ensure the path is within an allowed directory but do not inherently restrict the file type or extension, allowing malicious frontends to specify dangerous file extensions (e.g., `.exe`, `.sh`) within the allowed directory.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., `.jpg`, `.png`) before writing output files in backend commands, even if the path is permitted by the scope.
