/**
 * @module SecurityUtils
 * @description Provides security-critical utility functions for the application.
 * @author Sentinel
 */

/**
 * Sanitizes a filename to remove potentially dangerous characters and prevent path traversal.
 *
 * This function:
 * 1. Removes directory traversal sequences (../, ..\)
 * 2. Replaces unsafe characters (e.g., <, >, :, ", /, \, |, ?, *) with underscores.
 * 3. Removes control characters (0x00-0x1F).
 * 4. Trims leading/trailing periods and spaces (Windows restriction).
 *
 * @param {string} filename - The filename to sanitize.
 * @returns {string} The sanitized filename, or 'untitled' if the result is empty.
 */
export function sanitizeFilename(filename) {
  if (!filename) return 'untitled';

  // 1. Get the basename (in case a path was passed) to prevent traversal via path components
  //    This regex handles both / and \ separators.
  const name = filename.replace(/^.*[\\\/]/, '');

  // 2. Replace unsafe characters with underscore
  // Windows reserved chars: < > : " / \ | ? *
  // Control characters: \x00-\x1F
  let sanitized = name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');

  // 3. Remove leading/trailing periods and spaces (Windows restriction)
  sanitized = sanitized.replace(/^[.\s]+|[.\s]+$/g, '');

  // 4. Ensure it's not empty
  if (sanitized.length === 0) {
    return 'untitled';
  }

  return sanitized;
}
