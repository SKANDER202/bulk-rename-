import { RenameConfig } from '../../types';

interface DateControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function DateControl({ config, onChange }: DateControlProps) {
  return (
    <div className={`card ${config.dateEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >8</span>
            <h3 className="card-title">Auto Date</h3>
          </div>
          <div 
            className={`switch ${config.dateEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ dateEnabled: !config.dateEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Mode</label>
          <select 
            className="select" title="Select option"
            value={config.dateMode}
            onChange={(e) => onChange({ dateMode: e.target.value as any })}
            disabled={!config.dateEnabled}
          >
            <option value="prefix">Prefix</option>
            <option value="suffix">Suffix</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div>
          <label className="label">Date Type</label>
          <select 
            className="select" title="Select option"
            value={config.dateType}
            onChange={(e) => onChange({ dateType: e.target.value as any })}
            disabled={!config.dateEnabled}
          >
            <option value="modified">Modified</option>
            <option value="created">Created</option>
            <option value="accessed">Accessed</option>
            <option value="current">Current</option>
          </select>
        </div>
        <div>
          <label className="label">Format</label>
          <input 
            type="text"
            className="input"
            value={config.dateFormat}
            onChange={(e) => onChange({ dateFormat: e.target.value })}
            disabled={!config.dateEnabled}
            placeholder="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="label">Separator</label>
          <input 
            type="text"
            className="input"
            value={config.dateSeparator}
            onChange={(e) => onChange({ dateSeparator: e.target.value })}
            disabled={!config.dateEnabled}
            placeholder="_"
            maxLength={3}
          />
        </div>
      </div>
    </div>
  );
}
