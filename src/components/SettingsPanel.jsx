import React from 'react';
import { Monitor, Image as ImageIcon, Settings } from 'lucide-react';

/**
 * Predefined image processing configurations for quick application.
 * @constant {Array<Object>}
 */
const PRESETS = [
  { name: 'Default', options: { brightness: 0.0, contrast: 1.0, saturation: 1.0, adaptive_threshold: false, denoise: false } },
  { name: 'Vivid', options: { brightness: 0.05, contrast: 1.2, saturation: 1.3, adaptive_threshold: false, denoise: false } },
  { name: 'Soft', options: { brightness: 0.1, contrast: 0.9, saturation: 0.8, adaptive_threshold: false, denoise: true } },
  { name: 'B&W', options: { brightness: 0.0, contrast: 1.2, saturation: 0.0, adaptive_threshold: false, denoise: false } },
  { name: 'High Contrast', options: { brightness: 0.0, contrast: 1.5, saturation: 1.1, adaptive_threshold: false, denoise: false } },
  { name: 'Document', options: { brightness: 0.2, contrast: 1.3, saturation: 0.0, adaptive_threshold: true, denoise: true } },
];

const SettingsPanel = ({ options, setOptions }) => {
  const isPresetActive = (presetOptions) => {
    return JSON.stringify(options) === JSON.stringify(presetOptions);
  };

  return (
    <aside
      id="settings-panel"
      className="w-80 border-r border-zinc-800 p-6 overflow-y-auto bg-zinc-950 animate-in slide-in-from-left duration-300"
      aria-label="Image Processing Settings"
    >
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Settings size={20} className="text-blue-500" />
        Options
      </h2>

      <div className="space-y-8">
        <section aria-labelledby="presets-heading">
          <h3 id="presets-heading" className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Monitor size={14} />
            Presets
          </h3>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Image Presets">
            {PRESETS.map((preset) => {
              const active = isPresetActive(preset.options);
              return (
                <button
                  key={preset.name}
                  onClick={() => setOptions(preset.options)}
                  aria-pressed={active}
                  className={`px-3 py-2 border rounded-lg text-xs font-medium transition-all text-left ${
                    active
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="adjustments-heading">
          <h3 id="adjustments-heading" className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ImageIcon size={14} />
            Adjustments
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="brightness-slider" className="text-zinc-400">Brightness</label>
                <span className="text-blue-500 font-bold">{(options.brightness * 100).toFixed(0)}%</span>
              </div>
              <input
                id="brightness-slider"
                type="range"
                min="-1"
                max="1"
                step="0.1"
                value={options.brightness}
                onChange={(e) => setOptions({ ...options, brightness: parseFloat(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
                aria-valuetext={`${(options.brightness * 100).toFixed(0)}%`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="contrast-slider" className="text-zinc-400">Contrast</label>
                <span className="text-blue-500 font-bold">{options.contrast.toFixed(1)}x</span>
              </div>
              <input
                id="contrast-slider"
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={options.contrast}
                onChange={(e) => setOptions({ ...options, contrast: parseFloat(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
                aria-valuetext={`${options.contrast.toFixed(1)}x`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="saturation-slider" className="text-zinc-400">Saturation</label>
                <span className="text-blue-500 font-bold">{options.saturation.toFixed(1)}x</span>
              </div>
              <input
                id="saturation-slider"
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={options.saturation}
                onChange={(e) => setOptions({ ...options, saturation: parseFloat(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
                aria-valuetext={`${options.saturation.toFixed(1)}x`}
              />
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default SettingsPanel;
