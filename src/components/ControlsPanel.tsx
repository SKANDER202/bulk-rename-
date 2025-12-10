import { RenameConfig } from '../types';
import { RegexControl } from './controls/RegexControl';
import { NameControl } from './controls/NameControl';
import { ReplaceControl } from './controls/ReplaceControl';
import { CaseControl } from './controls/CaseControl';
import { RemoveControl } from './controls/RemoveControl';
import { MoveControl } from './controls/MoveControl';
import { AddControl } from './controls/AddControl';
import { DateControl } from './controls/DateControl';
import { FolderControl } from './controls/FolderControl';
import { NumberingControl } from './controls/NumberingControl';
import { ExtensionControl } from './controls/ExtensionControl';
import { FiltersControl } from './controls/FiltersControl';
import { LocationControl } from './controls/LocationControl';
import { SpecialControl } from './controls/SpecialControl';

interface ControlsPanelProps {
  config: RenameConfig;
  onChange: (updates: Partial<RenameConfig>) => void;
}

export function ControlsPanel({ config, onChange }: ControlsPanelProps) {
  return (
    <div className="controls-grid">
      <RegexControl config={config} onChange={onChange} />
      <NameControl config={config} onChange={onChange} />
      <ReplaceControl config={config} onChange={onChange} />
      <CaseControl config={config} onChange={onChange} />
      <RemoveControl config={config} onChange={onChange} />
      <MoveControl config={config} onChange={onChange} />
      <AddControl config={config} onChange={onChange} />
      <DateControl config={config} onChange={onChange} />
      <FolderControl config={config} onChange={onChange} />
      <NumberingControl config={config} onChange={onChange} />
      <ExtensionControl config={config} onChange={onChange} />
      <FiltersControl config={config} onChange={onChange} />
      <LocationControl config={config} onChange={onChange} />
      <SpecialControl config={config} onChange={onChange} />
    </div>
  );
}
