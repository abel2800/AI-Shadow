# 🌟 Complete Setup Guide - AI Shadow Mental Health Companion

## 💙 Welcome

This is the **complete step-by-step guide** to set up AI Shadow from scratch on your computer.

AI Shadow is a **mental health companion app** - NOT a general AI assistant. It's designed to provide emotional support for people experiencing loneliness, stress, anxiety, or depression.

⚠️ **IMPORTANT**: AI Shadow is NOT a therapist or medical professional. In crisis, call 988 (US) or your local emergency services.

---

## 📋 What You're Building

You'll be setting up:

1. ✅ **Backend Server** - API for AI conversations (Node.js + PostgreSQL)
2. ✅ **Frontend Web App** - Beautiful web interface (React + Vite)
3. ✅ **Desktop App** - Native Windows/Mac/Linux application (Electron)

---

## 🔧 Prerequisites - Install These First

### 1. Node.js (v18 or higher)

**Download**: https://nodejs.org/

- Choose "LTS" version
- Install with default settings
- Restart computer after installation

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. PostgreSQL (v15 or higher)

**Download**: https://www.postgresql.org/download/

**During Installation:**
- Remember your PostgreSQL password (you'll need it later!)
- Install pgAdmin 4 (recommended)
- Default port: 5432

**Verify Installation:**
```bash
psql --version
```

### 3. AI API Key

You need an API key from an AI provider:

**Option 1: OpenAI (Recommended)**
- Visit: https://platform.openai.com/
- Sign up for account
- Go to API Keys section
- Create new secret key
- Copy and save it securely

**Option 2: Compatible Providers**
- Anthropic Claude
- OpenRouter
- Local LLM servers

### 4. Git (Optional but Recommended)

**Download**: https://git-scm.com/

---

## 📥 Step 1: Get the Code

### Option A: Using Git (Recommended)

```bash
git clone https://github.com/yourusername/ai-shadow.git
cd ai-shadow
```

### Option B: Download ZIP

1. Download ZIP from GitHub
2. Extract to a folder (e.g., `C:\Projects\ai-shadow`)
3. Open terminal/command prompt in that folder

---

## 🗄️ Step 2: Setup Database

### Create Database

**Option A: Using pgAdmin 4 (Easiest)**

1. Open **pgAdmin 4**
2. Connect to PostgreSQL (enter your password)
3. Right-click on "Databases"
4. Select "Create" → "Database"
5. Name: `ai_shadow`
6. Owner: `postgres`
7. Click "Save"

**Option B: Using Command Line**

```bash
# Windows (Command Prompt)
psql -U postgres
CREATE DATABASE ai_shadow;
\q

# Mac/Linux
psql -U postgres
CREATE DATABASE ai_shadow;
\q
```

---

## 🔨 Step 3: Install Dependencies

### Install Backend Dependencies

```bash
cd backend
npm install
```

Wait for installation to complete (may take 2-3 minutes).

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

Wait for installation to complete.

### Install Desktop Dependencies

```bash
cd ../desktop
npm install
```

Wait for installation to complete.

---

## ⚙️ Step 4: Configure Environment

### Backend Configuration

1. Navigate to `backend` folder
2. Copy `.env.example` to `.env`:

**Windows:**
```bash
cd backend
copy .env.example .env
```

**Mac/Linux:**
```bash
cd backend
cp .env.example .env
```

3. Edit `.env` file (use Notepad, VS Code, or any text editor):

```env
# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_shadow
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE  # ⚠️ CHANGE THIS!

# JWT Secret (generate a random string)
JWT_SECRET=your_random_secret_key_minimum_32_characters_long  # ⚠️ CHANGE THIS!

# AI API Configuration
AI_API_KEY=sk-your-openai-api-key-here  # ⚠️ CHANGE THIS!
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Origins
CORS_ORIGIN=http://localhost:5173
```

**Important Changes:**
- `DB_PASSWORD` - Your PostgreSQL password
- `JWT_SECRET` - Any long random string (at least 32 characters)
- `AI_API_KEY` - Your OpenAI API key

---

## 🏗️ Step 5: Initialize Database

Run the database setup script:

```bash
cd backend
npm run db:setup
```

**Expected Output:**
```
✅ Users table created
✅ Chats table created
✅ Messages table created
✅ Prompt templates table created
✅ User stats table created
✅ Indexes created
✅ Default prompt templates inserted
🎉 Database setup completed successfully!
```

If you see errors, verify:
- PostgreSQL is running
- Database `ai_shadow` exists
- Password in `.env` is correct

---

## 🚀 Step 6: Start the Application

You have two options:

### Option A: Use Startup Script (Easiest)

**Windows:**
```bash
# From project root
start-all.bat
```

**Mac/Linux:**
```bash
# From project root
chmod +x start-all.sh
./start-all.sh
```

This will start all three services automatically!

### Option B: Manual Start (3 Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait for: `✅ PostgreSQL database connected` and `🚀 AI Shadow Backend running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Wait for: `➜  Local:   http://localhost:5173/`

**Terminal 3 - Desktop App:**
```bash
cd desktop
npm run dev
```

The desktop app window should open automatically!

---

## 🎉 Step 7: First Use

### Create Your Account

1. The desktop app (or browser at http://localhost:5173) will open
2. You'll see the login page
3. Click **"Create one now"**
4. Fill in:
   - Name: Your name
   - Email: Your email
   - Password: Choose a secure password (min 6 characters)
5. Click **"Create Account"**

### Start Your First Conversation

1. You'll land on the **Dashboard**
2. Click on **"Emotional Support"** card
3. Type a message: "I need someone to talk to"
4. Press Enter or click Send
5. AI Shadow will respond with empathy and support

---

## 🔍 Verify Everything Works

### ✅ Backend Check

Visit: http://localhost:5000

Should show: `{"message":"AI Shadow API is running"}`

### ✅ Frontend Check

Visit: http://localhost:5173

Should show: Login/Register page

### ✅ Desktop Check

Desktop app should open in a native window

---

## 🆘 Troubleshooting

### Backend Won't Start

**Error: "Connection refused" or "Database connection failed"**

Solutions:
1. Check PostgreSQL is running:
   - Windows: Services → PostgreSQL
   - Mac: `brew services list`
   - Linux: `sudo systemctl status postgresql`
2. Verify database exists in pgAdmin
3. Check password in `.env` matches PostgreSQL password

**Error: "Port 5000 already in use"**

```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Won't Start

**Error: "Port 5173 already in use"**

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Desktop App Issues

**White/Blank Screen**

1. Check backend is running on port 5000
2. Check frontend is running on port 5173
3. Open DevTools in desktop app: `Ctrl+Shift+I` or `Cmd+Option+I`
4. Look for errors in console

**App Won't Install**

```bash
cd desktop
rm -rf node_modules
npm install
npm run dev
```

### AI Not Responding

**Error: "Invalid API key" or "401 Unauthorized"**

1. Check `AI_API_KEY` in `backend/.env`
2. Verify it starts with `sk-`
3. Test key at https://platform.openai.com/
4. Restart backend server after changing `.env`

---

## 🎨 Customization

### Change AI Model

Edit `backend/.env`:
```env
AI_MODEL=gpt-4  # or gpt-3.5-turbo, gpt-4-turbo, etc.
```

### Change Colors/Theme

Frontend uses TailwindCSS. Edit:
- `frontend/src/index.css` - Main styles
- `frontend/tailwind.config.js` - Theme configuration

### Add Custom Prompts

Use the "Prompts" section in the app to create custom conversation starters.

---

## 📦 Building Desktop Installers

After everything works, you can build standalone installers:

### Windows Installer

```bash
cd desktop
npm run build:win
```

Output: `desktop/dist/AI Shadow Setup.exe`

### macOS App

```bash
cd desktop
npm run build:mac
```

Output: `desktop/dist/AI Shadow.dmg`

### Linux Package

```bash
cd desktop
npm run build:linux
```

Output: `desktop/dist/AI Shadow.AppImage`

---

## 🔐 Security Best Practices

1. ✅ **Never commit `.env` files** - They contain secrets
2. ✅ **Use strong JWT secret** - At least 32 random characters
3. ✅ **Keep API keys private** - Don't share or expose them
4. ✅ **Use HTTPS in production** - For real deployments
5. ✅ **Regular backups** - Back up your database

---

## 📚 Additional Resources

- **Main README**: [README.md](README.md)
- **Desktop Setup**: [DESKTOP-SETUP.md](DESKTOP-SETUP.md)
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- **Setup Checklist**: [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md)

---

## 🆘 Crisis Resources

Remember: AI Shadow is for emotional support, NOT emergencies.

**If you're in crisis:**
- 🆘 **US**: Call or text 988 (Suicide & Crisis Lifeline)
- 💬 **US**: Text HOME to 741741 (Crisis Text Line)
- 🌍 **International**: https://www.iasp.info/resources/Crisis_Centres/
- 🚨 **Emergency**: Call 911 (US) or your local emergency number

---

## ✅ Final Checklist

Before you're done, verify:

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Desktop app opens successfully
- [ ] Created user account
- [ ] Sent first message to AI Shadow
- [ ] AI Shadow responded with empathy
- [ ] Crisis resources accessible in Help menu

---

## 💙 You're All Set!

AI Shadow is now running on your computer. Remember:

✅ This is a **companion for emotional support**
✅ It's here to **listen and provide comfort**
✅ It's **NOT a replacement for professional help**

**Take care of yourself. You're not alone. 💙**

---

## 🤝 Need Help?

- 📖 **Documentation**: Check other MD files in project
- 🐛 **Issues**: GitHub Issues
- 💬 **Community**: Discord/Forum (if available)

---

**Made with 💙 for mental health awareness**

