import { RenameConfig } from '../../types';

interface ExtensionControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function ExtensionControl({ config, onChange }: ExtensionControlProps) {
  return (
    <div className={`card ${config.extEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >11</span>
            <h3 className="card-title">Extension</h3>
          </div>
          <div 
            className={`switch ${config.extEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ extEnabled: !config.extEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Mode</label>
          <select 
            className="select" title="Select option"
            value={config.extMode}
            onChange={(e) => onChange({ extMode: e.target.value as any })}
            disabled={!config.extEnabled}
          >
            <option value="same">Same</option>
            <option value="upper">UPPER</option>
            <option value="lower">lower</option>
            <option value="fixed">Fixed</option>
            <option value="extra">Add Extra</option>
          </select>
        </div>
        {config.extMode === 'fixed' && (
          <div>
            <label className="label">New Extension</label>
            <input 
              type="text"
              className="input"
              value={config.extFixed}
              onChange={(e) => onChange({ extFixed: e.target.value })}
              disabled={!config.extEnabled}
              placeholder=".txt"
            />
          </div>
        )}
        {config.extMode === 'extra' && (
          <div>
            <label className="label">Extra Extension</label>
            <input 
              type="text"
              className="input"
              value={config.extExtra}
              onChange={(e) => onChange({ extExtra: e.target.value })}
              disabled={!config.extEnabled}
              placeholder=".backup"
            />
          </div>
        )}
      </div>
    </div>
  );
}
