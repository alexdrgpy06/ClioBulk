## 2024-05-24 - Arbitrary File Write via Unrestricted Extensions
**Vulnerability:** Arbitrary File Write due to missing extension whitelisting on processed image output paths.
**Learning:** `fs_scope` validation (`is_allowed`) in Tauri only verifies the file path is within allowed directories, it does not validate the file type or extension. Without explicit extension checking, malicious inputs could bypass intended functionality and write arbitrary files (e.g., scripts) to allowed directories.
**Prevention:** Always implement explicit file extension whitelists (e.g., .jpg, .png, .webp) when generating files, even if the destination path is within an allowed `fs_scope`.
