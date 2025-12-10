import { RenameConfig } from '../../types';

interface RegexControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function RegexControl({ config, onChange }: RegexControlProps) {
  return (
    <div className={`card ${config.regexEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >1</span>
            <h3 className="card-title">RegEx</h3>
          </div>
          <div 
            className={`switch ${config.regexEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ regexEnabled: !config.regexEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Match Pattern</label>
          <input 
            type="text"
            className="input"
            value={config.regexMatch}
            onChange={(e) => onChange({ regexMatch: e.target.value })}
            disabled={!config.regexEnabled}
            placeholder="(.*)"
          />
        </div>
        <div>
          <label className="label">Replace With</label>
          <input 
            type="text"
            className="input"
            value={config.regexReplace}
            onChange={(e) => onChange({ regexReplace: e.target.value })}
            disabled={!config.regexEnabled}
            placeholder="$1"
          />
        </div>
        <div className="checkbox-wrapper">
          <input 
            type="checkbox"
            id="regex-ext"
            className="checkbox"
            checked={config.regexIncludeExt}
            onChange={(e) => onChange({ regexIncludeExt: e.target.checked })}
            disabled={!config.regexEnabled}
          />
          <label htmlFor="regex-ext" className="label-sm">Include Extension</label>
        </div>
      </div>
    </div>
  );
}
