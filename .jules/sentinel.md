## 2024-04-01 - Arbitrary File Write via Missing Extension Validation
**Vulnerability:** The application allowed writing arbitrary file types to the disk because `fs_scope().is_allowed()` only restricts the directory scope, not the file extensions.
**Learning:** Validating directory scopes in Tauri does not restrict what file extensions are being created, which could allow malicious files to be written.
**Prevention:** Always validate file extensions explicitly (e.g., `.jpg`, `.png`, `.webp`) against a whitelist when saving files.

## 2024-04-01 - Denial of Service via Unhandled Panics in Async Tasks
**Vulnerability:** The `process_bulk` command used `unwrap()` on `Semaphore::acquire` and `JoinHandle`, which could panic and crash the application if a task fails.
**Learning:** Unhandled panics in Tauri async commands can lead to Denial of Service (DoS) and application crashes.
**Prevention:** Handle errors gracefully using `match` or `if let`, log the errors, and emit failure events to the frontend instead of unwrapping.
