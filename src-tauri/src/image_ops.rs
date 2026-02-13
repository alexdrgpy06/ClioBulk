use image::{DynamicImage, ImageBuffer, Rgb};
use crate::commands::ProcessOptions;
use rayon::prelude::*;

/// Decodes a RAW file into a DynamicImage.
/// Uses a custom half-size demosaicing algorithm to provide color previews.
pub fn decode_raw_to_image(path: &str) -> Result<DynamicImage, String> {
    let raw = rawloader::decode_file(path).map_err(|e| e.to_string())?;
    let width = raw.width;
    let height = raw.height;
    
    match raw.data {
        rawloader::RawImageData::Integer(ref data) => {
            // Professional Improvement: Basic Demosaicing (Half-size)
            // This provides color instead of grayscale.
            let out_w = width / 2;
            let out_h = height / 2;
            let mut vec = Vec::with_capacity(out_w * out_h * 3);
            
            for y in 0..out_h {
                for x in 0..out_w {
                    let idx = (y * 2) * width + (x * 2);
                    let r = data[idx];
                    let g1 = data[idx + 1];
                    let g2 = data[idx + width];
                    let b = data[idx + width + 1];
                    
                    // Simple average for Green, and shift 16-bit to 8-bit
                    vec.push((r >> 8) as u8);
                    vec.push((((g1 as u32 + g2 as u32) / 2) >> 8) as u8);
                    vec.push((b >> 8) as u8);
                }
            }
            
            let img = ImageBuffer::<Rgb<u8>, _>::from_raw(out_w as u32, out_h as u32, vec)
                .ok_or("Failed to create image buffer")?;
            Ok(DynamicImage::ImageRgb8(img))
        },
        rawloader::RawImageData::Float(ref data) => {
            let out_w = width / 2;
            let out_h = height / 2;
            let mut vec = Vec::with_capacity(out_w * out_h * 3);
            
            for y in 0..out_h {
                for x in 0..out_w {
                    let idx = (y * 2) * width + (x * 2);
                    let r = data[idx];
                    let g1 = data[idx + 1];
                    let g2 = data[idx + width];
                    let b = data[idx + width + 1];
                    
                    vec.push((r.clamp(0.0, 1.0) * 255.0) as u8);
                    vec.push((((g1 + g2) / 2.0).clamp(0.0, 1.0) * 255.0) as u8);
                    vec.push((b.clamp(0.0, 1.0) * 255.0) as u8);
                }
            }
            let img = ImageBuffer::<Rgb<u8>, _>::from_raw(out_w as u32, out_h as u32, vec)
                .ok_or("Failed to create image buffer")?;
            Ok(DynamicImage::ImageRgb8(img))
        }
    }
}

/// Applies the selected filters to the image based on user options.
/// Saturation adjustment is parallelized using Rayon for high performance.
pub fn apply_filters(mut img: DynamicImage, options: &ProcessOptions) -> DynamicImage {
    // 1. Denoise (First to avoid amplifying noise)
    if options.denoise {
        img = match img {
            DynamicImage::ImageRgb8(rgb) => {
                DynamicImage::ImageRgb8(imageproc::filter::median_filter(&rgb, 1, 1))
            },
            DynamicImage::ImageLuma8(luma) => {
                DynamicImage::ImageLuma8(imageproc::filter::median_filter(&luma, 1, 1))
            },
            _ => {
                let rgb = img.to_rgb8();
                DynamicImage::ImageRgb8(imageproc::filter::median_filter(&rgb, 1, 1))
            }
        };
    }

    // 2. Brightness and Contrast
    if options.brightness != 0.0 {
        img = img.brighten((options.brightness * 100.0) as i32);
    }
    if options.contrast != 1.0 {
        img = img.adjust_contrast(options.contrast);
    }
    
    // 3. Saturation (Parallelized implementation)
    if options.saturation != 1.0 {
        if let DynamicImage::ImageRgb8(mut rgb) = img {
            rgb.pixels_mut().par_bridge().for_each(|pixel| {
                let r = pixel[0] as f32;
                let g = pixel[1] as f32;
                let b = pixel[2] as f32;
                
                let l = 0.299 * r + 0.587 * g + 0.114 * b;
                
                pixel[0] = (l + (r - l) * options.saturation).clamp(0.0, 255.0) as u8;
                pixel[1] = (l + (g - l) * options.saturation).clamp(0.0, 255.0) as u8;
                pixel[2] = (l + (b - l) * options.saturation).clamp(0.0, 255.0) as u8;
            });
            img = DynamicImage::ImageRgb8(rgb);
        }
    }

    // 4. Adaptive Threshold
    if options.adaptive_threshold {
        let luma = img.to_luma8();
        let thresholded = imageproc::contrast::adaptive_threshold(&luma, 10);
        img = DynamicImage::ImageLuma8(thresholded);
    }
    img
}
