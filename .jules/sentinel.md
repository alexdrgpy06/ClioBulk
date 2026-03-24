## 2024-03-24 - Arbitrary file write vulnerability
**Vulnerability:** The application was vulnerable to arbitrary file writes because it relied solely on Tauri's `fs_scope()` to validate write paths, which checks the path location but not the file extension.
**Learning:** In Tauri, `fs_scope` validation (`is_allowed`) alone is insufficient as it does not restrict the file type being written. Malicious actors could write executable scripts or system configuration files.
**Prevention:** Explicit file extension whitelisting (e.g., .jpg, .png, .webp) must be applied in addition to path scope validation to prevent arbitrary file writes when generating files.
