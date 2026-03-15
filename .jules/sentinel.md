## 2024-05-24 - Output File Extension Validation in Image Processing
**Vulnerability:** The `process_image_inner` function lacked explicit output file extension validation, potentially allowing arbitrary file writes if an attacker could control the output path.
**Learning:** Even if the input file is validated and processed correctly, the output path needs to be strictly validated to ensure only expected file types (e.g., .jpg, .png, .webp) are generated, mitigating the risk of writing malicious files (e.g., shell scripts, executables) to unexpected locations.
**Prevention:** Always implement strict whitelisting for output file extensions in any file processing or saving logic.
