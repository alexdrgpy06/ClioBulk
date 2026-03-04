use std::path::Path;

/// Validates that a given file path has a safe extension for image processing output.
/// Allowed extensions: jpg, jpeg, png, webp
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
        assert!(is_safe_extension("folder/image.JPG")); // Case insensitive
        assert!(is_safe_extension("folder/image.PnG"));

        assert!(!is_safe_extension("image.txt"));
        assert!(!is_safe_extension("image.exe"));
        assert!(!is_safe_extension("image.sh"));
        assert!(!is_safe_extension("image")); // No extension
        assert!(!is_safe_extension("image.")); // Empty extension
        assert!(!is_safe_extension(".hidden")); // Hidden file, no extension
    }
}
