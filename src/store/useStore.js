
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  processing: false,
  processedFiles: {}, // id -> blob
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  fileIdsByPath: {}, // O(1) lookup map for fast file ID resolution during high-frequency progress updates

  addFiles: (newFiles) => set((state) => {
    const nextFiles = newFiles.map(f => ({
      file: f.file || null,
      path: f.path || null,
      name: f.name || (f.file ? f.file.name : 'Unknown'),
      id: crypto.randomUUID(),
      status: 'pending'
    }));

    // Update O(1) lookup dictionary
    const nextFileIdsByPath = { ...state.fileIdsByPath };
    nextFiles.forEach(f => {
      const p = f.path || f.name;
      if (p) nextFileIdsByPath[p] = f.id;
    });

    return {
      files: [...state.files, ...nextFiles],
      fileIdsByPath: nextFileIdsByPath
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    const nextFileIdsByPath = { ...state.fileIdsByPath };

    if (fileToRemove) {
      const p = fileToRemove.path || fileToRemove.name;
      if (p) delete nextFileIdsByPath[p];
    }

    return {
      files: state.files.filter(f => f.id !== id),
      fileIdsByPath: nextFileIdsByPath
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
