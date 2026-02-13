#[cfg(test)]
mod tests {
    use image::{DynamicImage, ImageBuffer, Rgb};
    use app_lib::commands::ProcessOptions;
    use app_lib::image_ops;

    #[test]
    fn test_apply_filters_basic() {
        // Create a 10x10 RGB image with gray color (100, 100, 100)
        let mut img = ImageBuffer::<Rgb<u8>, _>::new(10, 10);
        for pixel in img.pixels_mut() {
            *pixel = Rgb([100, 100, 100]);
        }
        let dynamic_img = DynamicImage::ImageRgb8(img);

        // Options: Increase brightness
        let options = ProcessOptions {
            brightness: 0.1, // +10 intensity
            contrast: 1.0,
            saturation: 1.0,
            adaptive_threshold: false,
            denoise: false,
        };

        let processed = image_ops::apply_filters(dynamic_img, &options);
        let rgb_img = processed.to_rgb8();
        let pixel = rgb_img.get_pixel(0, 0);

        // 100 + (0.1 * 100.0) = 110
        assert_eq!(pixel[0], 110, "Red channel should increase by 10");
        assert_eq!(pixel[1], 110, "Green channel should increase by 10");
        assert_eq!(pixel[2], 110, "Blue channel should increase by 10");
    }

    #[test]
    fn test_apply_filters_saturation() {
        // Create a pure red image (255, 0, 0)
        let mut img = ImageBuffer::<Rgb<u8>, _>::new(10, 10);
        for pixel in img.pixels_mut() {
            *pixel = Rgb([200, 50, 50]);
        }
        let dynamic_img = DynamicImage::ImageRgb8(img);

        // Options: Desaturate completely (B&W)
        let options = ProcessOptions {
            brightness: 0.0,
            contrast: 1.0,
            saturation: 0.0,
            adaptive_threshold: false,
            denoise: false,
        };

        let processed = image_ops::apply_filters(dynamic_img, &options);
        let rgb_img = processed.to_rgb8();
        let pixel = rgb_img.get_pixel(0, 0);

        // Luminance L = 0.299*200 + 0.587*50 + 0.114*50 = 59.8 + 29.35 + 5.7 = 94.85 -> 94
        // With sat=0, R=G=B=L
        assert!((pixel[0] as i32 - 94).abs() <= 1, "Red should be close to luminance");
        assert_eq!(pixel[0], pixel[1], "R and G should be equal for B&W");
        assert_eq!(pixel[1], pixel[2], "G and B should be equal for B&W");
    }
}
