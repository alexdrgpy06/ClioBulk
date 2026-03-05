use std::path::Path;

/// Validates that the provided path has a safe, expected image file extension.
/// This prevents arbitrary file write vulnerabilities where an attacker might
/// try to write to executable files (.sh, .exe) or configuration files.
pub fn is_safe_extension(path: &str) -> bool {
    let path = Path::new(path);
    if let Some(ext) = path.extension() {
        if let Some(ext_str) = ext.to_str() {
            let ext_lower = ext_str.to_lowercase();
            return matches!(ext_lower.as_str(), "jpg" | "jpeg" | "png" | "webp");
        }
    }
    false
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_safe_extension() {
        assert!(is_safe_extension("image.jpg"));
        assert!(is_safe_extension("image.jpeg"));
        assert!(is_safe_extension("image.png"));
        assert!(is_safe_extension("image.webp"));
        assert!(is_safe_extension("path/to/image.PNG"));

        // Invalid extensions
        assert!(!is_safe_extension("script.sh"));
        assert!(!is_safe_extension("app.exe"));
        assert!(!is_safe_extension("config.json"));
        assert!(!is_safe_extension("image.txt"));
        assert!(!is_safe_extension("image"));
        assert!(!is_safe_extension(""));
    }
}
