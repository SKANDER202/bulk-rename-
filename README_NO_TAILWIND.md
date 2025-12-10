# Bulk Rename Utility - Modern Edition

A complete desktop application that replicates Bulk Rename Utility with modern Fluent UI / Windows 11 styling using **pure CSS** (no TailwindCSS).

## ✨ Features

All 14 renaming modules from the original Bulk Rename Utility:

1. **RegEx** - Pattern matching and replacement
2. **Name** - Keep, remove, fixed, or reverse names
3. **Replace** - Simple find and replace text
4. **Case** - Change case (lower, UPPER, Title, Sentence, Capitalize)
5. **Remove** - Remove first/last n chars, specific characters, accents, symbols
6. **Move** - Move or copy text segments within filename
7. **Add** - Add prefix, suffix, or insert text at position
8. **Auto Date** - Add file dates (modified/created/accessed/current)
9. **Folder Name** - Append parent folder name
10. **Numbering** - Add sequential numbers with padding
11. **Extension** - Change extension case or replace
12. **Filters** - Filter by mask, size, type (files/folders/hidden)
13. **Copy/Move Location** - Copy or move files to new location
14. **Special** - Sort order and JavaScript custom renaming

## 🎨 Design

- Modern Windows 11 / Fluent UI styling
- Pure CSS (NO Tailwind, NO shadcn/ui)
- Clean, professional interface with soft shadows
- Slightly rounded corners
- Custom scrollbars
- Responsive controls grid

## 🛠 Tech Stack

- **Electron 28** - Desktop framework
- **React 18** - UI framework  
- **TypeScript 5** - Type safety
- **Vite 5** - Fast build tool
- **Pure CSS** - No CSS frameworks
- **React Query** - Async state management
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 📦 Installation

```bash
npm install
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

Then in another terminal, build and run Electron:

```bash
npm run dev:electron
```

Open http://localhost:5173 in your browser to see the UI.

## 🏗 Build

Build for your platform:

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux  
npm run build:linux
```

## 📁 Project Structure

```
├── electron/
│   ├── main.ts          # Main process with IPC handlers
│   └── preload.ts       # Context bridge API
├── src/
│   ├── components/
│   │   ├── controls/    # 14 renaming modules
│   │   ├── ActionButtons.tsx
│   │   ├── ControlsPanel.tsx
│   │   ├── DirectoryTree.tsx
│   │   ├── FileList.tsx
│   │   └── Toolbar.tsx
│   ├── lib/
│   │   ├── config.ts    # Default configuration
│   │   ├── renameEngine.ts  # Core renaming logic
│   │   └── utils.ts     # Helper functions
│   ├── types/
│   │   └── index.ts     # TypeScript interfaces
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   └── index.css        # Pure CSS styles
└── package.json
```

## 🎯 Usage

1. **Select Folder** - Use toolbar to navigate or browse
2. **Select Files** - Check files to rename
3. **Configure Modules** - Enable and configure any of the 14 modules
4. **Preview** - See live preview in the "New Name" column
5. **Rename** - Click "Rename" button to apply changes
6. **Undo** - Use "Revert Last" to undo if needed

## 🎨 CSS Architecture

All styling is in `src/index.css`:

- CSS custom properties (variables) for theming
- No CSS-in-JS, no utility classes
- Semantic class names
- Fluent UI color scheme
- Windows 11 design language

## 📝 License

MIT

---

**Built without TailwindCSS** ✨
