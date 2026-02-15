/**
 * @module TauriBridge
 * @description Provides safe, conditional access to Tauri native APIs. Ensures the application doesn't crash when running in a standard browser environment.
 * @author Alejandro Ramírez
 */

/**
 * Checks if the current execution context is within a Tauri-managed window.
 * @returns {boolean} True if running in Tauri.
 */
export const isTauri = () => !!window.__TAURI__;

/**
 * Dynamically imports and returns essential Tauri API modules if running in a native context.
 * Uses code-splitting to keep the initial browser bundle small.
 * 
 * @async
 * @returns {Promise<{core: Object, event: Object, path: Object, dialog: Object} | null>} 
 *          A bundle of Tauri modules or null if not in a Tauri environment.
 */
export const getTauriApi = async () => {
  if (!isTauri()) return null;
  
  // Parallel loading of essential Tauri system modules
  const [core, event, path, dialog] = await Promise.all([
    import('@tauri-apps/api/core'),
    import('@tauri-apps/api/event'),
    import('@tauri-apps/api/path'),
    import('@tauri-apps/plugin-dialog')
  ]);
  
  return { core, event, path, dialog };
};
