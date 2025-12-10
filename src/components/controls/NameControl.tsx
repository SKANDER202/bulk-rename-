import { RenameConfig } from '../../types';

interface NameControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function NameControl({ config, onChange }: NameControlProps) {
  return (
    <div className={`card ${config.nameEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >2</span>
            <h3 className="card-title">Name</h3>
          </div>
          <div 
            className={`switch ${config.nameEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ nameEnabled: !config.nameEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Mode</label>
          <select 
            className="select" title="Select option"
            value={config.nameMode}
            onChange={(e) => onChange({ nameMode: e.target.value as any })}
            disabled={!config.nameEnabled}
          >
            <option value="keep">Keep</option>
            <option value="remove">Remove</option>
            <option value="fixed">Fixed</option>
            <option value="reverse">Reverse</option>
          </select>
        </div>
        {config.nameMode === 'fixed' && (
          <div>
            <label className="label">Fixed Name</label>
            <input 
              type="text"
              className="input"
              value={config.nameFixed}
              onChange={(e) => onChange({ nameFixed: e.target.value })}
              disabled={!config.nameEnabled}
              placeholder="new_name"
            />
          </div>
        )}
      </div>
    </div>
  );
}
