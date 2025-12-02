# 🚀 Quick Start Guide - AI SHADOW

Get AI Shadow up and running in under 5 minutes!

## ⚡ Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] PostgreSQL installed and running
- [ ] AI API key (OpenAI or compatible)
- [ ] Git installed

## 📝 5-Minute Setup

### 1. Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-shadow.git
cd ai-shadow

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment (1 minute)

```bash
# Navigate to backend
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file with your details (use any text editor)
notepad .env  # Windows
nano .env     # Linux/Mac
```

**Required changes in `.env`:**
```env
# Replace with your PostgreSQL password
DB_PASSWORD=your_postgres_password

# Add your OpenAI API key
AI_API_KEY=sk-your-openai-api-key-here

# Generate a random JWT secret (any long random string)
JWT_SECRET=your_random_secret_key_minimum_32_characters
```

### 3. Setup Database (1 minute)

**Option A - Using pgAdmin 4:**
1. Open pgAdmin 4
2. Right-click "Databases" → Create → Database
3. Name it `ai_shadow`
4. Click Save

**Option B - Using Command Line:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ai_shadow;
\q
```

**Run setup script:**
```bash
# Make sure you're in the backend directory
npm run db:setup
```

You should see:
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

### 4. Start the Application (1 minute)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait for:
```
✅ PostgreSQL database connected
🚀 AI Shadow Backend running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Wait for:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 5. Access the Application

Open your browser and go to: **http://localhost:5173**

1. Click "Create one now" to register
2. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: (minimum 6 characters)
3. Click "Create Account"
4. You're in! 🎉

## 🎯 First Steps

### Start Your First Chat

1. **Dashboard** - You'll land on the dashboard
2. **Choose a Mode** - Click any AI mode card (e.g., "General Assistant")
3. **Type a Message** - Try: "Hello! What can you help me with?"
4. **Send** - Press Enter or click the Send button

### Try Different AI Modes

- 💬 **General** - "Tell me a joke"
- ✏️ **Writing** - "Write a professional email about..."
- 🎓 **Tutor** - "Explain quantum physics simply"
- 💻 **Code** - "Write a Python function to sort a list"
- 🌍 **Translator** - "Translate 'Hello' to Spanish"
- 💡 **Advisor** - "How can I be more productive?"

### Explore Prompt Templates

1. Click "Prompts" in the navigation
2. Browse available templates
3. Click "Use Template" on any template
4. Create your own with "Create Template"

## 🔧 Troubleshooting

### Backend Won't Start

**Error:** `Connection terminated unexpectedly`
```bash
# Check PostgreSQL is running
# Windows: Services → PostgreSQL
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Verify database exists
psql -U postgres -l | grep ai_shadow
```

### Frontend Won't Start

**Error:** `Port 5173 already in use`
```bash
# Kill the process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### AI API Not Working

**Error:** `Invalid API key` or `401 Unauthorized`

1. Check your `.env` file in `backend/` directory
2. Verify `AI_API_KEY` is correctly set
3. Restart backend server: Stop (Ctrl+C) and run `npm run dev` again

### Database Connection Failed

**Error:** `Connection refused` or `Authentication failed`

1. Verify PostgreSQL is running
2. Check `DB_PASSWORD` in `.env` matches your PostgreSQL password
3. Verify `DB_NAME=ai_shadow` database exists in pgAdmin

## 📚 Next Steps

### Customize Your Experience

- **Profile** → Update your name and preferences
- **Settings** → Configure notifications and appearance
- **Prompts** → Create custom prompt templates

### Learn More

- Read the full [README.md](README.md) for detailed documentation
- Check out the [API Documentation](README.md#-api-documentation)
- Join our community for support

## 🆘 Still Need Help?

### Common Commands

```bash
# Restart backend
cd backend
npm run dev

# Restart frontend
cd frontend
npm run dev

# Reset database
cd backend
npm run db:setup

# Check if services are running
# Backend should be on http://localhost:5000
# Frontend should be on http://localhost:5173
```

### Get Support

- 📖 **Full Documentation:** [README.md](README.md)
- 🐛 **Report Issues:** GitHub Issues
- 💬 **Community:** Discord/Forum
- 📧 **Email:** support@aishadow.com

## ✅ Success Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Registered an account
- [ ] Sent first message to AI
- [ ] Tried different AI modes
- [ ] Explored prompt library

## 🎉 You're All Set!

Welcome to AI Shadow! Start exploring the power of AI assistance.

**Happy chatting! 🌟**

---

[← Back to README](README.md) | [Report Issue](https://github.com/yourusername/ai-shadow/issues)

