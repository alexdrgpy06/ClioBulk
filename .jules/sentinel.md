
## 2024-05-24 - Arbitrary File Writes via Backend Image Processing Commands
**Vulnerability:** The Rust backend image processing command (`process_image_inner`) relied solely on Tauri's filesystem scope (`is_allowed()`) for write validation. This allowed an attacker (or compromised frontend) to instruct the backend to write non-image files (e.g., shell scripts, configuration files) into permitted directories.
**Learning:** `fs_scope` validation only checks *where* a file is written, not *what* type of file is being written. Relying on it alone is insufficient for operations that generate files, as it creates an arbitrary file write primitive within the allowed scope.
**Prevention:** Always implement explicit file extension whitelisting (e.g., verifying `.jpg`, `.png`) in backend commands before validating the filesystem scope or attempting to write the file, ensuring only the intended file types can be created.
