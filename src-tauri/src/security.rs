pub fn is_safe_extension(path: &str) -> bool {
    let path_lc = path.to_lowercase();
    path_lc.ends_with(".jpg") ||
    path_lc.ends_with(".jpeg") ||
    path_lc.ends_with(".png") ||
    path_lc.ends_with(".webp")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_safe_extension() {
        assert!(is_safe_extension("image.jpg"));
        assert!(is_safe_extension("image.JPEG"));
        assert!(is_safe_extension("path/to/image.png"));
        assert!(is_safe_extension("image.webp"));

        assert!(!is_safe_extension("image.exe"));
        assert!(!is_safe_extension("script.sh"));
        assert!(!is_safe_extension("document.pdf"));
        assert!(!is_safe_extension("image.jpg.exe"));
    }
}
