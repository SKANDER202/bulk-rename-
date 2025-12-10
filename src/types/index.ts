export interface FileItem {
  name: string;
  path: string;
  size: number;
  isDirectory: boolean;
  created: Date;
  modified: Date;
  accessed: Date;
  extension: string;
  selected?: boolean;
  newName?: string;
  status?: 'pending' | 'success' | 'error';
  error?: string;
}

export interface RenameConfig {
  // (1) RegEx
  regexEnabled: boolean;
  regexMatch: string;
  regexReplace: string;
  regexIncludeExt: boolean;
  regexSimple: boolean;
  regexV2: boolean;

  // (2) Name
  nameEnabled: boolean;
  nameMode: 'keep' | 'remove' | 'fixed' | 'reverse';
  nameFixed: string;

  // (3) Replace
  replaceEnabled: boolean;
  replaceFind: string;
  replaceWith: string;
  replaceMatchCase: boolean;

  // (4) Case
  caseEnabled: boolean;
  caseMode: 'lower' | 'upper' | 'title' | 'sentence' | 'capitalize';
  caseException: string;

  // (5) Remove
  removeEnabled: boolean;
  removeFirst: number;
  removeLast: number;
  removeFrom: number;
  removeTo: number;
  removeChars: string;
  removeWords: boolean;
  removeCrop: 'none' | 'before' | 'after';
  removeCropText: string;
  removeAccents: boolean;
  removeSymbols: boolean;
  removeDigits: boolean;
  removeTrim: boolean;

  // (6) Move/Copy Parts
  moveEnabled: boolean;
  moveMode: 'move' | 'copy';
  moveFrom: number;
  moveTo: number;
  moveLength: number;
  movePosition: number;
  moveSeparator: string;

  // (7) Add
  addEnabled: boolean;
  addPrefix: string;
  addSuffix: string;
  addInsert: string;
  addInsertAt: number;

  // (8) Auto Date
  dateEnabled: boolean;
  dateMode: 'prefix' | 'suffix' | 'both';
  dateType: 'modified' | 'created' | 'accessed' | 'current';
  dateFormat: string;
  dateSeparator: string;
  dateCustom: string;

  // (9) Append Folder Name
  folderEnabled: boolean;
  folderMode: 'prefix' | 'suffix';
  folderLevels: number;
  folderSeparator: string;

  // (10) Numbering
  numberEnabled: boolean;
  numberMode: 'prefix' | 'suffix' | 'insert' | 'replace';
  numberStart: number;
  numberIncrement: number;
  numberPad: number;
  numberPosition: number;
  numberSeparator: string;
  numberCase: 'none' | 'upper' | 'lower';

  // (11) Extension
  extEnabled: boolean;
  extMode: 'same' | 'upper' | 'lower' | 'fixed' | 'extra';
  extFixed: string;
  extExtra: string;

  // (12) Filters
  filterEnabled: boolean;
  filterMask: string;
  filterRegex: string;
  filterMatchCase: boolean;
  filterFolders: boolean;
  filterFiles: boolean;
  filterHidden: boolean;
  filterMinSize: number;
  filterMaxSize: number;
  filterSubfolders: boolean;

  // (13) Copy/Move Location
  locationEnabled: boolean;
  locationMode: 'copy' | 'move';
  locationPath: string;
  locationKeepStructure: boolean;

  // (14) Special
  specialEnabled: boolean;
  specialOrder: 'ascending' | 'descending' | 'random';
  specialAttributes: boolean;
  specialTimestamps: boolean;
  specialJS: string;
}

export interface TreeNode {
  path: string;
  name: string;
  isExpanded: boolean;
  children: TreeNode[];
  isLoaded: boolean;
}

declare global {
  interface Window {
    electronAPI: {
      getDrives: () => Promise<string[]>;
      readDirectory: (path: string) => Promise<FileItem[]>;
      selectFolder: () => Promise<string | null>;
      renameFiles: (operations: Array<{ oldPath: string; newPath: string }>) => Promise<
        Array<{ success: boolean; oldPath: string; newPath: string; error?: string }>
      >;
      undoLastRename: () => Promise<any>;
      copyFiles: (operations: Array<{ sourcePath: string; destPath: string }>) => Promise<
        Array<{ success: boolean; error?: string }>
      >;
      moveFiles: (operations: Array<{ sourcePath: string; destPath: string }>) => Promise<
        Array<{ success: boolean; error?: string }>
      >;
      getFileStats: (filePath: string) => Promise<{
        size: number;
        created: Date;
        modified: Date;
        accessed: Date;
        isDirectory: boolean;
      }>;
      savePreset: (name: string, config: any) => Promise<{ success: boolean; error?: string }>;
      loadPreset: (name: string) => Promise<{ success: boolean; config?: any; error?: string }>;
      listPresets: () => Promise<string[]>;
    };
  }
}
