/**
 * @file App.jsx
 * @description Main application component for ClioBulk. Orchestrates the UI, state management, 
 * and handles the switching between Native (Tauri/Rust) and Browser-based processing engines.
 * 
 * Includes professional features like:
 * - Real-time RAW decoding previews.
 * - Dynamic 3D LUT (Cube) color grading application.
 * - Canvas-based high-performance watermarking.
 * - Batch processing via Web Workers or Native IPC.
 * 
 * @author Alejandro Ramírez
 * @version 2.0.0-optimized
 */

import React, { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Settings, 
  Play, 
  X, 
  CheckCircle2, 
  Loader2, 
  Download,
  Trash2,
  Layers,
  Monitor,
  AlertCircle
} from 'lucide-react';
import { useStore } from './store/useStore';
import { parseCubeLUT } from './utils/webgl-engine';
import { createTextWatermark } from './utils/watermark';
import { decodeRaw, isRaw } from './utils/raw-decoder';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { open } from '@tauri-apps/plugin-dialog';
import { downloadDir } from '@tauri-apps/api/path';
import { logger } from './utils/logger';

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

/**
 * FileCard Component
 * Renders an individual file preview with status indicators and lazy-loading for RAW files.
 */
const FileCard = memo(({ fileItem, processedBlob, onRemove, isTauri }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    let url = null;

    const loadPreview = async () => {
      // If we already have a processed result, show it
      if (processedBlob) {
        url = URL.createObjectURL(processedBlob);
        if (active) setPreviewUrl(url);
        return;
      }

      const actualPath = fileItem.path || null;

      // Conditional decoding for RAW formats in Native mode
      if (isTauri && actualPath && isRaw({ name: actualPath })) {
        setLoading(true);
        try {
          const dataUrl = await invoke('decode_raw', { path: actualPath });
          if (active) setPreviewUrl(dataUrl);
        } catch (err) {
          logger.error(`Failed to decode RAW: ${err}`);
          if (active) setError(true);
        } finally {
          if (active) setLoading(false);
        }
      } else if (fileItem.file) {
        // Standard image handling
        url = URL.createObjectURL(fileItem.file);
        if (active) setPreviewUrl(url);
      }
    };

    loadPreview();

    return () => {
      active = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [fileItem.file, fileItem.path, processedBlob, isTauri]);

  return (
    <div className="group relative aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all shadow-xl">
      {previewUrl ? (
        <img 
          src={previewUrl} 
          alt={fileItem.name} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${fileItem.status === 'processing' ? 'opacity-30' : 'opacity-100'}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-zinc-950">
          {loading ? <Loader2 className="animate-spin text-zinc-700" size={24} /> : <ImageIcon className="text-zinc-800" size={24} />}
        </div>
      )}
      
      {/* Status Overlays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {fileItem.status === 'processing' && <Loader2 className="animate-spin text-blue-500" size={32} />}
        {fileItem.status === 'complete' && (
          <div className="bg-green-600/20 backdrop-blur-sm p-2 rounded-full border border-green-500/50">
            <CheckCircle2 className="text-green-500" size={24} />
          </div>
        )}
        {fileItem.status === 'error' && (
          <div className="bg-red-600/20 backdrop-blur-sm p-2 rounded-full border border-red-500/50">
            <AlertCircle className="text-red-500" size={24} />
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
        <p className="text-[10px] font-mono truncate">{fileItem.name}</p>
      </div>

      <button 
        onClick={() => onRemove(fileItem.id)}
        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
});

/**
 * App Component
 * Primary container for the ClioBulk logic.
 */
function App() {
  // Global State from Store
  const { 
    files, addFiles, removeFile, lut, setLut, watermark, setWatermark,
    processing, setProcessing, progress, setProgress, updateFileStatus,
    processedFiles, clearFiles
  } = useStore();

  const [showSettings, setShowSettings] = useState(false);
  const [isTauri, setIsTauri] = useState(false);
  const workerRef = useRef(null);

  /**
   * Environment Detection & Event Listener Setup
   */
  useEffect(() => {
    const tauriActive = window.__TAURI__ !== undefined;
    setIsTauri(tauriActive);

    if (tauriActive) {
      // Setup listener for real-time progress events from the Rust backend
      const setupListener = async () => {
        const unlisten = await listen('process-progress', (event) => {
          const { path, success, error, progress: p } = event.payload;
          const fileItem = useStore.getState().files.find(f => (f.path || f.file?.name) === path);
          if (fileItem) {
            updateFileStatus(fileItem.id, success ? 'complete' : 'error');
          }
          setProgress(p);
        });
        return unlisten;
      };

      const unlistenPromise = setupListener();
      return () => unlistenPromise.then(fn => fn());
    } else {
      // Browser Fallback: Initialize Web Worker for background processing
      workerRef.current = new Worker(
        new URL('./workers/processor.worker.js', import.meta.url),
        { type: 'module' }
      );

      workerRef.current.onmessage = (e) => {
        const { type, payload } = e.data;
        if (type === 'PROCESS_COMPLETE') {
          updateFileStatus(payload.id, 'complete', payload.blob);
        } else if (type === 'ERROR') {
          updateFileStatus(payload.id, 'error');
        }
      };

      workerRef.current.postMessage({ type: 'INIT' });
      return () => workerRef.current.terminate();
    }
  }, [updateFileStatus, setProgress]);

  /**
   * File Ingestion Handlers
   */
  const handleFileChange = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files).map(f => ({ file: f, name: f.name }));
    addFiles(selectedFiles);
  }, [addFiles]);

  const handleTauriFileOpen = useCallback(async () => {
    try {
        const selected = await open({
        multiple: true,
        filters: [{ name: 'Images', extensions: ['png', 'jpeg', 'jpg', 'webp', 'arw', 'cr2', 'nef', 'dng'] }]
        });
        if (selected && Array.isArray(selected)) {
        addFiles(selected.map(path => ({
            path,
            name: path.split(/[\\/]/).pop(),
            type: 'image/unknown'
        })));
        }
    } catch (err) {
        alert(`Dialog Error: ${err}`);
    }
  }, [addFiles]);

  /**
   * LUT & Watermark Handlers
   */
  const handleLutUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const parsedLut = parseCubeLUT(text);
      setLut(parsedLut);
    }
  }, [setLut]);

  const handleWatermarkText = useCallback((e) => {
    const text = e.target.value;
    if (text) {
      const canvas = createTextWatermark(text);
      setWatermark({ image: canvas, text, opacity: 0.5 });
    } else {
      setWatermark(null);
    }
  }, [setWatermark]);

  const [processingOptions, setProcessingOptions] = useState({
    brightness: 0.0,
    contrast: 1.0,
    saturation: 1.0,
    adaptive_threshold: false,
    denoise: false
  });

  /**
   * Core Processing Pipeline Orchestrator
   */
  const startProcessing = useCallback(async () => {
    setProcessing(true);
    setProgress(0);

    if (isTauri) {
      // EXECUTE VIA RUST NATIVE CORE
      try {
        const outBase = await downloadDir();
        const filesToProcess = files
          .filter(f => f.status !== 'complete')
          .map(f => {
            const inputPath = f.path || f.file?.name;
            const fileName = f.name;
            const nameWithoutExt = fileName.lastIndexOf('.') !== -1 ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
            const outputPath = `${outBase}\\processed_${nameWithoutExt}.jpg`;
            return [inputPath, outputPath];
          });
        
        if (filesToProcess.length === 0) { setProcessing(false); return; }

        await invoke('process_bulk', { files: filesToProcess, options: processingOptions });
      } catch (err) {
        logger.error(`Bulk processing failed: ${err}`);
        alert(`Bulk Error: ${err}`);
      } finally {
        setProcessing(false);
      }
    } else {
      // EXECUTE VIA BROWSER WORKER
      let completed = 0;
      const pendingFiles = files.filter(f => f.status !== 'complete');
      
      for (const fileItem of pendingFiles) {
        updateFileStatus(fileItem.id, 'processing');
        
        let imageBitmap;
        try {
          imageBitmap = isRaw({ name: fileItem.name }) ? await decodeRaw(fileItem.file) : await createImageBitmap(fileItem.file);
        } catch (err) {
          updateFileStatus(fileItem.id, 'error');
          continue;
        }
        
        let watermarkBitmap = (watermark && watermark.image) ? await createImageBitmap(watermark.image) : null;
        const transferables = [imageBitmap];
        if (watermarkBitmap) transferables.push(watermarkBitmap);

        workerRef.current.postMessage({
          type: 'PROCESS_IMAGE',
          payload: {
            id: fileItem.id,
            imageBitmap,
            options: { lut, watermark: watermark ? { image: watermarkBitmap, opacity: watermark.opacity } : null }
          }
        }, transferables);

        completed++;
        setProgress((completed / pendingFiles.length) * 100);
      }
      setProcessing(false);
    }
  }, [files, isTauri, lut, processingOptions, setProcessing, setProgress, updateFileStatus, watermark]);

  const downloadAll = useCallback(() => {
    Object.entries(processedFiles).forEach(([id, blob]) => {
      const fileItem = files.find(f => f.id === id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `processed_${fileItem.name}`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }, [files, processedFiles]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-blue-500/30">
      <header className="border-b border-zinc-800 p-4 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <ImageIcon size={20} className="text-white" />
          </div>
          <h1 className="font-bold text-xl tracking-tight">ClioBulk</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowSettings(!showSettings)} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${showSettings ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
            <Settings size={18} /><span className="hidden sm:inline text-sm font-medium">Settings</span>
          </button>
          {Object.keys(processedFiles).length > 0 && (
            <button onClick={downloadAll} className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 transition-all shadow-lg shadow-green-600/20">
              <Download size={18} /><span className="hidden sm:inline text-sm font-medium">Download All</span>
            </button>
          )}
          <button disabled={files.length === 0 || processing} onClick={startProcessing} className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20">
            {processing ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
            <span className="font-bold">{processing ? 'Processing...' : `Process ${files.length > 0 ? `(${files.length})` : ''}`}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {showSettings && (
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
                    <input type="range" min="-1" max="1" step="0.1" value={processingOptions.brightness} onChange={(e) => setProcessingOptions({...processingOptions, brightness: parseFloat(e.target.value)})} className="w-full accent-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><label className="text-zinc-400">Contrast</label><span className="text-blue-500 font-bold">{processingOptions.contrast.toFixed(1)}x</span></div>
                    <input type="range" min="0" max="3" step="0.1" value={processingOptions.contrast} onChange={(e) => setProcessingOptions({...processingOptions, contrast: parseFloat(e.target.value)})} className="w-full accent-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><label className="text-zinc-400">Saturation</label><span className="text-blue-500 font-bold">{processingOptions.saturation.toFixed(1)}x</span></div>
                    <input type="range" min="0" max="2" step="0.1" value={processingOptions.saturation} onChange={(e) => setProcessingOptions({...processingOptions, saturation: parseFloat(e.target.value)})} className="w-full accent-blue-600" />
                  </div>
                </div>
              </section>
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto p-8 bg-black custom-scrollbar">
          {files.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="max-w-md w-full border-2 border-dashed border-zinc-800 rounded-[2rem] p-12 flex flex-col items-center text-center gap-4 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all group">
                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-xl"><Upload className="text-zinc-500 group-hover:text-blue-500 transition-colors" /></div>
                <div><h2 className="text-xl font-bold mb-1">Drop your photos here</h2><p className="text-zinc-500 text-sm">RAW, JPEG, or PNG. Everything stays on your device.</p></div>
                <label onClick={isTauri ? handleTauriFileOpen : undefined} className="mt-4 px-8 py-3 bg-white text-black rounded-full font-bold cursor-pointer hover:bg-zinc-200 transition-colors shadow-lg">
                  Select Files{!isTauri && <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*,.arw,.cr2,.nef,.dng" />}
                </label>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {files.map((fileItem) => <FileCard key={fileItem.id} fileItem={fileItem} processedBlob={processedFiles[fileItem.id]} onRemove={removeFile} isTauri={isTauri} />)}
            </div>
          )}
        </main>
      </div>
      
      {processing && (
        <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
          <div className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" style={{ width: `${progress}%` }} />
        </div>
      )}

      <footer className="px-6 py-4 border-t border-zinc-800 text-[10px] text-zinc-500 flex justify-between items-center bg-zinc-950">
        <div className="flex gap-6 items-center">
          <p className="font-medium text-zinc-400">Ready to process <span className="text-white">{files.length}</span> files</p>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${isTauri ? 'border-blue-500/30 text-blue-400 bg-blue-500/5 shadow-[0_0_10px_rgba(59,130,246,0.1)]' : 'border-zinc-800 text-zinc-500'}`}>
            <Monitor size={10} /><span className="font-bold tracking-widest">{isTauri ? 'NATIVE ENGINE' : 'WEB ENGINE'}</span>
          </div>
        </div>
        <div className="flex items-center gap-4"><p className="font-mono text-zinc-600">v2.0.0-optimized</p><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /></div>
      </footer>
    </div>
  );
}

export default App;
