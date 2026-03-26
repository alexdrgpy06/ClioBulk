1. **Add explicit file extension whitelisting to `process_image_inner` in `src-tauri/src/commands.rs`.**
   - Check if the output path ends with `.jpg`, `.jpeg`, `.png`, or `.webp`.
   - If not, return an error indicating an invalid output format.
2. **Verify changes by running the system build and test.**
   - Run `pnpm build` and `cd src-tauri && cargo test`.
3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
4. **Submit PR with the title `🛡️ Sentinel: [CRITICAL] Fix arbitrary file write` and required description.**
