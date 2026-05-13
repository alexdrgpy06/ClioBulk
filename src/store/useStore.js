
import { create } from 'zustand';

export const useStore = create((set) => ({
  files: [],
  fileIdsByPath: {}, // pre-computed O(1) lookup path -> id
  processing: false,
  processedFiles: {}, // id -> blob
  progress: 0,
  lut: null, // { size, data }
  watermark: null, // { image, text, opacity, rect }
  
  addFiles: (newFiles) => set((state) => {
    const newFileEntries = newFiles.map(f => {
      const id = crypto.randomUUID();
      const path = f.path || (f.file ? f.file.name : null);
      return {
        file: f.file || null,
        path: f.path || null,
        name: f.name || (f.file ? f.file.name : 'Unknown'),
        id,
        status: 'pending',
        _lookupPath: path
      };
    });

    const updatedFileIdsByPath = { ...state.fileIdsByPath };
    newFileEntries.forEach(f => {
      if (f._lookupPath) {
        updatedFileIdsByPath[f._lookupPath] = f.id;
      }
    });

    return {
      files: [...state.files, ...newFileEntries.map(({_lookupPath, ...rest}) => rest)],
      fileIdsByPath: updatedFileIdsByPath
    };
  }),
  
  removeFile: (id) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === id);
    const updatedFileIdsByPath = { ...state.fileIdsByPath };
    if (fileToRemove) {
      const lookupPath = fileToRemove.path || (fileToRemove.file ? fileToRemove.file.name : null);
      if (lookupPath) {
        delete updatedFileIdsByPath[lookupPath];
      }
    }
    return {
      files: state.files.filter(f => f.id !== id),
      fileIdsByPath: updatedFileIdsByPath
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
