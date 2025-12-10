import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as os from 'os';

let mainWindow: BrowserWindow | null = null;

interface FileItem {
  name: string;
  path: string;
  size: number;
  isDirectory: boolean;
  created: Date;
  modified: Date;
  accessed: Date;
  extension: string;
}

interface RenameOperation {
  oldPath: string;
  newPath: string;
}

interface RenameHistoryEntry {
  timestamp: Date;
  operations: RenameOperation[];
}

let renameHistory: RenameHistoryEntry[] = [];
const LOG_FILE = path.join(app.getPath('userData'), 'rename-log.json');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Bulk Rename Modern',
    backgroundColor: '#ffffff',
    show: false,
  });

  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  loadHistory();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers

ipcMain.handle('get-drives', async () => {
  const drives: string[] = [];
  
  if (process.platform === 'win32') {
    for (let i = 65; i <= 90; i++) {
      const drive = String.fromCharCode(i) + ':\\';
      try {
        await fs.access(drive);
        drives.push(drive);
      } catch {
        // Drive doesn't exist
      }
    }
  } else if (process.platform === 'darwin') {
    drives.push('/');
    try {
      const volumes = await fs.readdir('/Volumes');
      volumes.forEach(vol => drives.push(`/Volumes/${vol}`));
    } catch {}
  } else {
    drives.push('/');
  }
  
  return drives;
});

ipcMain.handle('read-directory', async (_, dirPath: string) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const items: FileItem[] = [];

    for (const entry of entries) {
      try {
        const fullPath = path.join(dirPath, entry.name);
        const stats = await fs.stat(fullPath);
        
        items.push({
          name: entry.name,
          path: fullPath,
          size: stats.size,
          isDirectory: entry.isDirectory(),
          created: stats.birthtime,
          modified: stats.mtime,
          accessed: stats.atime,
          extension: entry.isDirectory() ? '' : path.extname(entry.name),
        });
      } catch (err) {
        console.error(`Error reading ${entry.name}:`, err);
      }
    }

    return items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error: any) {
    throw new Error(`Failed to read directory: ${error.message}`);
  }
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory'],
  });
  
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('rename-files', async (_, operations: RenameOperation[]) => {
  const results: Array<{ success: boolean; oldPath: string; newPath: string; error?: string }> = [];
  const successfulOps: RenameOperation[] = [];

  for (const op of operations) {
    try {
      await fs.access(op.oldPath);
      
      try {
        await fs.access(op.newPath);
        results.push({
          success: false,
          oldPath: op.oldPath,
          newPath: op.newPath,
          error: 'File already exists',
        });
        continue;
      } catch {}

      const destDir = path.dirname(op.newPath);
      await fs.mkdir(destDir, { recursive: true });
      await fs.rename(op.oldPath, op.newPath);
      
      results.push({
        success: true,
        oldPath: op.oldPath,
        newPath: op.newPath,
      });
      
      successfulOps.push(op);
    } catch (error: any) {
      results.push({
        success: false,
        oldPath: op.oldPath,
        newPath: op.newPath,
        error: error.message,
      });
    }
  }

  if (successfulOps.length > 0) {
    const historyEntry: RenameHistoryEntry = {
      timestamp: new Date(),
      operations: successfulOps,
    };
    
    renameHistory.push(historyEntry);
    await saveHistory();
  }

  return results;
});

ipcMain.handle('undo-last-rename', async () => {
  if (renameHistory.length === 0) {
    return { success: false, error: 'No operations to undo' };
  }

  const lastEntry = renameHistory[renameHistory.length - 1];
  const results: Array<{ success: boolean; error?: string }> = [];

  for (let i = lastEntry.operations.length - 1; i >= 0; i--) {
    const op = lastEntry.operations[i];
    try {
      await fs.rename(op.newPath, op.oldPath);
      results.push({ success: true });
    } catch (error: any) {
      results.push({ success: false, error: error.message });
    }
  }

  renameHistory.pop();
  await saveHistory();

  return { success: true, results };
});

ipcMain.handle('copy-files', async (_, operations: Array<{ sourcePath: string; destPath: string }>) => {
  const results: Array<{ success: boolean; error?: string }> = [];

  for (const op of operations) {
    try {
      const destDir = path.dirname(op.destPath);
      await fs.mkdir(destDir, { recursive: true });
      await fs.copyFile(op.sourcePath, op.destPath);
      results.push({ success: true });
    } catch (error: any) {
      results.push({ success: false, error: error.message });
    }
  }

  return results;
});

ipcMain.handle('move-files', async (_, operations: Array<{ sourcePath: string; destPath: string }>) => {
  const results: Array<{ success: boolean; error?: string }> = [];

  for (const op of operations) {
    try {
      const destDir = path.dirname(op.destPath);
      await fs.mkdir(destDir, { recursive: true });
      await fs.rename(op.sourcePath, op.destPath);
      results.push({ success: true });
    } catch (error: any) {
      results.push({ success: false, error: error.message });
    }
  }

  return results;
});

ipcMain.handle('get-file-stats', async (_, filePath: string) => {
  try {
    const stats = await fs.stat(filePath);
    return {
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      accessed: stats.atime,
      isDirectory: stats.isDirectory(),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
});

ipcMain.handle('save-preset', async (_, name: string, config: any) => {
  try {
    const presetsDir = path.join(app.getPath('userData'), 'presets');
    await fs.mkdir(presetsDir, { recursive: true });
    const presetPath = path.join(presetsDir, `${name}.json`);
    await fs.writeFile(presetPath, JSON.stringify(config, null, 2));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-preset', async (_, name: string) => {
  try {
    const presetPath = path.join(app.getPath('userData'), 'presets', `${name}.json`);
    const data = await fs.readFile(presetPath, 'utf-8');
    return { success: true, config: JSON.parse(data) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('list-presets', async () => {
  try {
    const presetsDir = path.join(app.getPath('userData'), 'presets');
    await fs.mkdir(presetsDir, { recursive: true });
    const files = await fs.readdir(presetsDir);
    return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
});

async function loadHistory() {
  try {
    const data = await fs.readFile(LOG_FILE, 'utf-8');
    renameHistory = JSON.parse(data);
  } catch {
    renameHistory = [];
  }
}

async function saveHistory() {
  try {
    await fs.writeFile(LOG_FILE, JSON.stringify(renameHistory, null, 2));
  } catch (error) {
    console.error('Error saving history:', error);
  }
}
