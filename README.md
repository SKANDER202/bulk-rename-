# Bulk Rename Modern

A modern, professional desktop application for batch file renaming with comprehensive features inspired by Bulk Rename Utility, built with Electron, React, TypeScript, and TailwindCSS.

## Features

### Complete Renaming Modules (1-14)

1. **RegEx** - Pattern matching and replacement with regex support
2. **Name** - Keep, remove, fixed, or reverse filenames
3. **Replace** - Find and replace text with case sensitivity options
4. **Case** - Change case (lower, upper, title, sentence, capitalize)
5. **Remove** - Remove characters from specific positions or patterns
6. **Move/Copy Parts** - Move or copy segments within filenames
7. **Add** - Add prefix, suffix, or insert text at positions
8. **Auto Date** - Add timestamps from file dates or current date
9. **Append Folder Name** - Include parent folder names
10. **Numbering** - Add sequential numbers with padding
11. **Extension** - Modify file extensions
12. **Filters** - Filter files by mask, regex, size, type
13. **Copy/Move Location** - Copy or move files to different locations
14. **Special** - Advanced options including JavaScript execution

### Core Features

- **Live Preview** - See all changes before applying
- **Multi-Selection** - Select multiple files with checkboxes
- **Directory Tree** - Navigate folder structure
- **Undo Support** - Revert last rename operation
- **Preset Management** - Save and load configuration presets
- **Activity Log** - JSON log of all rename operations
- **Cross-Platform** - Works on Windows, macOS, and Linux

## Tech Stack

- **Electron** - Desktop application framework
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **React Query** - Async state management
- **Lucide Icons** - Modern icon library
- **date-fns** - Date formatting

## Installation

### Prerequisites

- Node.js 18+ and npm
- Windows, macOS, or Linux

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Development mode:**
```bash
npm run dev
```

This starts both the Vite dev server and Electron in development mode.

### Building

Build for your current platform:

```bash
npm run build
```

Build for specific platforms:

```bash
npm run build:win    # Windows (NSIS installer)
npm run build:mac    # macOS (DMG)
npm run build:linux  # Linux (AppImage, deb)
```

Output files will be in the `release/` directory.

## Project Structure

```
├── electron/
│   ├── main.ts          # Electron main process
│   └── preload.ts       # Preload script for IPC
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── controls/    # Renaming control modules (1-14)
│   │   ├── Toolbar.tsx
│   │   ├── DirectoryTree.tsx
│   │   ├── FileList.tsx
│   │   ├── ControlsPanel.tsx
│   │   └── ActionButtons.tsx
│   ├── lib/
│   │   ├── renameEngine.ts  # Core renaming logic
│   │   ├── config.ts        # Default configuration
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   └── index.ts     # TypeScript interfaces
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Usage

### Basic Workflow

1. **Select Directory** - Use the folder tree or navigation bar
2. **Select Files** - Check files you want to rename
3. **Configure Rules** - Enable and configure renaming modules
4. **Preview** - See the new names in the "New Name" column
5. **Rename** - Click "Rename" to apply changes
6. **Undo** - Click "Revert" if needed

### Module Examples

**Numbering:**
- Enable module (10)
- Set start number: 1
- Set increment: 1
- Set padding: 3
- Choose mode: Prefix/Suffix
- Result: `001_filename.txt`, `002_filename.txt`

**Date Stamping:**
- Enable module (8)
- Choose date type: Modified/Created/Current
- Set format: `yyyy-MM-dd`
- Set mode: Prefix
- Result: `2025-12-08_filename.txt`

**Case Change + Replace:**
- Enable module (4): Lower case
- Enable module (3): Replace " " with "_"
- Result: `my_file_name.txt`

### Saving Presets

1. Configure all desired renaming rules
2. Click "Save Preset"
3. Enter a name
4. Load anytime from "Load Preset" dropdown

## API Documentation

### Electron IPC Channels

The app uses these IPC channels for file operations:

- `get-drives` - List available drives
- `read-directory` - Read directory contents
- `select-folder` - Open folder picker dialog
- `rename-files` - Execute batch rename
- `undo-last-rename` - Revert last operation
- `copy-files` - Copy files to location
- `move-files` - Move files to location
- `save-preset` - Save configuration preset
- `load-preset` - Load configuration preset
- `list-presets` - List all saved presets

### Configuration Object

All renaming rules are stored in a single `RenameConfig` object with properties for each of the 14 modules. See `src/types/index.ts` for the complete interface.

## Development

### Adding New Features

1. **New Renaming Module:**
   - Add properties to `RenameConfig` in `src/types/index.ts`
   - Update `getDefaultConfig()` in `src/lib/config.ts`
   - Add logic to `applyRenameRules()` in `src/lib/renameEngine.ts`
   - Create control component in `src/components/controls/`
   - Import in `ControlsPanel.tsx`

2. **New IPC Channel:**
   - Add handler in `electron/main.ts`
   - Add method to API in `electron/preload.ts`
   - Update `Window` interface in `src/types/index.ts`

### Code Style

- Use TypeScript for type safety
- Follow React hooks best practices
- Use Tailwind utility classes for styling
- Keep components focused and reusable
- Use React Query for async operations

## Troubleshooting

### Dev Mode Issues

**Port 5173 already in use:**
```bash
# Kill the process using port 5173
npx kill-port 5173
npm run dev
```

**Electron won't start:**
- Make sure `npm run build:electron` completes successfully
- Check console for TypeScript errors

### Build Issues

**Missing dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails on Linux:**
- Install required dependencies: `sudo apt-get install -y libgtk-3-dev libnotify-dev`

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Inspired by [Bulk Rename Utility](https://www.bulkrenameutility.co.uk/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
