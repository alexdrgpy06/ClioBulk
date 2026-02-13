// Helper to safely use Tauri APIs
export const isTauri = () => !!window.__TAURI__;

export const getTauriApi = async () => {
  if (!isTauri()) return null;
  
  const [core, event, path, dialog] = await Promise.all([
    import('@tauri-apps/api/core'),
    import('@tauri-apps/api/event'),
    import('@tauri-apps/api/path'),
    import('@tauri-apps/plugin-dialog')
  ]);
  
  return { core, event, path, dialog };
};
