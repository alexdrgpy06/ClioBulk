use std::path::Path;

pub fn is_safe_extension(path: &str) -> bool {
    Path::new(path)
        .extension()
        .and_then(|ext| ext.to_str())
        .map(|ext| {
            let ext_lc = ext.to_lowercase();
            matches!(ext_lc.as_str(), "jpg" | "jpeg" | "png" | "webp")
        })
        .unwrap_or(false)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_safe_extension() {
        assert!(is_safe_extension("test.jpg"));
        assert!(is_safe_extension("test.PNG"));
        assert!(is_safe_extension("test.webp"));
        assert!(!is_safe_extension("test.txt"));
        assert!(!is_safe_extension("test.exe"));
        assert!(!is_safe_extension("test"));
    }
}
