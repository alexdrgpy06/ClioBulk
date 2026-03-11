## 2024-03-11 - Enforce Safe File Extensions
**Vulnerability:** Arbitrary file write due to unrestricted output file extension in image processing commands.
**Learning:** `process_image_inner` in `src-tauri/src/commands.rs` relies on `app.fs_scope().is_allowed(&out_path)` which only checks directory permissions, not file extensions. This allows writing arbitrary file types (e.g., executable scripts) if the user has write access to the directory.
**Prevention:** Implement and use a `is_safe_extension` helper function to strictly validate output file extensions (e.g., jpg, jpeg, png, webp) before attempting to save the image.

## 2024-03-11 - Enforce Safe File Extensions
**Vulnerability:** Arbitrary file write due to unrestricted output file extension in image processing commands.
**Learning:** `process_image_inner` in `src-tauri/src/commands.rs` relies on `app.fs_scope().is_allowed(&out_path)` which only checks directory permissions, not file extensions. This allows writing arbitrary file types (e.g., executable scripts) if the user has write access to the directory.
**Prevention:** Implement and use a `is_safe_extension` helper function to strictly validate output file extensions (e.g., jpg, jpeg, png, webp) before attempting to save the image.
