import { RenameConfig } from '../../types';

interface NumberingControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function NumberingControl({ config, onChange }: NumberingControlProps) {
  return (
    <div className={`card ${config.numberEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >10</span>
            <h3 className="card-title">Numbering</h3>
          </div>
          <div 
            className={`switch ${config.numberEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ numberEnabled: !config.numberEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Mode</label>
          <select 
            className="select" title="Select option"
            value={config.numberMode}
            onChange={(e) => onChange({ numberMode: e.target.value as any })}
            disabled={!config.numberEnabled}
          >
            <option value="prefix">Prefix</option>
            <option value="suffix">Suffix</option>
            <option value="insert">Insert</option>
            <option value="replace">Replace</option>
          </select>
        </div>
        <div className="grid-3">
          <div>
            <label className="label">Start</label>
            <input 
              type="number"
              className="input"
              value={config.numberStart}
              title="Starting number"
              onChange={(e) => onChange({ numberStart: parseInt(e.target.value) || 1 })}
              disabled={!config.numberEnabled}
            />
          </div>
          <div>
            <label className="label">Inc</label>
            <input 
              type="number"
              className="input"
              value={config.numberIncrement}
              title="Increment by"
              onChange={(e) => onChange({ numberIncrement: parseInt(e.target.value) || 1 })}
              disabled={!config.numberEnabled}
            />
          </div>
          <div>
            <label className="label">Pad</label>
            <input 
              type="number"
              className="input"
              value={config.numberPad}
              title="Zero padding"
              onChange={(e) => onChange({ numberPad: parseInt(e.target.value) || 1 })}
              disabled={!config.numberEnabled}
              min="1"
              max="10"
            />
          </div>
        </div>
        <div>
          <label className="label">Separator</label>
          <input 
            type="text"
            className="input"
            value={config.numberSeparator}
            onChange={(e) => onChange({ numberSeparator: e.target.value })}
            disabled={!config.numberEnabled}
            placeholder="_"
            maxLength={3}
          />
        </div>
      </div>
    </div>
  );
}
