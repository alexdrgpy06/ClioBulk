use serde::{Deserialize, Serialize};
use base64::{Engine as _, engine::general_purpose};
use tauri::{AppHandle, Emitter, Runtime};
use log::{info, error};
use std::sync::Arc;
use tokio::sync::Semaphore;
use crate::image_ops;

#[derive(Deserialize, Clone)]
pub struct ProcessOptions {
    pub brightness: f32,
    pub contrast: f32,
    pub saturation: f32,
    pub adaptive_threshold: bool,
    pub denoise: bool,
}

#[derive(Serialize, Clone)]
pub struct ProcessResult {
    pub success: bool,
    pub path: String,
    pub error: Option<String>,
}

#[derive(Serialize, Clone)]
pub struct ProgressPayload {
    pub path: String,
    pub success: bool,
    pub error: Option<String>,
    pub progress: f32,
    pub stage: String,
}

/// Decodes a RAW file for a preview display in the UI.
/// Returns a base64-encoded thumbnail string.
#[tauri::command]
pub fn decode_raw(path: String) -> Result<String, String> {
    info!("Decoding RAW file for preview: {}", path);
    
    if !std::path::Path::new(&path).exists() {
        error!("RAW file not found: {}", path);
        return Err(format!("File not found: {}", path));
    }

    let img = image_ops::decode_raw_to_image(&path)?;
    let thumb = img.thumbnail(1200, 1200);
    
    let mut buffer = std::io::Cursor::new(Vec::new());
    thumb.write_to(&mut buffer, image::ImageFormat::Jpeg).map_err(|e| e.to_string())?;
    
    let base64_str = general_purpose::STANDARD.encode(buffer.into_inner());
    Ok(format!("data:image/jpeg;base64,{}", base64_str))
}

fn validate_output_path(path: &str) -> Result<(), String> {
    let allowed_extensions = ["jpg", "jpeg", "png", "webp"];
    let path = std::path::Path::new(path);

    if let Some(ext) = path.extension() {
        if let Some(ext_str) = ext.to_str() {
            if allowed_extensions.contains(&ext_str.to_lowercase().as_str()) {
                return Ok(());
            }
        }
    }

    Err(format!("Invalid output file extension. Allowed: {:?}", allowed_extensions))
}

/// Internal processing logic used by both single and bulk operations.
fn process_image_inner<R: Runtime>(
    app: &AppHandle<R>,
    path: String,
    out_path: String,
    options: ProcessOptions,
    progress: f32,
) -> ProcessResult {
    let emit = |stage: &str, success: bool, error: Option<String>| {
        let _ = app.emit("process-progress", ProgressPayload {
            path: path.clone(),
            success,
            error,
            progress,
            stage: stage.to_string(),
        });
    };

    // Security Check: Validate output path extension
    if let Err(e) = validate_output_path(&out_path) {
        error!("Security violation for {}: {}", out_path, e);
        emit("failed", false, Some(e.clone()));
        return ProcessResult {
            success: false,
            path: out_path,
            error: Some(e),
        };
    }

    emit("decoding", true, None);
    let path_lc = path.to_lowercase();
    let img_res = if path_lc.ends_with(".arw") || 
                   path_lc.ends_with(".cr2") || 
                   path_lc.ends_with(".nef") || 
                   path_lc.ends_with(".dng") {
        image_ops::decode_raw_to_image(&path)
    } else {
        image::open(&path).map_err(|e| e.to_string())
    };

    match img_res {
        Ok(img) => {
            emit("filtering", true, None);
            let img = image_ops::apply_filters(img, &options);
            
            emit("saving", true, None);
            match img.save(&out_path) {
                Ok(_) => {
                    info!("Successfully saved: {}", out_path);
                    let res = ProcessResult {
                        success: true,
                        path: out_path,
                        error: None,
                    };
                    emit("completed", true, None);
                    res
                },
                Err(e) => {
                    error!("Failed to save {}: {}", out_path, e);
                    let res = ProcessResult {
                        success: false,
                        path: out_path,
                        error: Some(e.to_string()),
                    };
                    emit("failed", false, Some(e.to_string()));
                    res
                },
            }
        }
        Err(e) => {
            error!("Failed to open {}: {}", path, e);
            let res = ProcessResult {
                success: false,
                path: out_path,
                error: Some(e.clone()),
            };
            emit("failed", false, Some(e));
            res
        }
    }
}

/// Core bulk processing logic with CPU-optimized concurrency.
#[tauri::command]
pub async fn process_bulk(app: AppHandle, files: Vec<(String, String)>, options: ProcessOptions) -> Result<(), String> {
    let total = files.len() as f32;
    // Optimize concurrency: use 75% of logical cores for maximum throughput
    let concurrency = std::thread::available_parallelism().map(|n| n.get()).unwrap_or(4);
    let concurrency = (concurrency * 3 / 4).max(1); 
    
    info!("Starting bulk process with concurrency: {}", concurrency);
    
    let semaphore = Arc::new(Semaphore::new(concurrency));
    let mut handles = Vec::new();

    for (i, (in_p, out_p)) in files.into_iter().enumerate() {
        let app_h = app.clone();
        let options_h = options.clone();
        let sem_h = semaphore.clone();
        let progress = ((i + 1) as f32 / total) * 100.0;
        
        let handle = tokio::spawn(async move {
            let _permit = sem_h.acquire().await.unwrap();
            tokio::task::spawn_blocking(move || {
                process_image_inner(&app_h, in_p, out_p, options_h, progress)
            }).await.unwrap()
        });
        handles.push(handle);
    }
    
    for handle in handles {
        let _ = handle.await;
    }
    
    info!("Bulk process completed successfully.");
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_validate_output_path() {
        // Valid paths
        assert!(validate_output_path("image.jpg").is_ok());
        assert!(validate_output_path("image.jpeg").is_ok());
        assert!(validate_output_path("image.png").is_ok());
        assert!(validate_output_path("image.webp").is_ok());
        assert!(validate_output_path("/home/user/image.jpg").is_ok());
        assert!(validate_output_path("C:\\Users\\User\\image.jpg").is_ok());
        assert!(validate_output_path("IMAGE.JPG").is_ok()); // Case insensitive

        // Invalid paths
        assert!(validate_output_path("image.exe").is_err());
        assert!(validate_output_path("image.sh").is_err());
        assert!(validate_output_path("image").is_err()); // No extension
        assert!(validate_output_path("image.txt").is_err());
        assert!(validate_output_path("image.jpg.exe").is_err());
        assert!(validate_output_path("/etc/passwd").is_err());
    }
}
