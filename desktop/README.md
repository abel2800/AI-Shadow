# 🖥️ AI Shadow - Desktop Application

## 💙 Your Mental Health Companion on Desktop

This is the Electron-based desktop application for AI Shadow, a compassionate digital companion designed to provide emotional support and mental well-being assistance.

---

## 🎯 Purpose

AI Shadow Desktop is NOT a general AI assistant. It is specifically designed for:

✅ **Emotional conversation** - A safe space to share your feelings
✅ **Mental wellness support** - Gentle guidance for emotional well-being  
✅ **Safe listening space** - Non-judgmental companionship
✅ **Comfort** - Support for people experiencing loneliness, stress, anxiety, or depression

⚠️ **IMPORTANT**: AI Shadow is NOT a therapist, doctor, or medical professional. It does NOT diagnose, treat, or provide medical advice.

---

## 📋 Prerequisites

Before running the desktop app, make sure you have:

- **Node.js** v18 or higher installed
- **Backend server** running on `http://localhost:5000`
- **Frontend server** running on `http://localhost:5173` (for development)

---

## 🚀 Quick Start

### Install Dependencies

```bash
cd desktop
npm install
```

### Run in Development Mode

```bash
npm run dev
```

This will:
- Start the Electron app
- Connect to your local backend (localhost:5000)
- Load the web app from localhost:5173
- Open DevTools for debugging

### Build for Production

#### Windows
```bash
npm run build:win
```

#### macOS
```bash
npm run build:mac
```

#### Linux
```bash
npm run build:linux
```

Build outputs will be in the `desktop/dist/` folder.

---

## 🗂️ Project Structure

```
desktop/
├── main.js           # Main Electron process
├── preload.js        # Preload script for security
├── package.json      # Dependencies and build config
├── assets/           # Icons and resources
│   ├── icon.png      # App icon (PNG)
│   ├── icon.ico      # Windows icon
│   └── icon.icns     # macOS icon
└── README.md         # This file
```

---

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + N` - Start new chat
- `Ctrl/Cmd + D` - Go to dashboard
- `Ctrl/Cmd + P` - Open profile
- `Ctrl/Cmd + Q` - Quit application
- `F11` - Toggle fullscreen
- `Ctrl/Cmd + R` - Reload
- `Ctrl/Cmd + Shift + I` - Toggle DevTools

---

## 🆘 Crisis Resources (Built-in)

The desktop app includes quick access to crisis resources via the Help menu:

- **National Suicide Prevention Lifeline**: 988 (US)
- **Crisis Text Line**: Text HOME to 741741
- **International Resources**: https://www.iasp.info/resources/Crisis_Centres/

---

## 🔧 Configuration

### Backend URL
By default, the app connects to `http://localhost:5000`. To change this, edit `main.js`:

```javascript
const BACKEND_URL = 'http://your-backend-url:port'
```

### Frontend URL (Development)
In development mode, the app loads from `http://localhost:5173`. To change this, edit `main.js`:

```javascript
const FRONTEND_URL = 'http://your-frontend-url:port'
```

---

## 📦 Building Installers

The app uses `electron-builder` to create installers:

### Windows
- **NSIS Installer**: Full installer with options
- **Portable**: Single .exe file, no installation needed

### macOS
- **DMG**: Drag-and-drop installer
- **ZIP**: Compressed app bundle

### Linux
- **AppImage**: Universal Linux binary
- **DEB**: Debian/Ubuntu package

---

## 🎨 Icons

Place your custom icons in the `assets/` folder:

- `icon.png` - 512x512 PNG for all platforms
- `icon.ico` - Windows icon
- `icon.icns` - macOS icon

You can use tools like:
- [IconGenerator](https://icongenerator.org/) 
- [CloudConvert](https://cloudconvert.com/) for format conversion

---

## 🌟 Features

### Desktop-Specific Features

✨ **System Tray Integration** - App stays in system tray
🔔 **Native Notifications** - Desktop notifications (future feature)
💾 **Local Storage** - Persistent settings with electron-store
🖼️ **Native Window** - Full desktop window with menu bar
⌨️ **Keyboard Shortcuts** - Quick access to features
🔒 **Secure** - Context isolation and sandboxing enabled

---

## 🐛 Troubleshooting

### App Won't Start

**Check Backend Connection**
```bash
# Make sure backend is running
cd backend
npm run dev
```

**Check Frontend (Dev Mode)**
```bash
# Make sure frontend is running
cd frontend
npm run dev
```

### White Screen / Blank Window

1. Open DevTools: `Ctrl+Shift+I` or `Cmd+Option+I`
2. Check console for errors
3. Verify backend URL is correct
4. Check if frontend is accessible in browser

### Build Fails

**Clear cache and rebuild:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

## 🔐 Security

The desktop app implements Electron security best practices:

- ✅ **Context Isolation** - Renderer process is isolated
- ✅ **No Node Integration** - NodeJS not available in renderer
- ✅ **Preload Scripts** - Controlled IPC communication
- ✅ **Web Security** - CORS and CSP enabled
- ✅ **Sandboxed** - Renderer process runs in sandbox

---

## 🤝 Contributing

Want to improve the desktop app? Here's how:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on your platform
5. Submit a pull request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 💙 Remember

AI Shadow is here to provide **emotional support and companionship**, not medical treatment.

If you're experiencing a mental health crisis:
- 🆘 Call 988 (US) - National Suicide Prevention Lifeline
- 💬 Text HOME to 741741 - Crisis Text Line
- 🌍 Visit https://www.iasp.info/resources/Crisis_Centres/ for international resources

**You are not alone. Help is available. 💙**

---

**Made with care for mental health awareness**

