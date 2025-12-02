# 💙 AI SHADOW - Your Digital Companion for Mental Well-Being

<div align="center">

![AI Shadow Banner](https://via.placeholder.com/1200x300/0a0a0f/1a8dff?text=AI+SHADOW+-+Your+Companion)

### **A Mental Health Support Companion - NOT a General AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)

**[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)**

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Features Guide](#-features-guide)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**AI SHADOW** is a compassionate digital companion designed to provide emotional support and mental well-being assistance. This is NOT a general AI assistant - it's specifically built to be a safe, non-judgmental space for people experiencing loneliness, stress, anxiety, or depression.

### ⚠️ IMPORTANT DISCLAIMER

AI Shadow is:
- ✅ A supportive companion for emotional conversations
- ✅ A safe listening space without judgment
- ✅ Here to provide comfort and understanding

AI Shadow is NOT:
- ❌ A therapist, doctor, or medical professional
- ❌ A replacement for professional mental health care
- ❌ Able to diagnose or treat mental health conditions

**If you're in crisis, please contact: 988 (US) or your local emergency services**

### Why AI Shadow?

- 💙 **Compassionate Support** - Gentle, warm, and emotionally present
- 🫂 **Safe Space** - Non-judgmental listening and validation
- 🎨 **Beautiful UI** - Calming glassmorphism design
- 🔒 **Private & Secure** - Your conversations are protected
- 📱 **Always Available** - 24/7 companion when you need to talk
- 🖥️ **Desktop App** - Native Windows/Mac/Linux application
- 🆘 **Crisis Resources** - Quick access to professional help

---

## ✨ Features

### 💙 Support Modes

- **6 Companion Modes:**
  - 🫂 **Emotional Support** - A safe space to talk and share feelings
  - ✏️ **Journal & Express** - Write to understand your emotions
  - 🎓 **Learning Companion** - Learn without pressure or anxiety
  - 💻 **Coding Support** - Patient help with programming
  - 🌍 **Language Bridge** - Connect across languages
  - 💡 **Life Companion** - Gentle guidance for daily challenges

### 🎨 User Interface

- Beautiful **dark mode** with cyber-blue accents
- **Glassmorphism** UI design
- Smooth **Framer Motion** animations
- Responsive layout for all devices
- Real-time typing indicators
- **Syntax highlighting** for code blocks
- **Markdown rendering** for formatted responses

### 💬 Chat Features

- Real-time AI conversations
- Chat history with search functionality
- Pin and archive conversations
- Export chat history
- Message copy functionality
- Code syntax highlighting
- Markdown support in AI responses

### 📚 Prompt Library

- Create custom prompt templates
- Browse public templates
- Category-based organization
- Quick template search
- Usage statistics tracking
- One-click template usage

### 📊 Dashboard & Analytics

- Total chats and messages count
- Token usage statistics
- Favorite AI mode tracking
- Recent conversation history
- Activity overview
- Visual analytics

### ⚙️ Settings & Customization

- Profile management
- Notification preferences
- Privacy controls
- Appearance customization
- Data export options
- Account management

### 🔐 Security

- **JWT-based** authentication
- **bcrypt** password hashing
- Secure HTTP-only sessions
- Rate limiting protection
- Input validation
- SQL injection prevention

---

## 🛠 Technology Stack

### Frontend
- **React 18.3** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations
- **Zustand** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code highlighting
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API protection

### AI Integration
- OpenAI API compatible
- Supports GPT-3.5, GPT-4, and other models
- Custom system prompts per mode
- Token usage tracking

---

## 📁 Project Structure

```
ai-shadow/
├── backend/                    # Backend API (Mental Health Companion)
│   ├── config/
│   │   └── database.js        # PostgreSQL configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── aiController.js    # Mental health AI companion logic
│   │   └── promptController.js # Prompt templates logic
│   ├── middleware/
│   │   └── auth.js           # JWT middleware
│   ├── routes/
│   │   ├── auth.js           # Auth routes
│   │   ├── ai.js             # AI companion routes
│   │   └── prompts.js        # Prompt routes
│   ├── scripts/
│   │   └── setupDatabase.js  # Database initialization
│   ├── .env.example          # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js             # Main server file
│
├── desktop/                   # Electron Desktop App
│   ├── main.js               # Main Electron process
│   ├── preload.js            # Preload script for security
│   ├── assets/               # App icons and resources
│   ├── package.json          # Desktop app configuration
│   └── README.md             # Desktop app documentation
│
├── frontend/                  # Frontend React App
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js      # Axios configuration
│   │   │   └── services.js   # API service functions
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ChatSidebar.jsx
│   │   │   └── MessageBubble.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── PromptLibrary.jsx
│   │   ├── store/
│   │   │   └── useStore.js   # Zustand store
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md                  # This file
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v15 or higher) - [Download](https://www.postgresql.org/download/)
- **pgAdmin 4** (recommended) - Installed with PostgreSQL
- **Git** - [Download](https://git-scm.com/)
- **AI API Key** - Get from [OpenAI](https://platform.openai.com/) or compatible providers

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ai-shadow.git
cd ai-shadow
```

### Step 2: Install Dependencies

#### Install Backend Dependencies
```bash
cd backend
npm install
```

#### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

1. **Create `.env` file** in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

2. **Edit `.env` file** with your configuration:

```env
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_shadow
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT Secret Key (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long

# AI API Configuration
AI_API_KEY=your_openai_api_key_here
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Origins
CORS_ORIGIN=http://localhost:5173
```

### Frontend Configuration

The frontend uses Vite and connects to the backend API. No additional configuration needed, but you can create a `.env` file in the `frontend` directory if you want to customize the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄️ Database Setup

### Option 1: Using pgAdmin 4 (Recommended for Beginners)

1. **Open pgAdmin 4**

2. **Create a new database:**
   - Right-click on "Databases" → Create → Database
   - Name: `ai_shadow`
   - Owner: `postgres`
   - Click "Save"

3. **Run the setup script:**
   ```bash
   cd backend
   npm run db:setup
   ```

### Option 2: Using Command Line

1. **Connect to PostgreSQL:**
   ```bash
   psql -U postgres
   ```

2. **Create database:**
   ```sql
   CREATE DATABASE ai_shadow;
   ```

3. **Exit and run setup script:**
   ```bash
   \q
   cd backend
   npm run db:setup
   ```

### Verify Database Setup

The setup script creates the following tables:
- `users` - User accounts
- `chats` - Chat conversations
- `messages` - Chat messages
- `prompt_templates` - Saved prompt templates
- `user_stats` - User statistics

You can verify in pgAdmin 4:
1. Expand `ai_shadow` database
2. Expand "Schemas" → "public" → "Tables"
3. You should see all 5 tables

---

## 🎮 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm run dev
```

Backend will run on: http://localhost:5000

#### Terminal 2 - Start Frontend Dev Server
```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:5173

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Backend (Production)
```bash
cd backend
NODE_ENV=production npm start
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

### Chat Endpoints

#### Send Message
```http
POST /ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "chatId": 1,          // Optional, creates new chat if not provided
  "message": "Hello AI!",
  "mode": "general",    // general, writing, tutor, code, translator, advisor
  "model": "gpt-3.5-turbo"
}
```

#### Get Chat History
```http
GET /ai/chats?limit=50&offset=0
Authorization: Bearer <token>
```

#### Get Single Chat
```http
GET /ai/chats/:chatId
Authorization: Bearer <token>
```

#### Search Chats
```http
GET /ai/chats/search?query=search_term
Authorization: Bearer <token>
```

#### Update Chat
```http
PUT /ai/chats/:chatId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Title",
  "is_pinned": true,
  "is_archived": false
}
```

#### Delete Chat
```http
DELETE /ai/chats/:chatId
Authorization: Bearer <token>
```

### Prompt Template Endpoints

#### Get Templates
```http
GET /prompts?category=writing
Authorization: Bearer <token>
```

#### Create Template
```http
POST /prompts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Essay Writer",
  "description": "Write essays on any topic",
  "prompt": "Write an essay about {topic}",
  "category": "writing",
  "is_public": false
}
```

---

## 📖 Features Guide

### 1. Getting Started

1. **Register an Account**
   - Navigate to http://localhost:5173
   - Click "Create one now"
   - Fill in your details
   - Click "Create Account"

2. **Dashboard Overview**
   - View your statistics
   - Quick access to AI modes
   - Recent conversations

### 2. Starting a Chat

1. Click on any AI mode card or "Chat" in navigation
2. Select your preferred AI mode from the dropdown
3. Type your message
4. Press Enter or click Send

### 3. Using Prompt Templates

1. Navigate to "Prompts" in the navigation
2. Browse available templates
3. Click "Use Template" to start a chat with that prompt
4. Click "Copy" to copy the prompt text
5. Create your own templates with "Create Template"

### 4. Managing Chats

- **Search:** Use the search bar in the chat sidebar
- **Pin:** Update chat settings to pin important conversations
- **Delete:** Click the trash icon to delete a chat
- **Export:** Use Settings → Data to export chat history

### 5. Customizing Settings

- **Profile:** Update your name and profile information
- **Notifications:** Configure notification preferences
- **Privacy:** Control data sharing and storage
- **Appearance:** Customize theme and font size
- **Data:** Export or delete your data

---

## 📸 Screenshots

### Login Page
Beautiful futuristic login with animated background

### Dashboard
Analytics and quick access to AI modes

### Chat Interface
Real-time AI conversations with syntax highlighting

### Prompt Library
Browse and create custom prompt templates

### Settings
Comprehensive settings and customization options

---

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: Connection terminated unexpectedly
```
**Solution:** Check if PostgreSQL is running and credentials in `.env` are correct

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change `PORT` in `.env` or kill the process using the port

#### AI API Error
```
Error: Request failed with status code 401
```
**Solution:** Verify your `AI_API_KEY` in `.env` is valid

#### Frontend Build Error
```
Module not found
```
**Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Getting Help

- 📧 **Email:** support@aishadow.com
- 💬 **Discord:** [Join our community](https://discord.gg/aishadow)
- 🐛 **Issues:** [GitHub Issues](https://github.com/yourusername/ai-shadow/issues)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style

- Use ESLint for JavaScript
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

### Areas to Contribute

- 🎨 UI/UX improvements
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation
- 🌐 Translations
- ⚡ Performance optimizations
- 🧪 Test coverage

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 AI Shadow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

- **OpenAI** for providing the AI API
- **React Team** for the amazing framework
- **PostgreSQL Community** for the robust database
- **All Contributors** who help improve AI Shadow

---

## 🌟 Star History

If you find AI Shadow useful, please consider giving it a star on GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/ai-shadow&type=Date)](https://star-history.com/#yourusername/ai-shadow&Date)

---

## 📞 Contact

- **Website:** https://aishadow.com
- **Email:** contact@aishadow.com
- **Twitter:** [@AI_Shadow](https://twitter.com/AI_Shadow)
- **GitHub:** [github.com/yourusername/ai-shadow](https://github.com/yourusername/ai-shadow)

---

<div align="center">

**Made with ❤️ by the AI Shadow Team**

[⬆ Back to Top](#-ai-shadow---your-intelligent-personal-ai-assistant)

</div>

