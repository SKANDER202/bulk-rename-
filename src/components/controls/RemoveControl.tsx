import { RenameConfig } from '../../types';

interface RemoveControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function RemoveControl({ config, onChange }: RemoveControlProps) {
  return (
    <div className={`card ${config.removeEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >5</span>
            <h3 className="card-title">Remove</h3>
          </div>
          <div 
            className={`switch ${config.removeEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ removeEnabled: !config.removeEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div className="grid-2">
          <div>
            <label className="label">First n Chars</label>
            <input 
              type="number"
              className="input"
              value={config.removeFirst}
              onChange={(e) => onChange({ removeFirst: parseInt(e.target.value) || 0 })}
              title="Number of characters to remove from start"
              disabled={!config.removeEnabled}
              min="0"
            />
          </div>
          <div>
            <label className="label">Last n Chars</label>
            <input 
              type="number"
              className="input"
              value={config.removeLast}
              onChange={(e) => onChange({ removeLast: parseInt(e.target.value) || 0 })}
              title="Number of characters to remove from end"
              disabled={!config.removeEnabled}
              min="0"
            />
          </div>
        </div>
        <div>
          <label className="label">Characters to Remove</label>
          <input 
            type="text"
            className="input"
            value={config.removeChars}
            onChange={(e) => onChange({ removeChars: e.target.value })}
            disabled={!config.removeEnabled}
            placeholder="-_[]"
          />
        </div>
        <div className="space-y-sm">
          <div className="checkbox-wrapper">
            <input 
              type="checkbox"
              id="remove-accents"
              className="checkbox"
              checked={config.removeAccents}
              onChange={(e) => onChange({ removeAccents: e.target.checked })}
              disabled={!config.removeEnabled}
            />
            <label htmlFor="remove-accents" className="label-sm">Remove Accents</label>
          </div>
          <div className="checkbox-wrapper">
            <input 
              type="checkbox"
              id="remove-symbols"
              className="checkbox"
              checked={config.removeSymbols}
              onChange={(e) => onChange({ removeSymbols: e.target.checked })}
              disabled={!config.removeEnabled}
            />
            <label htmlFor="remove-symbols" className="label-sm">Remove Symbols</label>
          </div>
          <div className="checkbox-wrapper">
            <input 
              type="checkbox"
              id="remove-trim"
              className="checkbox"
              checked={config.removeTrim}
              onChange={(e) => onChange({ removeTrim: e.target.checked })}
              disabled={!config.removeEnabled}
            />
            <label htmlFor="remove-trim" className="label-sm">Trim Whitespace</label>
          </div>
        </div>
      </div>
    </div>
  );
}
