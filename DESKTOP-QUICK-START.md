# 🖥️ Desktop App - Quick Start

## ✅ Your Desktop App is Ready!

The desktop app is now properly configured for your mental health companion.

---

## 🚀 How to Run

### Option 1: All-in-One (Recommended)

**Windows:**
```bash
start-all.bat
```

Then in a **new terminal**:
```bash
cd desktop
npm start
```

### Option 2: Step by Step

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

**Terminal 3 - Desktop:**
```bash
cd desktop
npm start
```

---

## 💡 What Happens

The desktop app will:
1. ✅ Open in a native window (not browser)
2. ✅ Load your frontend from `http://localhost:5173`
3. ✅ Connect to backend at `http://localhost:5000`
4. ✅ Show DevTools for debugging (in dev mode)
5. ✅ Create application menu with Crisis Resources
6. ✅ Use calming background color (#1a1d2e)

---

## 🎨 Desktop Features

- **Window Title**: "AI Shadow - Your Companion"
- **Background**: Calming dark purple (#1a1d2e)
- **Menu Bar**: Help → Crisis Resources (988, 741741, etc.)
- **Keyboard Shortcuts**:
  - `Ctrl+N` - New Chat
  - `Ctrl+D` - Dashboard
  - `Ctrl+Q` - Quit
- **DevTools**: Automatically opens in development mode

---

## 🐛 Troubleshooting

### White/Blank Screen?

**Problem**: Frontend not running

**Solution**:
```bash
# Make sure frontend is running first
cd frontend
npm run dev
```

### "Failed to load" Error?

**Problem**: Backend not running

**Solution**:
```bash
# Make sure backend is running
cd backend
npm run dev
```

### Can't Close Window?

- Press `Alt+F4` or `Ctrl+Q`
- Or use File → Exit from menu

---

## 📦 Building for Distribution

When you're ready to create installers:

**Windows Installer:**
```bash
cd desktop
npm run build:win
```
Output: `desktop/dist/AI Shadow Setup.exe`

**Portable Version:**
The build creates both installer and portable `.exe`

---

## ✨ Current Status

✅ Desktop app configured  
✅ Mental health companion theme  
✅ Crisis resources in Help menu  
✅ Proper window sizing  
✅ Error handling  
✅ Dev mode with DevTools  

**Ready to use!** 💙

---

## 🎯 Next Steps

1. Make sure backend & frontend are running
2. Run `cd desktop && npm start`
3. Desktop window should open
4. Start using your mental health companion!

**You're all set!** 🌟

