## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-22 - Arbitrary File Write via Image Save
**Vulnerability:** The `process_image` and `process_bulk` Tauri commands take an `out_path` string and pass it directly to `image.save(&out_path)`. While there is an `is_allowed` check for `out_path` against Tauri scopes, if the user or frontend provides an `out_path` with an executable extension like `.sh`, `.exe` or `.js`, the image crate will fail (if format cannot be inferred) or it might still write some content if we don't strictly enforce image extensions. More critically, we must ensure we ONLY write image files to prevent arbitrary file write vulnerabilities, even within allowed scopes.
**Learning:** `is_allowed()` checks paths, but doesn't check file types. The frontend determines the output path (e.g., `processed_X.jpg`), but a compromised frontend could ask the backend to write a `.sh` file. We should validate that the extension is a safe image extension on the backend.
**Prevention:** Always whitelist explicit file extensions (e.g., `.jpg`, `.jpeg`, `.png`, `.webp`) before allowing file writes on the backend.
