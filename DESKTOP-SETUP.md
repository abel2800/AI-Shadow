# 🖥️ Desktop App Setup Guide

## AI Shadow Desktop - Installation & Usage

This guide will help you set up and run the AI Shadow Desktop application on Windows, macOS, or Linux.

---

## 📋 Prerequisites

Before you begin, make sure you have:

1. **Backend Server Running** - The desktop app needs the backend API
2. **Frontend Server Running** (for development) - Or built frontend files
3. **Node.js v18+** - Required for running and building the app

---

## 🚀 Quick Start (Development Mode)

### Step 1: Install Desktop App Dependencies

```bash
cd desktop
npm install
```

This will install:
- `electron` - Desktop framework
- `electron-builder` - For building installers
- `electron-store` - For persistent storage

### Step 2: Start Backend & Frontend

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 3: Run Desktop App

**Terminal 3 - Desktop:**
```bash
cd desktop
npm run dev
```

The desktop app will:
- ✅ Open in a native window
- ✅ Connect to backend at `http://localhost:5000`
- ✅ Load frontend from `http://localhost:5173`
- ✅ Show DevTools for debugging

---

## 📦 Building Installers (Production)

### Windows

Build a Windows installer:

```bash
cd desktop
npm run build:win
```

This creates:
- **NSIS Installer**: Full installer with options (`dist/AI Shadow Setup.exe`)
- **Portable Version**: Single .exe, no install needed (`dist/AI Shadow.exe`)

**Output Location**: `desktop/dist/`

### macOS

Build a macOS application:

```bash
cd desktop
npm run build:mac
```

This creates:
- **DMG**: Drag-and-drop installer (`dist/AI Shadow.dmg`)
- **ZIP**: Compressed app bundle (`dist/AI Shadow-mac.zip`)

**Output Location**: `desktop/dist/`

### Linux

Build Linux packages:

```bash
cd desktop
npm run build:linux
```

This creates:
- **AppImage**: Universal Linux binary (`dist/AI Shadow.AppImage`)
- **DEB**: Debian/Ubuntu package (`dist/ai-shadow_1.0.0_amd64.deb`)

**Output Location**: `desktop/dist/`

---

## 🎨 Adding Custom Icons

The desktop app needs proper icons for each platform. Place them in `desktop/assets/`:

### Required Icon Files

1. **icon.png** - 512x512 PNG (universal)
2. **icon.ico** - Windows icon
3. **icon.icns** - macOS icon

### Creating Icons

#### Option 1: Online Tools
- Use [icongenerator.org](https://icongenerator.org/)
- Upload your PNG
- Download all formats

#### Option 2: Manual Creation

**PNG → ICO (Windows)**
```bash
# Using ImageMagick
magick convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

**PNG → ICNS (macOS)**
```bash
# Create iconset
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
iconutil -c icns icon.iconset
```

---

## ⚙️ Configuration

### Changing Backend URL

Edit `desktop/main.js`:

```javascript
const BACKEND_URL = 'http://localhost:5000'  // Change this
```

### Changing Frontend URL

For development, edit `desktop/main.js`:

```javascript
const FRONTEND_URL = 'http://localhost:5173'  // Change this
```

For production, you can:
1. Host the frontend and point to the URL
2. Bundle the frontend files and serve them locally

---

## 🔧 Desktop App Features

### System Tray Integration
- App minimizes to system tray
- Right-click tray icon for menu
- Click tray icon to restore window

### Application Menu
- **File Menu**: New Chat, Exit
- **View Menu**: Navigate to Dashboard, Profile, Toggle DevTools
- **Help Menu**: Crisis Resources, About AI Shadow

### Keyboard Shortcuts
- `Ctrl/Cmd + N` - New Chat
- `Ctrl/Cmd + D` - Dashboard
- `Ctrl/Cmd + P` - Profile
- `Ctrl/Cmd + Q` - Quit
- `F11` - Fullscreen

### Persistent Storage
- Settings are saved locally using `electron-store`
- First-run detection
- User preferences persist between sessions

---

## 🐛 Troubleshooting

### App Won't Start

**Error: "Cannot find module 'electron'"**
```bash
cd desktop
rm -rf node_modules
npm install
```

**White/Blank Screen**
1. Open DevTools: `Ctrl+Shift+I` or `Cmd+Option+I`
2. Check console for errors
3. Verify backend is running on port 5000
4. Verify frontend is running on port 5173 (dev mode)

### Build Errors

**Windows: "electron-builder not found"**
```bash
npm install --save-dev electron-builder
```

**macOS: "Cannot sign app"**
- Remove code signing from `package.json`:
```json
"mac": {
  "identity": null
}
```

**Linux: Missing dependencies**
```bash
# Ubuntu/Debian
sudo apt-get install -y libgconf-2-4 libxss1 libasound2

# Fedora
sudo dnf install -y libXScrnSaver
```

### Connection Issues

**Cannot connect to backend**
1. Check backend is running: `http://localhost:5000`
2. Check CORS settings in backend
3. Verify backend `.env` has correct `CORS_ORIGIN`

---

## 📱 Packaging for Distribution

### Before Building for Users

1. **Update Backend/Frontend URLs** to production servers
2. **Add proper icons** to `assets/`
3. **Update version** in `package.json`
4. **Test thoroughly** on target platform

### Build All Platforms

```bash
# Must be on respective OS to build native packages
npm run build        # Builds for current platform
```

### Signing (Optional but Recommended)

#### Windows Code Signing
```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "password"
}
```

#### macOS Code Signing
```json
"mac": {
  "identity": "Developer ID Application: Your Name (TEAM_ID)"
}
```

---

## 🔐 Security Notes

The desktop app implements:
- ✅ **Context Isolation** - Renderer process is isolated
- ✅ **No Node Integration** - NodeJS not exposed to web content
- ✅ **Preload Script** - Controlled IPC communication
- ✅ **Web Security** - CORS and CSP enabled

---

## 📊 File Sizes (Approximate)

| Platform | Installer Size | Installed Size |
|----------|----------------|----------------|
| Windows  | ~150 MB        | ~400 MB        |
| macOS    | ~180 MB        | ~450 MB        |
| Linux    | ~170 MB        | ~430 MB        |

---

## 🆘 Crisis Resources in Desktop App

The desktop app includes built-in access to crisis resources:

**Access via:**
- Menu Bar: `Help → Crisis Resources`
- Shows immediate contact information
- Provides international resources

**Resources Included:**
- 988 - National Suicide Prevention Lifeline (US)
- 741741 - Crisis Text Line (US)
- International crisis centers directory

---

## 💙 Remember

AI Shadow is a companion app for emotional support, NOT a replacement for professional mental health care.

**In crisis? Please reach out:**
- 🆘 Call 988 (US) or your local emergency number
- 💬 Text HOME to 741741 (US)
- 🌍 Visit https://www.iasp.info/resources/Crisis_Centres/

---

## 📞 Support

- 📖 **Documentation**: [README.md](README.md)
- 🐛 **Issues**: GitHub Issues
- 💬 **Community**: Discord/Forum

---

**Made with 💙 for mental health awareness**

