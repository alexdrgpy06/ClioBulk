
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  fileIdsByPath: {}, // Optimization: O(1) lookup dictionary for path -> id
  processing: false,
  processedFiles: {}, // id -> blob
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  
  addFiles: (newFiles) => set((state) => {
    const processedNewFiles = newFiles.map(f => ({
      file: f.file || null,
      path: f.path || null,
      name: f.name || (f.file ? f.file.name : 'Unknown'),
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    }));

    // Update O(1) lookup dictionary
    const newFileIdsByPath = { ...state.fileIdsByPath };
    processedNewFiles.forEach(f => {
      const key = f.path || f.name;
      if (key) {
        newFileIdsByPath[key] = f.id;
      }
    });

    return {
      files: [...state.files, ...processedNewFiles],
      fileIdsByPath: newFileIdsByPath
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    const newFileIdsByPath = { ...state.fileIdsByPath };
    if (fileToRemove) {
      const key = fileToRemove.path || fileToRemove.name;
      if (key) {
        delete newFileIdsByPath[key];
      }
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
