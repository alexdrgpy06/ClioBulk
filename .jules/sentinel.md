## 2024-05-24 - File write whitelisting missing
**Vulnerability:** Arbitrary file writes are possible due to the lack of explicit file extension whitelisting on outputs.
**Learning:** In Tauri, `fs_scope` validation (`is_allowed`) alone is insufficient as it does not restrict the file type being written.
**Prevention:** Explicitly validate that output files end with allowed extensions (e.g., .jpg, .png) before saving.
