## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-06-25 - Denial of Service via Main Thread Blocking
**Vulnerability:** Synchronous Tauri commands (`pub fn`) processing large files (like RAW images) block the main UI thread, causing the application to freeze and become unresponsive.
**Learning:** Tauri commands run on the main thread by default unless marked `async` or `#[tauri::command(async)]`. Heavy CPU/IO tasks must be offloaded to prevent DoS.
**Prevention:** Always mark heavy commands as `async` to leverage Tauri's thread pool, or use `tauri::async_runtime::spawn_blocking` explicitly.

## 2024-06-25 - Cross-Platform Path Traversal via String Concatenation
**Vulnerability:** Constructing file paths using string concatenation and hardcoded separators (e.g. `\\`) creates invalid paths on non-Windows systems and can lead to unintended file locations (e.g. writing to parent directory if separator is ignored).
**Learning:** Hardcoded backslashes are valid filename characters on POSIX systems, leading to files named `dir\file` instead of `dir/file`.
**Prevention:** Always use `@tauri-apps/api/path`'s `join` function for path construction to ensure cross-platform compatibility and security.
