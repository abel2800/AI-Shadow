# 💙 AI Shadow - Mental Health Companion

> A compassionate AI companion designed to provide emotional support and a safe space for mental well-being.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)

---

## 🌟 **What is AI Shadow?**

AI Shadow is a **mental health companion application** designed for people experiencing loneliness, stress, anxiety, or depression. It provides:

- 💙 **Emotional Support** - A safe space to talk without judgment
- ✍️ **Journaling** - Express feelings through guided writing
- 📚 **Learning** - Understand emotions in a stress-free way
- 💻 **Coding Help** - Programming support with mental health awareness
- 🌍 **Translation** - Connect across languages with emotional sensitivity
- 🤝 **Life Guidance** - Thoughtful advice for daily challenges

**⚠️ Important:** AI Shadow is a companion, **not a therapist**. In crisis, call **988** (US) or your local emergency services.

---

## ✨ **Features**

### **🎭 Six Unique AI Modes**

Each mode has its own personality and purpose:

| Mode | Purpose |
|------|---------|
| **Emotional Support** | Pure listening and validation for your feelings |
| **Journal & Express** | Guided writing exercises to process emotions |
| **Learning Companion** | Stress-free learning with confidence building |
| **Coding Support** | Programming help that considers your mental health |
| **Language Bridge** | Translation with emotional and cultural sensitivity |
| **Life Companion** | Gentle guidance to help you find your own answers |

### **🎨 Beautiful UI**

- Calming color palette (soft purples and blues)
- 30+ smooth animations
- Glassmorphism design
- Responsive on all devices

### **🖥️ Desktop App**

- Native Electron desktop application
- System tray integration
- Keyboard shortcuts
- Works offline (once configured)

### **🔒 Privacy & Security**

- Local PostgreSQL database
- JWT authentication
- Encrypted passwords (bcrypt)
- Your data stays on your machine

---

## 🚀 **Quick Start**

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 or higher)
- [Git](https://git-scm.com/)

### **Installation**

#### **1. Clone Repository**

```bash
git clone https://github.com/abel2800/AI-Shadow.git
cd AI-Shadow
```

#### **2. Setup Database**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ai_shadow;
\q

# Run setup script
cd backend
npm install
node scripts/setupDatabase.js
```

#### **3. Configure Environment**

Create `backend/.env` from the example:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_shadow
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Secret (generate a random string)
JWT_SECRET=your_secret_key

# AI API (OpenRouter or OpenAI)
AI_API_KEY=your_api_key
AI_API_URL=https://openrouter.ai/api/v1/chat/completions
AI_MODEL=meta-llama/llama-3.2-3b-instruct:free

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### **4. Install Dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Desktop (optional)
cd ../desktop
npm install
```

#### **5. Start Application**

**Option 1: Manual (3 terminals)**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Desktop (optional)
cd desktop
npm start
```

**Option 2: Windows Quick Start**

```bash
# Double-click or run:
start-all.bat
```

---

## 🎯 **Usage**

### **First Time Setup**

1. **Access the app:** Open http://localhost:5173
2. **Register:** Create your account
3. **Choose a mode:** Select from 6 AI personalities
4. **Start chatting:** Share what's on your mind

### **Switching Modes**

You can switch between AI modes anytime:
- Click the mode dropdown in the chat header
- Each mode responds differently to the same question
- Your conversation history is saved per mode

### **Crisis Resources**

If you're in crisis:
- Click the **"Need Help?"** button (red button in navbar)
- Or press the **Help** menu → **Crisis Resources**

**US Resources:**
- **988** - Suicide & Crisis Lifeline (call or text)
- **741741** - Crisis Text Line (text HOME)

---

## 🛠️ **Technology Stack**

### **Frontend**
- React 18
- Vite
- TailwindCSS
- Framer Motion
- Zustand (state management)
- Axios

### **Backend**
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt

### **Desktop**
- Electron
- Native system integration

### **AI**
- OpenRouter API
- OpenAI API (compatible)

---

## 📁 **Project Structure**

```
AI-Shadow/
├── backend/              # Express.js API server
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth middleware
│   ├── routes/          # API routes
│   ├── scripts/         # Database setup
│   └── server.js        # Entry point
├── frontend/            # React web app
│   ├── src/
│   │   ├── api/        # API services
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   └── store/      # State management
│   └── index.html
├── desktop/             # Electron desktop app
│   ├── main.js         # Main process
│   └── preload.js      # Preload script
├── start-all.bat       # Windows startup script
└── README.md           # This file
```

---

## 🎨 **Screenshots**

### Dashboard
Beautiful overview with mode selection and statistics.

### Chat Interface
Calming design with floating particles and smooth animations.

### Mode-Specific Prompts
Each mode has unique quick-start prompts tailored to its purpose.

---

## 🔧 **Configuration**

### **API Keys**

#### **Option 1: OpenRouter (Recommended - Has Free Models)**

1. Sign up at https://openrouter.ai/
2. Get your API key
3. In `.env`:
   ```env
   AI_API_KEY=sk-or-v1-...
   AI_API_URL=https://openrouter.ai/api/v1/chat/completions
   AI_MODEL=meta-llama/llama-3.2-3b-instruct:free
   ```

#### **Option 2: OpenAI**

1. Sign up at https://platform.openai.com/
2. Add billing and credits
3. In `.env`:
   ```env
   AI_API_KEY=sk-...
   AI_API_URL=https://api.openai.com/v1/chat/completions
   AI_MODEL=gpt-3.5-turbo
   ```

### **Database**

Default PostgreSQL connection:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_shadow
DB_USER=postgres
```

---

## 🤝 **Contributing**

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🐛 **Troubleshooting**

### **"Failed to send message"**
- Check if backend is running on port 5000
- Verify AI API key is valid
- Check API credits/quota

### **Database connection error**
- Ensure PostgreSQL is running
- Verify credentials in `.env`
- Check if database exists: `psql -U postgres -l`

### **Frontend won't load**
- Check if running on port 5173
- Clear browser cache
- Run `npm install` in frontend directory

### **White screen on desktop app**
- Ensure backend and frontend are running first
- Check console logs (`Ctrl+Shift+I`)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **OpenRouter** - For providing free AI models
- **Tailwind CSS** - For the beautiful styling system
- **Framer Motion** - For smooth animations
- **The mental health community** - For inspiration and feedback

---

## 💙 **Mental Health Resources**

### **United States**
- **988** - Suicide & Crisis Lifeline (call or text)
- **741741** - Crisis Text Line (text HOME)
- **1-800-662-4357** - SAMHSA National Helpline

### **International**
- [Befrienders Worldwide](https://www.befrienders.org/)
- [IASP Crisis Centres](https://www.iasp.info/resources/Crisis_Centres/)

---

## 📞 **Support**

- **Issues:** [GitHub Issues](https://github.com/abel2800/AI-Shadow/issues)
- **Discussions:** [GitHub Discussions](https://github.com/abel2800/AI-Shadow/discussions)

---

## ⭐ **Star This Project**

If AI Shadow helped you, please consider giving it a star! ⭐

---

**Made with 💙 for mental health awareness**

*Remember: You are not alone. Reaching out is a sign of strength.*
