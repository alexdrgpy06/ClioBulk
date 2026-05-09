
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  fileLookup: new Map(), // path/name -> id
  processing: false,
  processedFiles: {}, // id -> blob
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  
  addFiles: (newFiles) => set((state) => {
    const mappedNewFiles = newFiles.map(f => ({
      file: f.file || null,
      path: f.path || null,
      name: f.name || (f.file ? f.file.name : 'Unknown'),
      id: crypto.randomUUID(),
      status: 'pending'
    }));
    const nextFiles = [...state.files, ...mappedNewFiles];

    // Maintain lookup map for O(1) searches during progress events
    const nextLookup = new Map(state.fileLookup);
    mappedNewFiles.forEach(f => {
        nextLookup.set(f.path || f.name, f.id);
    });

    return {
      files: nextFiles,
      fileLookup: nextLookup
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    const nextFiles = state.files.filter(f => f.id !== id);
    const nextLookup = new Map(state.fileLookup);

    if (fileToRemove) {
        nextLookup.delete(fileToRemove.path || fileToRemove.name);
    }

    return {
        files: nextFiles,
        fileLookup: nextLookup
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
  
  clearFiles: () => set({ files: [], processedFiles: {}, progress: 0, fileLookup: new Map() })
}));
