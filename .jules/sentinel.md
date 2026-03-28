## 2024-05-24 - DoS via Unhandled Panics in Async Tasks
**Vulnerability:** The application used `.unwrap()` on `Semaphore::acquire().await` and `tokio::task::spawn_blocking().await` within the `process_bulk` Tauri command. If the semaphore acquisition failed or the blocking task panicked, it would cause the entire application to crash (Denial of Service).
**Learning:** In Tauri async commands, unhandled panics or `unwrap()` calls on shared resources like channels or tasks can bring down the entire backend, leaving the frontend unresponsive.
**Prevention:** Always handle `Result` types gracefully, especially in asynchronous code serving concurrent requests. Log errors and communicate failures back to the frontend via IPC events instead of crashing.
