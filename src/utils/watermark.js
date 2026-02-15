/**
 * @module WatermarkUtility
 * @description Provides high-performance canvas-based utilities for generating text and image watermarks.
 * @author Alejandro Ramírez
 */

/**
 * Creates a text-based watermark rendered on a dynamic canvas.
 * 
 * @param {string} text - The text to be rendered as a watermark.
 * @param {Object} [options={}] - Configuration options for the watermark.
 * @param {number} [options.fontSize=48] - Font size in pixels.
 * @param {string} [options.fontFamily='Arial'] - CSS font family string.
 * @param {string} [options.color='white'] - Fill color for the text.
 * @param {number} [options.opacity=0.5] - Alpha transparency (0.0 to 1.0).
 * @param {number} [options.padding=20] - Internal padding around the text.
 * @returns {HTMLCanvasElement} The canvas element containing the rendered watermark.
 */
export function createTextWatermark(text, options = {}) {
  // Extract options with senior-grade defaults
  const {
    fontSize = 48,
    fontFamily = 'Arial',
    color = 'white',
    opacity = 0.5,
    padding = 20
  } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Initial font setup to measure text dimensions accurately
  ctx.font = `${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  
  // Set canvas dimensions based on measured text plus padding
  canvas.width = metrics.width + padding * 2;
  canvas.height = fontSize + padding * 2;
  
  // Final render pass
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, padding, canvas.height / 2);
  
  return canvas;
}

/**
 * Loads an image from a URL to be used as a watermark, handling CORS and async loading.
 * 
 * @param {string} imageUrl - The source URL of the watermark image.
 * @returns {Promise<HTMLImageElement>} A promise that resolves to the loaded image element.
 * @throws {Error} If the image fails to load.
 */
export function createImageWatermark(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Enable anonymous CORS to prevent canvas tainting
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.error(`Failed to load watermark image: ${imageUrl}`, err);
      reject(err);
    };
    img.src = imageUrl;
  });
}
