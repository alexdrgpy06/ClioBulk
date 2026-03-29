
## 2024-05-24 - Prevent DoS via Unhandled Panics in Async Tasks
**Vulnerability:** Use of `unwrap()` on `Semaphore::acquire` and `tokio::task::spawn_blocking` in `process_bulk` could cause thread panics, leading to Denial of Service.
**Learning:** Unhandled panics in concurrent tasks can crash the native backend or cause hanging operations.
**Prevention:** Gracefully handle errors in async Tauri commands using `match` or `?` and emit failure events instead of panicking.
