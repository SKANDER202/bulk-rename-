import { RenameConfig } from '../../types';
import { FolderOpen } from 'lucide-react';

interface LocationControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function LocationControl({ config, onChange }: LocationControlProps) {
  const handleBrowse = async () => {
    const path = await window.electronAPI.selectFolder();
    if (path) {
      onChange({ locationPath: path });
    }
  };

  return (
    <div className={`card ${config.locationEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >13</span>
            <h3 className="card-title">Copy/Move Location</h3>
          </div>
          <div 
            className={`switch ${config.locationEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ locationEnabled: !config.locationEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Mode</label>
          <select 
            className="select" title="Select option"
            value={config.locationMode}
            onChange={(e) => onChange({ locationMode: e.target.value as any })}
            disabled={!config.locationEnabled}
          >
            <option value="copy">Copy</option>
            <option value="move">Move</option>
          </select>
        </div>
        <div>
          <label className="label">Destination Path</label>
          <div className="flex gap-sm">
            <input 
              type="text"
              className="input flex-1"
              value={config.locationPath}
              onChange={(e) => onChange({ locationPath: e.target.value })}
              disabled={!config.locationEnabled}
              placeholder="C:\destination"
            />
            <button 
              className="btn btn-icon"
              onClick={handleBrowse}
              disabled={!config.locationEnabled}
              title="Browse for folder"
              aria-label="Browse for destination folder"
            >
              <FolderOpen size={16} />
            </button>
          </div>
        </div>
        <div className="checkbox-wrapper">
          <input 
            type="checkbox"
            id="location-structure"
            className="checkbox"
            checked={config.locationKeepStructure}
            onChange={(e) => onChange({ locationKeepStructure: e.target.checked })}
            disabled={!config.locationEnabled}
          />
          <label htmlFor="location-structure" className="label-sm">Keep Folder Structure</label>
        </div>
      </div>
    </div>
  );
}
