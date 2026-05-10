## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.
## 2024-05-10 - Fix Log Injection Vulnerability
**Vulnerability:** The logger utility did not sanitize newline characters (`\n`, `\r`) from log messages or levels, allowing malicious inputs to forge log entries.
**Learning:** Even simple logging utilities in local environments (like Tauri) are vulnerable to log forging if they append user-controlled data directly to a file.
**Prevention:** Always sanitize inputs to logging functions by stripping or replacing newline characters (e.g., using `String(input).replace(/[\r\n]+/g, ' ')`) before formatting and writing to logs.
