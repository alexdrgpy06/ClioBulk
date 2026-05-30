
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  processing: false,
  processedFiles: {}, // id -> blob
  fileIdsByPath: {}, // path || name -> id
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  
  addFiles: (newFiles) => set((state) => {
    const newFileIdsByPath = { ...state.fileIdsByPath };
    const processedNewFiles = newFiles.map(f => {
      const id = crypto.randomUUID();
      const name = f.name || (f.file ? f.file.name : 'Unknown');
      const path = f.path || null;
      newFileIdsByPath[path || name] = id;
      return {
        file: f.file || null,
        path,
        name,
        id,
        status: 'pending'
      };
    });
    return {
      files: [...state.files, ...processedNewFiles],
      fileIdsByPath: newFileIdsByPath
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    if (!fileToRemove) return state;

    const newFileIdsByPath = { ...state.fileIdsByPath };
    delete newFileIdsByPath[fileToRemove.path || fileToRemove.name];

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
  
  clearFiles: () => set({ files: [], processedFiles: {}, fileIdsByPath: {}, progress: 0 })
}));
