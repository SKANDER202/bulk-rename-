import { RenameConfig } from '../../types';

interface SpecialControlProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function SpecialControl({ config, onChange }: SpecialControlProps) {
  return (
    <div className={`card ${config.specialEnabled ? 'enabled' : ''}`}>
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="badge" >14</span>
            <h3 className="card-title">Special</h3>
          </div>
          <div 
            className={`switch ${config.specialEnabled ? 'checked' : ''}`}
            onClick={() => onChange({ specialEnabled: !config.specialEnabled })}
          />
        </div>
      </div>
      <div className="card-content space-y-md">
        <div>
          <label className="label">Sort Order</label>
          <select 
            className="select" title="Select option"
            value={config.specialOrder}
            onChange={(e) => onChange({ specialOrder: e.target.value as any })}
            disabled={!config.specialEnabled}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="random">Random</option>
          </select>
        </div>
        <div>
          <label className="label">JavaScript (Advanced)</label>
          <textarea 
            className="textarea font-mono textarea-xs"
            value={config.specialJS}
            onChange={(e) => onChange({ specialJS: e.target.value })}
            disabled={!config.specialEnabled}
            placeholder="return name + '_custom';"
            rows={3}
          />
          <p className="text-xs text-muted mt-xs">
            Variables: name, index, ext
          </p>
        </div>
      </div>
    </div>
  );
}
