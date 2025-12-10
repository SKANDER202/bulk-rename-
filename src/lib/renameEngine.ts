import { FileItem, RenameConfig } from '../types';
import { format } from 'date-fns';
import { getBasename, getDirname } from './utils';

export function applyRenameRules(
  file: FileItem,
  config: RenameConfig,
  index: number
): string {
  if (file.isDirectory && !config.filterFolders) {
    return file.name;
  }

  let baseName = getBasename(file.name, file.extension);
  let ext = file.extension;

  // (1) RegEx
  if (config.regexEnabled && config.regexMatch) {
    try {
      const flags = 'g';
      const regex = new RegExp(config.regexMatch, flags);
      const target = config.regexIncludeExt ? baseName + ext : baseName;
      const result = target.replace(regex, config.regexReplace);
      
      if (config.regexIncludeExt) {
        const lastDot = result.lastIndexOf('.');
        if (lastDot > 0) {
          baseName = result.substring(0, lastDot);
          ext = result.substring(lastDot);
        } else {
          baseName = result;
        }
      } else {
        baseName = result;
      }
    } catch (e) {
      console.error('Regex error:', e);
    }
  }

  // (2) Name
  if (config.nameEnabled) {
    switch (config.nameMode) {
      case 'remove':
        baseName = '';
        break;
      case 'fixed':
        baseName = config.nameFixed;
        break;
      case 'reverse':
        baseName = baseName.split('').reverse().join('');
        break;
      case 'keep':
      default:
        break;
    }
  }

  // (3) Replace
  if (config.replaceEnabled && config.replaceFind) {
    const flags = config.replaceMatchCase ? 'g' : 'gi';
    const escapedFind = config.replaceFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedFind, flags);
    baseName = baseName.replace(regex, config.replaceWith);
  }

  // (4) Case
  if (config.caseEnabled) {
    const exceptions = config.caseException.split(',').map(s => s.trim()).filter(Boolean);
    
    switch (config.caseMode) {
      case 'lower':
        baseName = baseName.toLowerCase();
        break;
      case 'upper':
        baseName = baseName.toUpperCase();
        break;
      case 'title':
        baseName = baseName.replace(/\w\S*/g, (txt) => {
          if (exceptions.includes(txt)) return txt;
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        break;
      case 'sentence':
        baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase();
        break;
      case 'capitalize':
        baseName = baseName.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        break;
    }
  }

  // (5) Remove
  if (config.removeEnabled) {
    if (config.removeFirst > 0) {
      baseName = baseName.substring(config.removeFirst);
    }
    if (config.removeLast > 0) {
      baseName = baseName.substring(0, baseName.length - config.removeLast);
    }
    if (config.removeFrom > 0 && config.removeTo > 0) {
      const start = config.removeFrom - 1;
      const end = config.removeTo;
      baseName = baseName.substring(0, start) + baseName.substring(end);
    }
    if (config.removeChars) {
      config.removeChars.split('').forEach(char => {
        baseName = baseName.split(char).join('');
      });
    }
    if (config.removeCrop !== 'none' && config.removeCropText) {
      const idx = baseName.indexOf(config.removeCropText);
      if (idx >= 0) {
        if (config.removeCrop === 'before') {
          baseName = baseName.substring(idx + config.removeCropText.length);
        } else if (config.removeCrop === 'after') {
          baseName = baseName.substring(0, idx);
        }
      }
    }
    if (config.removeAccents) {
      baseName = baseName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    if (config.removeSymbols) {
      baseName = baseName.replace(/[^\w\s.-]/g, '');
    }
    if (config.removeDigits) {
      baseName = baseName.replace(/\d/g, '');
    }
    if (config.removeTrim) {
      baseName = baseName.trim();
    }
  }

  // (6) Move/Copy Parts
  if (config.moveEnabled && config.moveLength > 0) {
    const start = Math.max(0, config.moveFrom - 1);
    const part = baseName.substring(start, start + config.moveLength);
    
    if (config.moveMode === 'move') {
      baseName = baseName.substring(0, start) + baseName.substring(start + config.moveLength);
    }
    
    const insertPos = Math.max(0, config.movePosition);
    baseName = baseName.substring(0, insertPos) + part + baseName.substring(insertPos);
  }

  // (7) Add
  if (config.addEnabled) {
    if (config.addPrefix) {
      baseName = config.addPrefix + baseName;
    }
    if (config.addSuffix) {
      baseName = baseName + config.addSuffix;
    }
    if (config.addInsert) {
      const pos = Math.max(0, Math.min(config.addInsertAt, baseName.length));
      baseName = baseName.substring(0, pos) + config.addInsert + baseName.substring(pos);
    }
  }

  // (8) Auto Date
  if (config.dateEnabled) {
    let dateToUse: Date;
    
    switch (config.dateType) {
      case 'created':
        dateToUse = new Date(file.created);
        break;
      case 'accessed':
        dateToUse = new Date(file.accessed);
        break;
      case 'current':
        dateToUse = new Date();
        break;
      case 'modified':
      default:
        dateToUse = new Date(file.modified);
        break;
    }

    let dateStr: string;
    try {
      dateStr = config.dateCustom || format(dateToUse, config.dateFormat);
    } catch {
      dateStr = format(dateToUse, 'yyyy-MM-dd');
    }

    const sep = config.dateSeparator;
    if (config.dateMode === 'prefix') {
      baseName = dateStr + sep + baseName;
    } else if (config.dateMode === 'suffix') {
      baseName = baseName + sep + dateStr;
    } else if (config.dateMode === 'both') {
      baseName = dateStr + sep + baseName + sep + dateStr;
    }
  }

  // (9) Append Folder Name
  if (config.folderEnabled) {
    const dirPath = getDirname(file.path);
    const parts = dirPath.split(/[\\\/]/).filter(Boolean);
    const folderParts = parts.slice(-config.folderLevels);
    const folderName = folderParts.join(config.folderSeparator);
    
    if (config.folderMode === 'prefix') {
      baseName = folderName + config.folderSeparator + baseName;
    } else {
      baseName = baseName + config.folderSeparator + folderName;
    }
  }

  // (10) Numbering
  if (config.numberEnabled) {
    const num = config.numberStart + (index * config.numberIncrement);
    let numStr = String(num).padStart(config.numberPad, '0');
    
    if (config.numberCase === 'upper') {
      numStr = numStr.toUpperCase();
    } else if (config.numberCase === 'lower') {
      numStr = numStr.toLowerCase();
    }

    const sep = config.numberSeparator;
    
    switch (config.numberMode) {
      case 'prefix':
        baseName = numStr + sep + baseName;
        break;
      case 'suffix':
        baseName = baseName + sep + numStr;
        break;
      case 'insert':
        const pos = Math.max(0, Math.min(config.numberPosition, baseName.length));
        baseName = baseName.substring(0, pos) + numStr + baseName.substring(pos);
        break;
      case 'replace':
        baseName = numStr;
        break;
    }
  }

  // (11) Extension
  if (config.extEnabled) {
    switch (config.extMode) {
      case 'upper':
        ext = ext.toUpperCase();
        break;
      case 'lower':
        ext = ext.toLowerCase();
        break;
      case 'fixed':
        ext = config.extFixed.startsWith('.') ? config.extFixed : '.' + config.extFixed;
        break;
      case 'extra':
        ext = ext + (config.extExtra.startsWith('.') ? config.extExtra : '.' + config.extExtra);
        break;
      case 'same':
      default:
        break;
    }
  }

  // (14) Special
  if (config.specialEnabled) {
    if (config.specialJS) {
      try {
        const fn = new Function('name', 'index', 'ext', config.specialJS);
        const result = fn(baseName, index, ext);
        if (typeof result === 'string') {
          baseName = result;
        }
      } catch (e) {
        console.error('JS execution error:', e);
      }
    }
  }

  return baseName + ext;
}

export function shouldIncludeFile(file: FileItem, config: RenameConfig): boolean {
  if (!config.filterEnabled) return true;

  if (file.isDirectory && !config.filterFolders) return false;
  if (!file.isDirectory && !config.filterFiles) return false;
  if (!config.filterHidden && file.name.startsWith('.')) return false;

  if (config.filterMinSize > 0 && file.size < config.filterMinSize) return false;
  if (config.filterMaxSize > 0 && file.size > config.filterMaxSize) return false;

  if (config.filterMask && config.filterMask !== '*.*') {
    const mask = config.filterMask.replace(/\*/g, '.*').replace(/\?/g, '.');
    const regex = new RegExp(`^${mask}$`, 'i');
    if (!regex.test(file.name)) return false;
  }

  if (config.filterRegex) {
    try {
      const flags = config.filterMatchCase ? '' : 'i';
      const regex = new RegExp(config.filterRegex, flags);
      if (!regex.test(file.name)) return false;
    } catch {}
  }

  return true;
}
