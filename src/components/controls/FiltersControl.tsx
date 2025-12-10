import { RenameConfig } from '../../types';

interface FiltersControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function FiltersControl({ config, onChange }: FiltersControlProps) {
  return (
    <div className={`card ${config.filterEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >12</span>
            <h3 className="card-title">Filters</h3>
          </div>
          <div 
            className={`switch ${config.filterEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ filterEnabled: !config.filterEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">File Mask</label>
          <input 
            type="text"
            className="input"
            value={config.filterMask}
            onChange={(e) => onChange({ filterMask: e.target.value })}
            disabled={!config.filterEnabled}
            placeholder="*.* or *.txt"
          />
        </div>
        <div className="grid-2">
          <div>
            <label className="label">Min Size (bytes)</label>
            <input 
              type="number"
              className="input"
              value={config.filterMinSize}
              title="Minimum file size"
              onChange={(e) => onChange({ filterMinSize: parseInt(e.target.value) || 0 })}
              disabled={!config.filterEnabled}
              min="0"
            />
          </div>
          <div>
            <label className="label">Max Size (bytes)</label>
            <input 
              type="number"
              className="input"
              value={config.filterMaxSize}
              title="Maximum file size"
              onChange={(e) => onChange({ filterMaxSize: parseInt(e.target.value) || 0 })}
              disabled={!config.filterEnabled}
              min="0"
            />
          </div>
        </div>
        <div className="space-y-sm">
          <div className="checkbox-wrapper">
            <input 
              type="checkbox"
              id="filter-files"
              className="checkbox"
              checked={config.filterFiles}
              onChange={(e) => onChange({ filterFiles: e.target.checked })}
              disabled={!config.filterEnabled}
            />
            <label htmlFor="filter-files" className="label-sm">Include Files</label>
          </div>
          <div className="checkbox-wrapper">
            <input 
              type="checkbox"
              id="filter-folders"
              className="checkbox"
              checked={config.filterFolders}
              onChange={(e) => onChange({ filterFolders: e.target.checked })}
              disabled={!config.filterEnabled}
            />
            <label htmlFor="filter-folders" className="label-sm">Include Folders</label>
          </div>
          <div className="checkbox-wrapper">
            <input 
              type="checkbox"
              id="filter-hidden"
              className="checkbox"
              checked={config.filterHidden}
              onChange={(e) => onChange({ filterHidden: e.target.checked })}
              disabled={!config.filterEnabled}
            />
            <label htmlFor="filter-hidden" className="label-sm">Include Hidden</label>
          </div>
        </div>
      </div>
    </div>
  );
}
