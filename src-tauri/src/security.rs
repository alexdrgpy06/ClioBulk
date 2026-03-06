// Author: Alejandro Ramírez
// Project: ClioBulk
// Logic: Backend security module for validating operations and preventing vulnerabilities.

use std::path::Path;

/// Validates that the provided file path has a safe extension for image processing output.
/// This prevents arbitrary file writes (e.g., writing to .exe, .sh, .bashrc).
pub fn is_safe_extension(path: &str) -> bool {
    let path = Path::new(path);
    if let Some(ext) = path.extension() {
        if let Some(ext_str) = ext.to_str() {
            let ext_lower = ext_str.to_lowercase();
            return matches!(
                ext_lower.as_str(),
                "jpg" | "jpeg" | "png" | "webp"
            );
        }
    }
    false
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_safe_extension() {
        // Safe extensions
        assert!(is_safe_extension("image.jpg"));
        assert!(is_safe_extension("image.jpeg"));
        assert!(is_safe_extension("image.png"));
        assert!(is_safe_extension("image.webp"));
        assert!(is_safe_extension("image.JPG"));
        assert!(is_safe_extension("image.PnG"));
        assert!(is_safe_extension("/path/to/some/image.jpeg"));
        assert!(is_safe_extension("C:\\path\\to\\image.webp"));

        // Unsafe extensions
        assert!(!is_safe_extension("image.exe"));
        assert!(!is_safe_extension("image.sh"));
        assert!(!is_safe_extension("script.bat"));
        assert!(!is_safe_extension("malware.dll"));
        assert!(!is_safe_extension("config.toml"));

        // No extension
        assert!(!is_safe_extension("image"));
        assert!(!is_safe_extension("/path/to/image_without_ext"));
    }
}
