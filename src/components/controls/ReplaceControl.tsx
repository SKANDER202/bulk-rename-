import { RenameConfig } from '../../types';

interface ReplaceControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function ReplaceControl({ config, onChange }: ReplaceControlProps) {
  return (
    <div className={`card ${config.replaceEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >3</span>
            <h3 className="card-title">Replace</h3>
          </div>
          <div 
            className={`switch ${config.replaceEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ replaceEnabled: !config.replaceEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Find</label>
          <input 
            type="text"
            className="input"
            value={config.replaceFind}
            onChange={(e) => onChange({ replaceFind: e.target.value })}
            disabled={!config.replaceEnabled}
            placeholder="text to find"
          />
        </div>
        <div>
          <label className="label">Replace With</label>
          <input 
            type="text"
            className="input"
            value={config.replaceWith}
            onChange={(e) => onChange({ replaceWith: e.target.value })}
            disabled={!config.replaceEnabled}
            placeholder="replacement"
          />
        </div>
        <div className="checkbox-wrapper">
          <input 
            type="checkbox"
            id="replace-case"
            className="checkbox"
            checked={config.replaceMatchCase}
            onChange={(e) => onChange({ replaceMatchCase: e.target.checked })}
            disabled={!config.replaceEnabled}
          />
          <label htmlFor="replace-case" className="label-sm">Match Case</label>
        </div>
      </div>
    </div>
  );
}
