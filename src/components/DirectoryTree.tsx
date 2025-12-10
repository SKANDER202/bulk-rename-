import { useState, useEffect } from 'react';
import { HardDrive, Folder, ChevronRight, ChevronDown } from 'lucide-react';

interface TreeNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: TreeNode[];
  isExpanded?: boolean;
}

interface DirectoryTreeProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

export function DirectoryTree({ currentPath, onPathChange }: DirectoryTreeProps) {
  const [drives, setDrives] = useState<TreeNode[]>([]);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadDrives();
  }, []);

  const loadDrives = async () => {
    const driveList = await window.electronAPI.getDrives();
    const driveNodes: TreeNode[] = driveList.map(drive => ({
      name: drive,
      path: drive,
      isDirectory: true,
      children: []
    }));
    setDrives(driveNodes);
  };

  const loadChildren = async (node: TreeNode) => {
    try {
      const items = await window.electronAPI.readDirectory(node.path);
      const folders = items.filter(item => item.isDirectory);
      node.children = folders.map(folder => ({
        name: folder.name,
        path: folder.path,
        isDirectory: true,
        children: []
      }));
    } catch (error) {
      node.children = [];
    }
  };

  const toggleExpand = async (node: TreeNode) => {
    const newExpanded = new Set(expandedPaths);
    
    if (newExpanded.has(node.path)) {
      newExpanded.delete(node.path);
    } else {
      newExpanded.add(node.path);
      if (!node.children || node.children.length === 0) {
        await loadChildren(node);
        setDrives([...drives]);
      }
    }
    
    setExpandedPaths(newExpanded);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedPaths.has(node.path);
    const isActive = currentPath.startsWith(node.path);
    
    return (
      <div key={node.path}>
        <div 
          className={`tree-item tree-level-${Math.min(level, 9)} ${isActive ? 'active' : ''}`}
          onClick={() => onPathChange(node.path)}
        >
          <span onClick={(e) => { e.stopPropagation(); toggleExpand(node); }} className="cursor-pointer">
            {node.children && node.children.length >= 0 ? (
              isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : <span className="w-16" />}
          </span>
          {level === 0 ? <HardDrive size={16} /> : <Folder size={16} />}
          <span>{node.name}</span>
        </div>
        
        {isExpanded && node.children && (
          <div className="tree-children">
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-sidebar">
      {drives.map(drive => renderNode(drive))}
    </div>
  );
}
