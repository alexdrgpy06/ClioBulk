/**
 * @module Logger
 * @description Advanced logging utility that handles both console output and persistent file logging for Tauri environments.
 * @author Alejandro Ramírez
 */

import { writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

/**
 * The name of the persistent log file.
 * @constant {string}
 */
const LOG_FILE = 'cliobulk.log';

/**
 * Logger singleton providing tiered logging capabilities.
 */
export const logger = {
  /**
   * Internal logging function that handles formatting and routing.
   * 
   * @param {string} message - The message string to log.
   * @param {string} [level='INFO'] - Logging level (INFO, WARN, ERROR).
   * @returns {Promise<void>}
   */
  async log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}\n`;
    
    // Route to standard console based on level
    if (level === 'ERROR') {
      console.error(formattedMessage);
    } else if (level === 'WARN') {
      console.warn(formattedMessage);
    } else {
      console.log(formattedMessage);
    }

    // Persist to disk only if running within a Tauri context
    if (window.__TAURI__) {
      try {
        // Attempt to append to the existing log file in the AppLog directory
        await writeTextFile(LOG_FILE, formattedMessage, { 
            baseDir: BaseDirectory.AppLog,
            append: true 
        });
      } catch (err) {
        // Fallback: If append fails, attempt to create a new file
        try {
            await writeTextFile(LOG_FILE, formattedMessage, { 
                baseDir: BaseDirectory.AppLog,
                createNew: true
            });
        } catch (innerErr) {
            // Silently fail if file system access is denied, preserving console logs
            console.error('Critical Error: Failed to write to log file system.', err);
        }
      }
    }
  },

  /**
   * Logs an informational message.
   * @param {string} message 
   */
  info(message) {
    return this.log(message, 'INFO');
  },

  /**
   * Logs a warning message.
   * @param {string} message 
   */
  warn(message) {
    return this.log(message, 'WARN');
  },

  /**
   * Logs an error message.
   * @param {string} message 
   */
  error(message) {
    return this.log(message, 'ERROR');
  }
};
