## 2024-05-31 - Arbitrary File Write via Unvalidated Output Extension
**Vulnerability:** The Tauri backend accepted any file extension for the output path in the image processing pipeline.
**Learning:** Tauri's fs_scope().is_allowed() only validates that the destination directory is permitted, but it does not restrict the file extension.
**Prevention:** Always implement manual, case-insensitive whitelist validation of file extensions (e.g., .jpg, .png) before writing output files.
