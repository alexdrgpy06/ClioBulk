use std::path::Path;

/// Validates that the output file path has a safe extension.
/// Only allows: jpg, jpeg, png, webp (case-insensitive).
pub fn is_safe_extension(path: &str) -> bool {
    let path = Path::new(path);
    if let Some(ext) = path.extension() {
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
    fn test_safe_extensions() {
        assert!(is_safe_extension("image.jpg"));
        assert!(is_safe_extension("image.jpeg"));
        assert!(is_safe_extension("image.png"));
        assert!(is_safe_extension("image.webp"));
        assert!(is_safe_extension("IMAGE.JPG"));
        assert!(is_safe_extension("path/to/image.png"));
    }

    #[test]
    fn test_unsafe_extensions() {
        assert!(!is_safe_extension("image.txt"));
        assert!(!is_safe_extension("image.sh"));
        assert!(!is_safe_extension("image.exe"));
        assert!(!is_safe_extension("image"));
        assert!(!is_safe_extension("image.jpg.exe"));
        assert!(!is_safe_extension("image.tar.gz"));
    }
}
