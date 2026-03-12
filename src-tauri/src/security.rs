pub fn is_safe_extension(path: &str) -> bool {
    let lower_path = path.to_lowercase();
    lower_path.ends_with(".jpg") ||
    lower_path.ends_with(".jpeg") ||
    lower_path.ends_with(".png") ||
    lower_path.ends_with(".webp")
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
        assert!(is_safe_extension("path/to/IMAGE.PNG"));

        assert!(!is_safe_extension("image.txt"));
        assert!(!is_safe_extension("image.sh"));
        assert!(!is_safe_extension("image.exe"));
        assert!(!is_safe_extension("image"));
        assert!(!is_safe_extension(""));
    }
}
