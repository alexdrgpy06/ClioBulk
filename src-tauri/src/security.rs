use std::path::Path;

/// Validates output file extensions to prevent arbitrary file writes.
/// Only allows standard image formats to be saved.
pub fn is_safe_extension(path: &str) -> bool {
    if let Some(ext) = Path::new(path).extension() {
        if let Some(ext_str) = ext.to_str() {
            let ext_lower = ext_str.to_lowercase();
            return match ext_lower.as_str() {
                "jpg" | "jpeg" | "png" | "webp" => true,
                _ => false,
            };
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
        assert!(is_safe_extension("/path/to/image.JPG"));
        assert!(is_safe_extension("C:\\path\\to\\image.pNg"));

        assert!(!is_safe_extension("image.exe"));
        assert!(!is_safe_extension("image.sh"));
        assert!(!is_safe_extension("image.txt"));
        assert!(!is_safe_extension("image"));
        assert!(!is_safe_extension(".hidden_file"));
    }
}
