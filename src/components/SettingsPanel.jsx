import React from 'react';
import { Settings, Monitor, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const PRESETS = [
  { name: 'Default', options: { brightness: 0.0, contrast: 1.0, saturation: 1.0, adaptive_threshold: false, denoise: false } },
  { name: 'Vivid', options: { brightness: 0.05, contrast: 1.2, saturation: 1.3, adaptive_threshold: false, denoise: false } },
  { name: 'Soft', options: { brightness: 0.1, contrast: 0.9, saturation: 0.8, adaptive_threshold: false, denoise: true } },
  { name: 'B&W', options: { brightness: 0.0, contrast: 1.2, saturation: 0.0, adaptive_threshold: false, denoise: false } },
  { name: 'High Contrast', options: { brightness: 0.0, contrast: 1.5, saturation: 1.1, adaptive_threshold: false, denoise: false } },
  { name: 'Document', options: { brightness: 0.2, contrast: 1.3, saturation: 0.0, adaptive_threshold: true, denoise: true } },
];

const SettingsPanel = () => {
  const { processingOptions, setProcessingOptions } = useStore(useShallow(state => ({
    processingOptions: state.processingOptions,
    setProcessingOptions: state.setProcessingOptions
  })));

  return (
    <aside className="w-80 border-r border-zinc-800 p-6 overflow-y-auto bg-zinc-950 animate-in slide-in-from-left duration-300">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Settings size={20} className="text-blue-500" />Options</h2>
      <div className="space-y-8">
        <section>
           <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Monitor size={14} />Presets</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map(preset => (
              <button key={preset.name} onClick={() => setProcessingOptions(preset.options)} className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium hover:bg-zinc-800 hover:border-zinc-600 transition-all text-left">{preset.name}</button>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2"><ImageIcon size={14} />Adjustments</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><label className="text-zinc-400">Brightness</label><span className="text-blue-500 font-bold">{(processingOptions.brightness * 100).toFixed(0)}%</span></div>
              <input type="range" min="-1" max="1" step="0.1" value={processingOptions.brightness} onChange={(e) => setProcessingOptions({ brightness: parseFloat(e.target.value) })} className="w-full accent-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><label className="text-zinc-400">Contrast</label><span className="text-blue-500 font-bold">{processingOptions.contrast.toFixed(1)}x</span></div>
              <input type="range" min="0" max="3" step="0.1" value={processingOptions.contrast} onChange={(e) => setProcessingOptions({ contrast: parseFloat(e.target.value) })} className="w-full accent-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><label className="text-zinc-400">Saturation</label><span className="text-blue-500 font-bold">{processingOptions.saturation.toFixed(1)}x</span></div>
              <input type="range" min="0" max="2" step="0.1" value={processingOptions.saturation} onChange={(e) => setProcessingOptions({ saturation: parseFloat(e.target.value) })} className="w-full accent-blue-600" />
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default SettingsPanel;
