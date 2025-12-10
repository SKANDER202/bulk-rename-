import { RenameConfig } from '../../types';

interface AddControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function AddControl({ config, onChange }: AddControlProps) {
  return (
    <div className={`card ${config.addEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >7</span>
            <h3 className="card-title">Add</h3>
          </div>
          <div 
            className={`switch ${config.addEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ addEnabled: !config.addEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Prefix</label>
          <input 
            type="text"
            className="input"
            value={config.addPrefix}
            onChange={(e) => onChange({ addPrefix: e.target.value })}
            disabled={!config.addEnabled}
            placeholder="prefix_"
          />
        </div>
        <div>
          <label className="label">Suffix</label>
          <input 
            type="text"
            className="input"
            value={config.addSuffix}
            onChange={(e) => onChange({ addSuffix: e.target.value })}
            disabled={!config.addEnabled}
            placeholder="_suffix"
          />
        </div>
        <div className="grid-2">
          <div>
            <label className="label">Insert Text</label>
            <input 
              type="text"
              className="input"
              value={config.addInsert}
              onChange={(e) => onChange({ addInsert: e.target.value })}
              disabled={!config.addEnabled}
              placeholder="text"
            />
          </div>
          <div>
            <label className="label">At Position</label>
            <input 
              type="number"
              className="input"
              value={config.addInsertAt}
              onChange={(e) => onChange({ addInsertAt: parseInt(e.target.value) || 0 })}
              title="Position to insert text at"
              disabled={!config.addEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
