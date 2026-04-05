## 2024-05-22 - Filesystem Scope Bypass in Rust Commands
**Vulnerability:** Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`.
**Learning:** Tauri's security model (scopes) only applies automatically to its JS API. Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`.
**Prevention:** Always inject `AppHandle` into filesystem-related commands and validate paths against the scope before operation.

## 2024-05-23 - DoS via Unhandled Panics in Async Tasks
**Vulnerability:** The `process_bulk` command used `.unwrap()` on `Semaphore::acquire()` and the `JoinHandle` from `tokio::task::spawn_blocking()`. If either failed or panicked, it would cause an unhandled panic in the backend, leading to a Denial of Service (app crash).
**Learning:** Backend panics in Tauri crash the entire application. Unwrapping async task handles or synchronization primitives must be avoided in production code, especially when handling user-provided data.
**Prevention:** Always use `match` or `if let` to gracefully handle `Result` objects from async operations and spawn blocks, logging the error and emitting failure events to the frontend.
