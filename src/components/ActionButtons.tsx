import { FileItem, RenameConfig } from '../types';
import { Play, RotateCcw, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { applyRenameRules } from '../lib/renameEngine';

interface ActionButtonsProps {
  files: FileItem[];
  config: RenameConfig;
  canUndo: boolean;
  onRename: () => void;
  onUndo: () => void;
}

export function ActionButtons({ files, config, canUndo, onRename, onUndo }: ActionButtonsProps) {
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  
  const selectedFiles = files.filter(f => f.selected);
  const hasSelection = selectedFiles.length > 0;

  const handleRename = async () => {
    try {
      const operations = selectedFiles.map((file, index) => ({
        oldPath: file.path,
        newPath: file.path.replace(file.name, applyRenameRules(file, config, index))
      }));

      await window.electronAPI.renameFiles(operations);
      setStatus({ type: 'success', message: `✓ Successfully renamed ${operations.length} file(s)` });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
      onRename();
    } catch (error: any) {
      setStatus({ type: 'error', message: `✗ Error: ${error.message}` });
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleUndo = async () => {
    try {
      await window.electronAPI.undoLastRename();
      setStatus({ type: 'success', message: '✓ Undo successful' });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
      onUndo();
    } catch (error: any) {
      setStatus({ type: 'error', message: `✗ Undo failed: ${error.message}` });
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleReset = () => {
    // Reset all selections
    setStatus({ type: '', message: '' });
  };

  return (
    <div className="app-actions">
      <button 
        className="btn btn-primary" 
        onClick={handleRename}
        disabled={!hasSelection}
      >
        <Play size={16} />
        Rename {hasSelection && `(${selectedFiles.length})`}
      </button>
      
      <button className="btn" onClick={handleReset}>
        <XCircle size={16} />
        Reset All
      </button>
      
      <button 
        className="btn" 
        onClick={handleUndo}
        disabled={!canUndo}
      >
        <RotateCcw size={16} />
        Revert Last
      </button>
      
      {status.message && (
        <div className={`status-message ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
          {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {status.message}
        </div>
      )}
    </div>
  );
}
