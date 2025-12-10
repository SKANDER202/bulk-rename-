import { FileIcon, FolderIcon, CheckSquare, Square } from 'lucide-react';
import { FileItem, RenameConfig } from '../types';
import { applyRenameRules, shouldIncludeFile } from '../lib/renameEngine';
import { formatFileSize, formatDate } from '../lib/utils';

interface FileListProps {
  files: FileItem[];
  config: RenameConfig;
  onSelectionChange: (files: FileItem[]) => void;
}

export function FileList({ files, config, onSelectionChange }: FileListProps) {
  const selectedCount = files.filter(f => f.selected).length;

  const toggleSelectAll = () => {
    const newSelected = selectedCount < files.length;
    onSelectionChange(files.map(f => ({ ...f, selected: newSelected && shouldIncludeFile(f, config) })));
  };

  const toggleSelect = (index: number) => {
    const updated = [...files];
    updated[index].selected = !updated[index].selected;
    onSelectionChange(updated);
  };

  return (
    <table className="file-table">
      <thead>
        <tr>
          <th className="th-checkbox">
            <div className="cursor-pointer" onClick={toggleSelectAll} role="button" tabIndex={0}>
              {selectedCount > 0 ? <CheckSquare size={16} /> : <Square size={16} />}
            </div>
          </th>
          <th className="th-icon"></th>
          <th>Current Name</th>
          <th>New Name</th>
          <th className="th-size">Size</th>
          <th className="th-modified">Modified</th>
          <th className="th-status">Status</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => {
          const isIncluded = shouldIncludeFile(file, config);
          const selectedBeforeThis = files.slice(0, index).filter(f => f.selected && shouldIncludeFile(f, config)).length;
          const newName = isIncluded && file.selected ? applyRenameRules(file, config, selectedBeforeThis) : file.name;
          const hasChanges = newName !== file.name;
          
          return (
            <tr key={file.path} className={file.selected ? 'selected' : ''}>
              <td>
                <input 
                  type="checkbox" 
                  className="checkbox"
                  checked={file.selected || false}
                  onChange={() => toggleSelect(index)}
                  disabled={!isIncluded}
                  title={`Select ${file.name}`}
                  aria-label={`Select ${file.name}`}
                />
              </td>
              <td>
                {file.isDirectory ? <FolderIcon size={16} /> : <FileIcon size={16} />}
              </td>
              <td>{file.name}</td>
              <td className={`new-name-cell ${hasChanges ? 'changed' : ''}`}>
                {newName}
              </td>
              <td className="text-sm text-muted">{!file.isDirectory && formatFileSize(file.size)}</td>
              <td className="text-sm text-muted">{formatDate(file.modified)}</td>
              <td>
                {hasChanges && file.selected && (
                  <span className="badge badge-warning">Ready</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
