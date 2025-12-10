import { contextBridge, ipcRenderer } from 'electron';

const api = {
  getDrives: () => ipcRenderer.invoke('get-drives'),
  readDirectory: (path: string) => ipcRenderer.invoke('read-directory', path),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  renameFiles: (operations: Array<{ oldPath: string; newPath: string }>) =>
    ipcRenderer.invoke('rename-files', operations),
  undoLastRename: () => ipcRenderer.invoke('undo-last-rename'),
  copyFiles: (operations: Array<{ sourcePath: string; destPath: string }>) =>
    ipcRenderer.invoke('copy-files', operations),
  moveFiles: (operations: Array<{ sourcePath: string; destPath: string }>) =>
    ipcRenderer.invoke('move-files', operations),
  getFileStats: (filePath: string) => ipcRenderer.invoke('get-file-stats', filePath),
  savePreset: (name: string, config: any) => ipcRenderer.invoke('save-preset', name, config),
  loadPreset: (name: string) => ipcRenderer.invoke('load-preset', name),
  listPresets: () => ipcRenderer.invoke('list-presets'),
};

contextBridge.exposeInMainWorld('electronAPI', api);

export type ElectronAPI = typeof api;
