
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  fileIdsByPath: {}, // pre-computed O(1) lookup for Tauri progress events
  processing: false,
  processedFiles: {}, // id -> blob
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  
  addFiles: (newFiles) => set((state) => {
    const mapped = newFiles.map(f => ({
      file: f.file || null,
      path: f.path || null,
      name: f.name || (f.file ? f.file.name : 'Unknown'),
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    }));

    const newFileIdsByPath = { ...state.fileIdsByPath };
    for (const f of mapped) {
      const p = f.path || f.file?.name;
      if (p) newFileIdsByPath[p] = f.id;
    }

    return {
      files: [...state.files, ...mapped],
      fileIdsByPath: newFileIdsByPath
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    const newFileIdsByPath = { ...state.fileIdsByPath };
    if (fileToRemove) {
      const p = fileToRemove.path || fileToRemove.file?.name;
      if (p) delete newFileIdsByPath[p];
    }

    return {
      files: state.files.filter(f => f.id !== id),
      fileIdsByPath: newFileIdsByPath
    };
  }),

  setLut: (lut) => set({ lut }),
  setWatermark: (watermark) => set({ watermark }),
  setProcessing: (processing) => set({ processing }),
  setProgress: (progress) => set({ progress }),
  
  updateFileStatus: (id, status, blob = null) => set((state) => {
    const newFiles = state.files.map(f => f.id === id ? { ...f, status } : f);
    const newProcessedFiles = blob ? { ...state.processedFiles, [id]: blob } : state.processedFiles;
    return { files: newFiles, processedFiles: newProcessedFiles };
  }),
  
  clearFiles: () => set({ files: [], fileIdsByPath: {}, processedFiles: {}, progress: 0 })
}));
