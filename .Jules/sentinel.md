## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-25 - Arbitrary File Write via Image Save
**Vulnerability:** The `process_image_inner` command takes an arbitrary `out_path` string from the frontend and passes it directly to `image.save()`. Even with Tauri filesystem scope checks, a malicious frontend payload could trick the backend into writing executable files, scripts, or overwriting critical system files if the target directory is within the allowed scope.
**Learning:** Checking filesystem scope is not enough; the content/format being written must also be validated to ensure it aligns with the application's intended purpose (in this case, image processing).
**Prevention:** Explicitly validate and strictly whitelist output file extensions against safe formats (e.g., .jpg, .png, .webp) before writing files to disk.
