export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function getPathSeparator(): string {
  return navigator.platform.indexOf('Win') > -1 ? '\\' : '/';
}

export function joinPath(...parts: string[]): string {
  const sep = getPathSeparator();
  return parts.join(sep).replace(/[\\\/]+/g, sep);
}

export function getBasename(filePath: string, ext?: string): string {
  const sep = getPathSeparator();
  const name = filePath.split(sep).pop() || '';
  if (ext && name.endsWith(ext)) {
    return name.slice(0, -ext.length);
  }
  return name;
}

export function getDirname(filePath: string): string {
  const sep = getPathSeparator();
  const parts = filePath.split(sep);
  parts.pop();
  return parts.join(sep) || sep;
}

export function getExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot > 0 ? filename.substring(lastDot) : '';
}
