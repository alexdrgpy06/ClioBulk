use std::path::Path;

/// Validates that the output file extension is a safe image format
/// to prevent arbitrary file write vulnerabilities.
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
        assert!(is_safe_extension("test.jpg"));
        assert!(is_safe_extension("test.jpeg"));
        assert!(is_safe_extension("test.png"));
        assert!(is_safe_extension("test.webp"));
        assert!(is_safe_extension("test.JPG"));
        assert!(is_safe_extension("test.PNG"));

        assert!(!is_safe_extension("test.sh"));
        assert!(!is_safe_extension("test.exe"));
        assert!(!is_safe_extension("test.txt"));
        assert!(!is_safe_extension("test"));
        assert!(!is_safe_extension(".bashrc"));
    }
}
