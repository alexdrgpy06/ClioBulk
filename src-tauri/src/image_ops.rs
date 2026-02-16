/**
 * Author: Alejandro Ramírez
 * 
 * ClioBulk Native Image Processing Engine
 * 
 * This module contains the high-performance core for RAW decoding 
 * and image filtering. It utilizes 'rayon' for multi-threaded 
 * pixel manipulations and 'rawloader' for camera-agnostic RAW support.
 */
use image::{DynamicImage, ImageBuffer, Rgb};
use crate::commands::ProcessOptions;
use rayon::prelude::*;

/// Decodes a RAW file into a DynamicImage.
/// Uses Bilinear Demosaicing to provide high-quality full-resolution images.
/// 
/// This function handles both Integer and Float raw data types provided by `rawloader`.
/// It normalizes pixel values based on the camera's white level to ensure correct exposure.
pub fn decode_raw_to_image(path: &str) -> Result<DynamicImage, String> {
    let raw = rawloader::decode_file(path).map_err(|e| e.to_string())?;
    let width = raw.width;
    let height = raw.height;
    
    // Normalize pixel values based on white level (handling different bit depths)
    let white_level = raw.whitelevels[0] as f32; // Use the first channel's white level

    match raw.data {
        rawloader::RawImageData::Integer(ref data) => {
            // Bilinear Demosaicing (RGGB assumption)
            // Parallelized over rows for performance
            let img_buffer: Vec<u8> = (0..height).into_par_iter().flat_map(|y| {
                let mut row_pixels = Vec::with_capacity(width * 3);
                for x in 0..width {
                    // Safe access with clamping
                    let get = |dx: i32, dy: i32| -> u32 {
                         let nx = (x as i32 + dx).clamp(0, width as i32 - 1) as usize;
                         let ny = (y as i32 + dy).clamp(0, height as i32 - 1) as usize;
                         data[ny * width + nx] as u32
                    };

                    let is_red = (y % 2 == 0) && (x % 2 == 0);
                    let is_green_r = (y % 2 == 0) && (x % 2 == 1);
                    let is_green_b = (y % 2 == 1) && (x % 2 == 0);
                    
                    let (r, g, b) = if is_red {
                        let r = get(0, 0);
                        let g = (get(0, -1) + get(0, 1) + get(-1, 0) + get(1, 0)) / 4;
                        let b = (get(-1, -1) + get(1, -1) + get(-1, 1) + get(1, 1)) / 4;
                        (r, g, b)
                    } else if is_green_r {
                        let r = (get(-1, 0) + get(1, 0)) / 2;
                        let g = get(0, 0);
                        let b = (get(0, -1) + get(0, 1)) / 2;
                        (r, g, b)
                    } else if is_green_b {
                        let r = (get(0, -1) + get(0, 1)) / 2;
                        let g = get(0, 0);
                        let b = (get(-1, 0) + get(1, 0)) / 2;
                        (r, g, b)
                    } else { // Blue pixel
                        let r = (get(-1, -1) + get(1, -1) + get(-1, 1) + get(1, 1)) / 4;
                        let g = (get(0, -1) + get(0, 1) + get(-1, 0) + get(1, 0)) / 4;
                        let b = get(0, 0);
                        (r, g, b)
                    };

                    // Scale to 8-bit using white level
                    let r8 = ((r as f32 / white_level) * 255.0).clamp(0.0, 255.0) as u8;
                    let g8 = ((g as f32 / white_level) * 255.0).clamp(0.0, 255.0) as u8;
                    let b8 = ((b as f32 / white_level) * 255.0).clamp(0.0, 255.0) as u8;

                    row_pixels.push(r8);
                    row_pixels.push(g8);
                    row_pixels.push(b8);
                }
                row_pixels
            }).collect();
            
            let img = ImageBuffer::<Rgb<u8>, _>::from_raw(width as u32, height as u32, img_buffer)
                .ok_or("Failed to create image buffer")?;
            Ok(DynamicImage::ImageRgb8(img))
        },
        rawloader::RawImageData::Float(ref data) => {
            // Bilinear Demosaicing for Float
            let img_buffer: Vec<u8> = (0..height).into_par_iter().flat_map(|y| {
                let mut row_pixels = Vec::with_capacity(width * 3);
                for x in 0..width {
                    let get = |dx: i32, dy: i32| -> f32 {
                         let nx = (x as i32 + dx).clamp(0, width as i32 - 1) as usize;
                         let ny = (y as i32 + dy).clamp(0, height as i32 - 1) as usize;
                         data[ny * width + nx]
                    };

                    let is_red = (y % 2 == 0) && (x % 2 == 0);
                    let is_green_r = (y % 2 == 0) && (x % 2 == 1);
                    let is_green_b = (y % 2 == 1) && (x % 2 == 0);
                    
                    let (r, g, b) = if is_red {
                        let r = get(0, 0);
                        let g = (get(0, -1) + get(0, 1) + get(-1, 0) + get(1, 0)) / 4.0;
                        let b = (get(-1, -1) + get(1, -1) + get(-1, 1) + get(1, 1)) / 4.0;
                        (r, g, b)
                    } else if is_green_r {
                        let r = (get(-1, 0) + get(1, 0)) / 2.0;
                        let g = get(0, 0);
                        let b = (get(0, -1) + get(0, 1)) / 2.0;
                        (r, g, b)
                    } else if is_green_b {
                        let r = (get(0, -1) + get(0, 1)) / 2.0;
                        let g = get(0, 0);
                        let b = (get(-1, 0) + get(1, 0)) / 2.0;
                        (r, g, b)
                    } else {
                        let r = (get(-1, -1) + get(1, -1) + get(-1, 1) + get(1, 1)) / 4.0;
                        let g = (get(0, -1) + get(0, 1) + get(-1, 0) + get(1, 0)) / 4.0;
                        let b = get(0, 0);
                        (r, g, b)
                    };

                    row_pixels.push((r.clamp(0.0, 1.0) * 255.0) as u8);
                    row_pixels.push((g.clamp(0.0, 1.0) * 255.0) as u8);
                    row_pixels.push((b.clamp(0.0, 1.0) * 255.0) as u8);
                }
                row_pixels
            }).collect();
             let img = ImageBuffer::<Rgb<u8>, _>::from_raw(width as u32, height as u32, img_buffer)
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

    // 2. Combined Adjustments (Brightness, Contrast, Saturation)
    // Fused loop for performance: iterates pixels once and avoids intermediate buffers.
    if options.brightness != 0.0 || options.contrast != 1.0 || options.saturation != 1.0 {
        // Optimization: Use `into_rgb8()` instead of `to_rgb8()` to avoid cloning the image buffer.
        // This consumes the DynamicImage and reuses the buffer if it's already Rgb8.
        let mut rgb_img = img.into_rgb8();
        let raw_pixels = rgb_img.as_mut();

        let brightness_offset = options.brightness * 100.0;
        let contrast = options.contrast;
        let saturation = options.saturation;

        // Use Rayon to process pixel chunks in parallel
        raw_pixels.par_chunks_mut(3).for_each(|pixel| {
            if pixel.len() != 3 { return; }

            let mut r = pixel[0] as f32;
            let mut g = pixel[1] as f32;
            let mut b = pixel[2] as f32;

            // Brightness
            if brightness_offset != 0.0 {
                r += brightness_offset;
                g += brightness_offset;
                b += brightness_offset;
            }

            // Contrast
            if contrast != 1.0 {
                r = (r - 128.0) * contrast + 128.0;
                g = (g - 128.0) * contrast + 128.0;
                b = (b - 128.0) * contrast + 128.0;
            }

            // Saturation
            if saturation != 1.0 {
                let l = 0.299 * r + 0.587 * g + 0.114 * b;
                r = l + (r - l) * saturation;
                g = l + (g - l) * saturation;
                b = l + (b - l) * saturation;
            }

            pixel[0] = r.clamp(0.0, 255.0) as u8;
            pixel[1] = g.clamp(0.0, 255.0) as u8;
            pixel[2] = b.clamp(0.0, 255.0) as u8;
        });

        img = DynamicImage::ImageRgb8(rgb_img);
    }

    // 4. Adaptive Threshold
    if options.adaptive_threshold {
        // Optimization: Use `into_luma8()` to avoid cloning/allocation if possible.
        let luma = img.into_luma8();
        let thresholded = imageproc::contrast::adaptive_threshold(&luma, 10);
        img = DynamicImage::ImageLuma8(thresholded);
    }
    img
}
