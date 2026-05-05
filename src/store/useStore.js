
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  fileLookup: {}, // path or name -> id
  idLookup: {}, // id -> name
  processing: false,
  processedFiles: {}, // id -> blob
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  
  addFiles: (newFiles) => set((state) => {
    const addedFiles = newFiles.map(f => ({
      file: f.file || null,
      path: f.path || null,
      name: f.name || (f.file ? f.file.name : 'Unknown'),
      id: crypto.randomUUID(),
      status: 'pending'
    }));

    const newFileLookup = { ...state.fileLookup };
    const newIdLookup = { ...state.idLookup };

    addedFiles.forEach(f => {
      if (f.path || f.name) {
        newFileLookup[f.path || f.name] = f.id;
      }
      newIdLookup[f.id] = f.name;
    });

    return {
      files: [...state.files, ...addedFiles],
      fileLookup: newFileLookup,
      idLookup: newIdLookup
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    if (!fileToRemove) return {};

    const newFileLookup = { ...state.fileLookup };
    const key = fileToRemove.path || fileToRemove.name;
    if (key) {
      delete newFileLookup[key];
    }

    const newIdLookup = { ...state.idLookup };
    delete newIdLookup[id];

    return {
      files: state.files.filter(f => f.id !== id),
      fileLookup: newFileLookup,
      idLookup: newIdLookup
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
  
  clearFiles: () => set({ files: [], processedFiles: {}, progress: 0, fileLookup: {}, idLookup: {} })
}));
