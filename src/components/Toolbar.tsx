import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, FolderOpen, RotateCcw, Save } from 'lucide-react';
import { RenameConfig } from '../types';

interface ToolbarProps {
  currentPath: string;
  onPathChange: (path: string) => void;
  config: RenameConfig;
  onConfigChange: (updates: Partial<RenameConfig>) => void;
}

export function Toolbar({ currentPath, onPathChange, config, onConfigChange }: ToolbarProps) {
  const [history, setHistory] = useState<string[]>([currentPath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [presets, setPresets] = useState<string[]>([]);

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onPathChange(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onPathChange(history[newIndex]);
    }
  };

  const handleUp = () => {
    const parts = currentPath.split('\\').filter(Boolean);
    if (parts.length > 1) {
      parts.pop();
      const newPath = parts.join('\\') + '\\';
      onPathChange(newPath);
    }
  };

  const handleBrowse = async () => {
    const path = await window.electronAPI.selectFolder();
    if (path) {
      onPathChange(path);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(path);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleSavePreset = async () => {
    const name = prompt('Preset name:');
    if (name) {
      await window.electronAPI.savePreset(name, config);
      setPresets([...presets, name]);
    }
  };

  const handleLoadPreset = async (name: string) => {
    const result = await window.electronAPI.loadPreset(name);
    if (result.success && result.config) {
      onConfigChange(result.config);
    }
  };

  return (
    <div className="app-toolbar">
      <button className="btn btn-icon" onClick={handleBack} disabled={historyIndex === 0} title="Back">
        <ChevronLeft size={18} />
      </button>
      <button className="btn btn-icon" onClick={handleForward} disabled={historyIndex >= history.length - 1} title="Forward">
        <ChevronRight size={18} />
      </button>
      <button className="btn btn-icon" onClick={handleUp} title="Up">
        <ChevronUp size={18} />
      </button>
      
      <input 
        type="text" 
        className="input flex-1 max-w-600" 
        value={currentPath}
        onChange={(e) => onPathChange(e.target.value)}
        title="Current directory path"
        placeholder="Enter path..."
      />
      
      <button className="btn btn-icon" onClick={handleBrowse} title="Browse">
        <FolderOpen size={18} />
      </button>
      <button className="btn btn-icon" onClick={() => onPathChange(currentPath)} title="Refresh">
        <RotateCcw size={18} />
      </button>
      
      <div className="flex-1" />
      
      <button className="btn" onClick={handleSavePreset}>
        <Save size={16} />
        Save Preset
      </button>
      
      {presets.length > 0 && (
        <select className="select w-auto" onChange={(e) => handleLoadPreset(e.target.value)} title="Load saved preset">
          <option value="">Load Preset...</option>
          {presets.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      )}
    </div>
  );
}
