## 2024-05-18 - Prevent Arbitrary File Write

**Vulnerability:** The `process_image_inner` function allowed saving files with any extension. This could lead to an arbitrary file write vulnerability, enabling an attacker to overwrite configuration files or executables if they could control the output path.
**Learning:** `app.fs_scope().is_allowed()` only validates that the *directory* is permitted, but it does not restrict the *file extension*.
**Prevention:** Always implement an explicit check for safe file extensions (e.g., `.jpg`, `.png`, `.webp`) using a helper function like `is_safe_extension` before performing any file write operations.
