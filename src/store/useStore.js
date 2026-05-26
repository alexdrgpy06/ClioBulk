
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  processing: false,
  processedFiles: {}, // id -> blob
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  fileIdsByPath: {}, // O(1) lookup dictionary
  
  addFiles: (newFiles) => set((state) => {
    const newFileItems = newFiles.map(f => ({
      file: f.file || null,
      path: f.path || null,
      name: f.name || (f.file ? f.file.name : 'Unknown'),
      id: crypto.randomUUID(),
      status: 'pending'
    }));
    const newDict = { ...state.fileIdsByPath };
    newFileItems.forEach(item => {
      const key = item.path || (item.file ? item.file.name : null);
      if (key) newDict[key] = item.id;
    });
    return {
      files: [...state.files, ...newFileItems],
      fileIdsByPath: newDict
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    const newDict = { ...state.fileIdsByPath };
    if (fileToRemove) {
      const key = fileToRemove.path || fileToRemove.file?.name;
      if (key) delete newDict[key];
    }
    return {
      files: state.files.filter(f => f.id !== id),
      fileIdsByPath: newDict
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
  
  clearFiles: () => set({ files: [], processedFiles: {}, progress: 0, fileIdsByPath: {} })
}));
