import { RenameConfig } from '../../types';

interface FolderControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function FolderControl({ config, onChange }: FolderControlProps) {
  return (
    <div className={`card ${config.folderEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >9</span>
            <h3 className="card-title">Folder Name</h3>
          </div>
          <div 
            className={`switch ${config.folderEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ folderEnabled: !config.folderEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Mode</label>
          <select 
            className="select" title="Select option"
            value={config.folderMode}
            onChange={(e) => onChange({ folderMode: e.target.value as any })}
            disabled={!config.folderEnabled}
          >
            <option value="prefix">Prefix</option>
            <option value="suffix">Suffix</option>
          </select>
        </div>
        <div>
          <label className="label">Levels</label>
          <input 
            type="number"
            className="input"
            value={config.folderLevels}
            title="Number of folder levels"
            onChange={(e) => onChange({ folderLevels: parseInt(e.target.value) || 1 })}
            disabled={!config.folderEnabled}
            min="1"
            max="5"
          />
        </div>
        <div>
          <label className="label">Separator</label>
          <input 
            type="text"
            className="input"
            value={config.folderSeparator}
            onChange={(e) => onChange({ folderSeparator: e.target.value })}
            disabled={!config.folderEnabled}
            placeholder="_"
            maxLength={3}
          />
        </div>
      </div>
    </div>
  );
}
