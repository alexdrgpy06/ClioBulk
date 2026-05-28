import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  processing: false,
  processedFiles: {}, // id -> blob
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  fileIdsByPath: {}, // path -> id mapping for O(1) lookup
  
  addFiles: (newFiles) => set((state) => {
    const newFileObjects = newFiles.map(f => {
      const id = crypto.randomUUID();
      return {
        file: f.file || null,
        path: f.path || null,
        name: f.name || (f.file ? f.file.name : 'Unknown'),
        id,
        status: 'pending'
      };
    });

    const newFileIdsByPath = { ...state.fileIdsByPath };
    newFileObjects.forEach(f => {
      const key = f.path || (f.file ? f.file.name : null);
      if (key) {
        newFileIdsByPath[key] = f.id;
      }
    });

    return {
      files: [...state.files, ...newFileObjects],
      fileIdsByPath: newFileIdsByPath
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    const newFileIdsByPath = { ...state.fileIdsByPath };
    if (fileToRemove) {
      const key = fileToRemove.path || (fileToRemove.file ? fileToRemove.file.name : null);
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
  
  clearFiles: () => set({ files: [], processedFiles: {}, progress: 0, fileIdsByPath: {} })
}));
