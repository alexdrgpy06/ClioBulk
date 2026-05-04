
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  filePathToId: {},
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
      id: crypto.randomUUID(),
      status: 'pending'
    }));
    const newMap = { ...state.filePathToId };
    mapped.forEach(f => {
      const key = f.path || f.name;
      if (key) newMap[key] = f.id;
    });
    return {
      files: [...state.files, ...mapped],
      filePathToId: newMap
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    const newMap = { ...state.filePathToId };
    if (fileToRemove) {
      const key = fileToRemove.path || fileToRemove.name;
      delete newMap[key];
    }
    return {
      files: state.files.filter(f => f.id !== id),
      filePathToId: newMap
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
  
  clearFiles: () => set({ files: [], processedFiles: {}, progress: 0, filePathToId: {} })
}));
