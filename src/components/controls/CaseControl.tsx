import { RenameConfig } from '../../types';

interface CaseControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function CaseControl({ config, onChange }: CaseControlProps) {
  return (
    <div className={`card ${config.caseEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >4</span>
            <h3 className="card-title">Case</h3>
          </div>
          <div 
            className={`switch ${config.caseEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ caseEnabled: !config.caseEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Mode</label>
          <select 
            className="select" title="Select option"
            value={config.caseMode}
            onChange={(e) => onChange({ caseMode: e.target.value as any })}
            disabled={!config.caseEnabled}
          >
            <option value="lower">lower case</option>
            <option value="upper">UPPER CASE</option>
            <option value="title">Title Case</option>
            <option value="sentence">Sentence case</option>
            <option value="capitalize">Capitalize Words</option>
          </select>
        </div>
        <div>
          <label className="label">Exceptions (comma-separated)</label>
          <input 
            type="text"
            className="input"
            value={config.caseException}
            onChange={(e) => onChange({ caseException: e.target.value })}
            disabled={!config.caseEnabled}
            placeholder="a, an, the, of"
          />
        </div>
      </div>
    </div>
  );
}
