import { useState, useEffect } from 'react';
import { Toolbar } from './components/Toolbar';
import { DirectoryTree } from './components/DirectoryTree';
import { FileList } from './components/FileList';
import { ControlsPanel } from './components/ControlsPanel';
import { ActionButtons } from './components/ActionButtons';
import { FileItem, RenameConfig } from './types';
import { getDefaultConfig } from './lib/config';

function App() {
  const [currentPath, setCurrentPath] = useState<string>('C:\\');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [config, setConfig] = useState<RenameConfig>(getDefaultConfig());
  const [canUndo] = useState(false);

  const updateConfig = (updates: Partial<RenameConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const loadFiles = async (path: string) => {
    try {
      const result = await window.electronAPI.readDirectory(path);
      setFiles(result);
    } catch (error) {
      console.error('Failed to load files:', error);
      setFiles([]);
    }
  };

  useEffect(() => {
    loadFiles(currentPath);
  }, [currentPath]);

  return (
    <div className="app-container">
      <Toolbar
        currentPath={currentPath}
        onPathChange={setCurrentPath}
        config={config}
        onConfigChange={updateConfig}
      />
      
      <div className="app-content">
        <div className="sidebar">
          <DirectoryTree
            currentPath={currentPath}
            onPathChange={setCurrentPath}
          />
        </div>
        
        <div className="main-area">
          <div className="app-file-list">
            <FileList
              files={files}
              config={config}
              onSelectionChange={setFiles}
            />
          </div>
          
          <div className="app-controls">
            <ControlsPanel
              config={config}
              onChange={updateConfig}
            />
          </div>
          
          <div className="app-actions">
            <ActionButtons
              files={files}
              config={config}
              canUndo={canUndo}
              onRename={() => loadFiles(currentPath)}
              onUndo={() => loadFiles(currentPath)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
