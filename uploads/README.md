# DevHabitat

**One habitat for all your projects** — a Windows desktop app with a project
explorer, a real code editor, integrated CMD/PowerShell terminals and a
one-click localhost runner.

<!-- Replace YOUR-USERNAME with your GitHub username after publishing (see PUBLISHING.md) -->
[![Download for Windows](https://img.shields.io/badge/%E2%AC%87%EF%B8%8F%20Download-Windows%20x64-2ec4a6?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/YOUR-USERNAME/DevHabitat/releases/latest/download/DevHabitat-Setup.exe)
[![Latest release](https://img.shields.io/github/v/release/YOUR-USERNAME/DevHabitat?style=for-the-badge)](https://github.com/YOUR-USERNAME/DevHabitat/releases/latest)

Built with Electron, the **Monaco editor** (the exact editor engine inside
VS Code) and **xterm.js + node-pty** (the terminal combo used by VS Code /
Hyper), so you get a genuinely VS-Code-grade editing and terminal experience.

![icon](assets/icon.png)

---

## What's inside

| Area | Features |
|---|---|
| **Projects** | Add existing folders, create new projects from starter templates (static site, Node server, Python server), pin projects, drag & drop a folder onto the window to add it |
| **File explorer** | Full file tree with right-click: new file/folder, rename, delete (to recycle bin), reveal in Explorer, copy path, "new terminal here". Noise folders (`node_modules`, `.git`, `dist`, …) auto-hidden |
| **Code editor** | Monaco: syntax highlighting for **80+ languages** (JS/TS, Python, Java, C/C++, C#, Go, Rust, PHP, Ruby, HTML/CSS, SQL, YAML…), tabs, dirty markers, minimap, multi-cursor, find/replace, bracket colorization, manual language override in the status bar |
| **Terminals** | Real CMD or PowerShell tabs (your choice), resizable panel, clickable links, unlimited concurrent terminals, rename (double-click tab), per-folder terminals. **No compiler needed:** the full interactive terminal runs on `node-pty`'s *prebuilt* binaries via your installed Node; if anything is unavailable it transparently switches to a built-in basic terminal (still runs servers & commands fine) |
| **Run & localhost** | `F5` analyzes the project — `package.json` scripts (auto `npm install` prefix if needed), Python (`app.py`, `main.py`, Django), static sites, Go, Rust, PHP, .NET — and runs it in a terminal. Any `localhost:PORT` the server prints is detected and shown as a **clickable port chip** that opens your browser |
| **Search** | Project-wide search (`Ctrl+Shift+F`) with match-case toggle, grouped results, click-to-jump |
| **TODO scanner** | Finds every `TODO`, `FIXME`, `HACK`, `BUG`, `XXX` comment in the project |
| **Git** | Branch + changed-files panel, click a file to open it, one-click `git init` |
| **Notes** | Per-project scratch notes, auto-saved |
| **Quick open** | `Ctrl+P` fuzzy file finder |
| **Quality of life** | Session restore (reopens your tabs per project), recent files, unsaved-changes guard on close/quit, resizable everything |

---

## Requirements (Windows)

- **Windows 10/11** (also runs on Linux/macOS)
- **Node.js LTS** (18+) — https://nodejs.org

That's it. **No Visual Studio / C++ build tools are required** — the
terminal uses prebuilt binaries and has a built-in compiler-free fallback.

## Run it (developer mode)

Open a terminal in this folder:

```bat
npm install
npm start
```

### If a previous install failed (one-time recovery)

If you tried an older version and saw `node-gyp failed to rebuild …` or
`Electron failed to install correctly`, wipe the half-installed state and
reinstall with this version (which needs no compilers):

```bat
rmdir /s /q node_modules
del package-lock.json
npm install
npm start
```

> The old errors happen because (a) rebuilding native modules needs the
> MSVC toolchain and (b) Electron's binary download was interrupted or
> blocked (often by antivirus — check Windows Security → Protection
> history if it happens again, and allow `electron.exe`).

## Build a real Windows app (.exe)

```bat
npm run dist
```

Produces in `dist\`:

- **`DevHabitat Setup 1.0.0.exe`** — a proper installer (Start-menu entry, desktop shortcut, custom icon)
- **`DevHabitat-1.0.0.exe`** — a portable build you can run without installing

> Optional (much faster next builds): `npm install --save-dev electron-builder-squirrel-windows` isn't needed; NSIS is included.

## Troubleshooting

**`Electron failed to install correctly, please delete node_modules/electron`**

Electron's binary didn't finish installing. Fix with:

```bat
rmdir /s /q node_modules\electron
npm install
```

If the download keeps failing (slow/blocked network or antivirus), try
again with an alternative mirror:

```bat
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
npm install
```

**`node-gyp failed to rebuild … node-pty` (old installs)**

Outdated since v1.1 — DevHabitat no longer compiles anything. Do the
one-time recovery above and the error disappears.

**Terminal tab says "(basic)"**

You're on the compiler-free fallback terminal: it runs servers, builds
and normal commands (typed input, Backspace, ↑/↓ history, Ctrl+C to stop
& reset). The full interactive mode (interactive CLIs, arrow-key
menus) activates automatically when the `node-pty` helper can load —
usually just by having Node.js installed.

**Nothing happens / blank window**
Make sure you ran `npm install` (Monaco and xterm load from `node_modules`).

**Monaco's TypeScript/JSON smarts don't activate**
Web workers are restricted on `file://`; the app falls back gracefully —
highlighting and editing always work.

---

## Keyboard shortcuts

| Keys | Action |
|---|---|
| `Ctrl + Shift + O` | Add project folder |
| `Ctrl + Shift + N` | New project (from template) |
| `Ctrl + P` | Quick open file |
| `Ctrl + S` | Save |
| `Ctrl + Shift + F` | Search in files |
| `F5` | Run project |
| `Ctrl + `` ` `` | Toggle terminal |
| `Ctrl + Shift + `` ` `` | New terminal |
| `Ctrl + B` | Toggle sidebar |

## Where is my data?

- Your projects stay wherever they already live on disk — DevHabitat only
  *references* their folders (removing a project from the app never deletes files).
- App state (project list, open tabs, notes) lives in
  `%APPDATA%\devhabitat\habitat-store.json`.

## Project structure

```
DevHabitat/
├─ main/
│  ├─ main.js        # Electron main: window, store, fs, search, git, pty host
│  └─ preload.js     # safe contextBridge API
├─ renderer/
│  ├─ index.html     # layout
│  ├─ styles.css     # dark theme
│  └─ js/            # util, ui, projects, editor, terminal, panels, app
├─ assets/           # icon.png / icon.ico
└─ package.json      # scripts + electron-builder config
```
