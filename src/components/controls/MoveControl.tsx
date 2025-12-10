import { RenameConfig } from '../../types';

interface MoveControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function MoveControl({ config, onChange }: MoveControlProps) {
  return (
    <div className={`card ${config.moveEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >6</span>
            <h3 className="card-title">Move</h3>
          </div>
          <div 
            className={`switch ${config.moveEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ moveEnabled: !config.moveEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Mode</label>
          <select 
            className="select" title="Select option"
            value={config.moveMode}
            onChange={(e) => onChange({ moveMode: e.target.value as any })}
            disabled={!config.moveEnabled}
          >
            <option value="move">Move</option>
            <option value="copy">Copy</option>
          </select>
        </div>
        <div className="grid-3">
          <div>
            <label className="label">From</label>
            <input 
              type="number"
              className="input"
              value={config.moveFrom}
              title="From position"
              onChange={(e) => onChange({ moveFrom: parseInt(e.target.value) || 0 })}
              disabled={!config.moveEnabled}
            />
          </div>
          <div>
            <label className="label">Length</label>
            <input 
              type="number"
              className="input"
              value={config.moveLength}
              title="Length to move"
              onChange={(e) => onChange({ moveLength: parseInt(e.target.value) || 1 })}
              disabled={!config.moveEnabled}
              min="1"
            />
          </div>
          <div>
            <label className="label">To</label>
            <input 
              type="number"
              className="input"
              value={config.moveTo}
              title="To position"
              onChange={(e) => onChange({ moveTo: parseInt(e.target.value) || 0 })}
              disabled={!config.moveEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
