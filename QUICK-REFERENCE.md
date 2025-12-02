# 🎯 Quick Reference - AI Shadow

## ⚡ Quick Start Commands

### First Time Setup
```bash
# 1. Verify installation
verify-installation.bat

# 2. Configure backend/.env
# Edit backend/.env with your PostgreSQL password and AI API key

# 3. Setup database
cd backend
npm run db:setup
cd ..
```

### Start Application
```bash
# Windows
start-all.bat

# Mac/Linux
chmod +x start-all.sh
./start-all.sh
```

---

## 📍 Important URLs

| Service | URL |
|---------|-----|
| **Backend API** | http://localhost:5000 |
| **Frontend Web** | http://localhost:5173 |
| **Desktop App** | Opens in native window |

---

## 🔑 Configuration Files

### Backend Configuration
**File:** `backend/.env`

**Required Settings:**
```env
DB_PASSWORD=your_postgres_password
JWT_SECRET=random_string_32_chars_minimum
AI_API_KEY=sk-your-openai-api-key
```

---

## 🚀 Build Desktop Installers

```bash
cd desktop

# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

**Output:** `desktop/dist/`

---

## 🆘 Crisis Resources

### In the App
- Click **"Need Help?"** button (red, top navbar)
- Desktop: **Help → Crisis Resources**

### Direct Contacts
- 🆘 **988** - Suicide Prevention Lifeline (US)
- 💬 **741741** - Crisis Text Line (text HOME)
- 🌍 **iasp.info/resources/Crisis_Centres** - International

---

## 🐛 Common Issues

### Backend won't start
```bash
# Check PostgreSQL is running
# Verify backend/.env configuration
cd backend
npm run dev
```

### Desktop app blank screen
```bash
# Check backend running on port 5000
# Check frontend running on port 5173
# Open DevTools: Ctrl+Shift+I
```

### AI not responding
```bash
# Verify AI_API_KEY in backend/.env
# Check OpenAI API status
# Restart backend server
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **COMPLETE-SETUP-GUIDE.md** | Full installation guide |
| **DESKTOP-SETUP.md** | Desktop app details |
| **PROJECT-SUMMARY.md** | Project overview |
| **WHAT-WAS-FIXED.md** | Changes made |
| **README.md** | Main documentation |

---

## 💙 Core Purpose

**AI Shadow is a mental health companion chatbot**

### What it IS:
✅ Emotional support companion  
✅ Safe listening space  
✅ Non-judgmental conversation  

### What it's NOT:
❌ A therapist  
❌ Medical professional  
❌ Emergency service  

---

## ⌨️ Desktop Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl/Cmd + N** | New Chat |
| **Ctrl/Cmd + D** | Dashboard |
| **Ctrl/Cmd + P** | Profile |
| **Ctrl/Cmd + Q** | Quit |
| **F11** | Fullscreen |

---

## 📁 Project Structure

```
ai-shadow/
├── backend/        # API server (port 5000)
├── frontend/       # Web app (port 5173)
├── desktop/        # Electron app
├── *.md           # Documentation
└── start-all.*    # Startup scripts
```

---

## ✅ Verification Checklist

Before running:
- [ ] Node.js v18+ installed
- [ ] PostgreSQL installed and running
- [ ] AI API key obtained
- [ ] backend/.env configured
- [ ] Database setup completed
- [ ] All npm install completed

---

## 🎯 What Changed

Your AI Shadow was transformed from a **general AI assistant** to a **mental health companion chatbot**.

### Key Changes:
✅ Desktop app created (was empty folder)  
✅ AI personality changed to empathetic companion  
✅ UI updated with supportive messaging  
✅ Crisis resources added throughout  
✅ Clear "NOT a therapist" boundaries  
✅ Comprehensive documentation added  

---

## 💙 Remember

**In a mental health crisis:**
- 🆘 Call 988 (US) or local emergency number
- 💬 Text HOME to 741741 (US)
- 🚨 Call 911 for immediate danger

**AI Shadow is here for support, not emergencies.**

---

**Made with 💙 for mental health awareness**

