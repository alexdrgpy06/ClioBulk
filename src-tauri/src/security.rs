use std::path::Path;

/// Validates that the file extension is safe for output writing.
///
/// This prevents arbitrary file writes (e.g. overwriting scripts, configs, etc.).
pub fn is_safe_extension(path: &str) -> bool {
    let p = Path::new(path);
    if let Some(ext) = p.extension() {
        if let Some(ext_str) = ext.to_str() {
            let lower = ext_str.to_lowercase();
            return lower == "jpg" || lower == "jpeg" || lower == "png" || lower == "webp";
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
        assert!(is_safe_extension("path/to/image.JPG"));
        assert!(is_safe_extension("C:\\path\\to\\image.pNg"));

        assert!(!is_safe_extension("script.sh"));
        assert!(!is_safe_extension("config.json"));
        assert!(!is_safe_extension("image.txt"));
        assert!(!is_safe_extension("image"));
        assert!(!is_safe_extension(".hidden"));
    }
}
