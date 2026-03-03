use std::path::Path;

/// Validates that an output file path has a safe, permitted image extension.
/// This prevents arbitrary file writes (e.g., overwriting .sh, .exe, or config files).
pub fn is_safe_extension(path: &str) -> bool {
    let path = Path::new(path);
    if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
        let ext = ext.to_lowercase();
        matches!(ext.as_str(), "jpg" | "jpeg" | "png" | "webp")
    } else {
        false
    }
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
        assert!(is_safe_extension("IMAGE.JPG"));
        assert!(!is_safe_extension("image.txt"));
        assert!(!is_safe_extension("image.sh"));
        assert!(!is_safe_extension("image.exe"));
        assert!(!is_safe_extension("image"));
        assert!(!is_safe_extension(".bashrc"));
    }
}
