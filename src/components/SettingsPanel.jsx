import React from 'react';
import { Settings, Monitor, Image as ImageIcon, AlertCircle } from 'lucide-react';

const PRESETS = [
  { name: 'Default', options: { brightness: 0.0, contrast: 1.0, saturation: 1.0, adaptive_threshold: false, denoise: false } },
  { name: 'Vivid', options: { brightness: 0.05, contrast: 1.2, saturation: 1.3, adaptive_threshold: false, denoise: false } },
  { name: 'Soft', options: { brightness: 0.1, contrast: 0.9, saturation: 0.8, adaptive_threshold: false, denoise: true } },
  { name: 'B&W', options: { brightness: 0.0, contrast: 1.2, saturation: 0.0, adaptive_threshold: false, denoise: false } },
  { name: 'High Contrast', options: { brightness: 0.0, contrast: 1.5, saturation: 1.1, adaptive_threshold: false, denoise: false } },
  { name: 'Document', options: { brightness: 0.2, contrast: 1.3, saturation: 0.0, adaptive_threshold: true, denoise: true } },
];

const SettingsPanel = ({ isOpen, processingOptions, setProcessingOptions, isTauri }) => {
  if (!isOpen) return null;

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
             <Monitor size={14} />Presets
           </h3>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Processing Presets">
            {PRESETS.map(preset => (
              <button
                key={preset.name}
                onClick={() => setProcessingOptions(preset.options)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium hover:bg-zinc-800 hover:border-zinc-600 transition-all text-left focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-label={`Apply ${preset.name} preset`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="adjustments-heading">
          <h3 id="adjustments-heading" className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ImageIcon size={14} />Adjustments
          </h3>

          {!isTauri && (
            <div className="mb-4 p-3 bg-amber-900/30 border border-amber-700/50 rounded-lg flex gap-3 items-start" role="alert">
              <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-amber-200/80 leading-relaxed">
                Brightness, Contrast, and Saturation adjustments are currently only available in the Native Desktop app.
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="brightness-slider" className={`font-medium ${!isTauri ? 'text-zinc-600' : 'text-zinc-400'}`}>Brightness</label>
                <span className={`font-bold ${!isTauri ? 'text-zinc-700' : 'text-blue-500'}`}>
                  {(processingOptions.brightness * 100).toFixed(0)}%
                </span>
              </div>
              <input
                id="brightness-slider"
                type="range"
                min="-1"
                max="1"
                step="0.1"
                value={processingOptions.brightness}
                onChange={(e) => setProcessingOptions({...processingOptions, brightness: parseFloat(e.target.value)})}
                className={`w-full ${!isTauri ? 'accent-zinc-700 cursor-not-allowed' : 'accent-blue-600 cursor-pointer'}`}
                aria-valuetext={`${(processingOptions.brightness * 100).toFixed(0)}%`}
                disabled={!isTauri}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="contrast-slider" className={`font-medium ${!isTauri ? 'text-zinc-600' : 'text-zinc-400'}`}>Contrast</label>
                <span className={`font-bold ${!isTauri ? 'text-zinc-700' : 'text-blue-500'}`}>
                  {processingOptions.contrast.toFixed(1)}x
                </span>
              </div>
              <input
                id="contrast-slider"
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={processingOptions.contrast}
                onChange={(e) => setProcessingOptions({...processingOptions, contrast: parseFloat(e.target.value)})}
                className={`w-full ${!isTauri ? 'accent-zinc-700 cursor-not-allowed' : 'accent-blue-600 cursor-pointer'}`}
                aria-valuetext={`${processingOptions.contrast.toFixed(1)}x`}
                disabled={!isTauri}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="saturation-slider" className={`font-medium ${!isTauri ? 'text-zinc-600' : 'text-zinc-400'}`}>Saturation</label>
                <span className={`font-bold ${!isTauri ? 'text-zinc-700' : 'text-blue-500'}`}>
                  {processingOptions.saturation.toFixed(1)}x
                </span>
              </div>
              <input
                id="saturation-slider"
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={processingOptions.saturation}
                onChange={(e) => setProcessingOptions({...processingOptions, saturation: parseFloat(e.target.value)})}
                className={`w-full ${!isTauri ? 'accent-zinc-700 cursor-not-allowed' : 'accent-blue-600 cursor-pointer'}`}
                aria-valuetext={`${processingOptions.saturation.toFixed(1)}x`}
                disabled={!isTauri}
              />
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default SettingsPanel;
