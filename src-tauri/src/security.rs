use std::path::Path;

/// Validates if a given file path has a safe, expected image extension.
/// This prevents arbitrary file writes (e.g., saving an executable or script).
pub fn is_safe_extension(path: &str) -> bool {
    let p = Path::new(path);
    if let Some(ext) = p.extension() {
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
        assert!(is_safe_extension("IMAGE.JPG")); // Case insensitive
        assert!(is_safe_extension("/path/to/image.png"));

        assert!(!is_safe_extension("script.sh"));
        assert!(!is_safe_extension("executable.exe"));
        assert!(!is_safe_extension("document.pdf"));
        assert!(!is_safe_extension("no_extension"));
        assert!(!is_safe_extension(".hidden_file"));
    }
}
