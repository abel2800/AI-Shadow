# ✅ AI Shadow Setup Checklist

Use this checklist to ensure everything is properly configured.

## 📋 Pre-Installation

- [ ] Node.js v18+ installed (`node --version`)
- [ ] PostgreSQL v15+ installed
- [ ] pgAdmin 4 installed (optional but recommended)
- [ ] Git installed
- [ ] OpenAI API key obtained (or compatible API)
- [ ] Text editor installed (VS Code, Sublime, etc.)

## 📦 Installation

- [ ] Repository cloned
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] No installation errors reported

## ⚙️ Configuration

### Backend (.env file)

- [ ] `.env` file created from `.env.example`
- [ ] `DB_HOST` set (default: localhost)
- [ ] `DB_PORT` set (default: 5432)
- [ ] `DB_NAME` set to `ai_shadow`
- [ ] `DB_USER` set (default: postgres)
- [ ] `DB_PASSWORD` configured with your PostgreSQL password
- [ ] `JWT_SECRET` set to a strong random string (32+ characters)
- [ ] `AI_API_KEY` configured with your OpenAI/compatible API key
- [ ] `AI_API_URL` configured (default: OpenAI endpoint)
- [ ] `AI_MODEL` set (default: gpt-3.5-turbo)
- [ ] `PORT` set (default: 5000)
- [ ] `CORS_ORIGIN` set (default: http://localhost:5173)

### Frontend (optional)

- [ ] `.env` file created (if needed)
- [ ] `VITE_API_URL` configured (if different from default)

## 🗄️ Database Setup

- [ ] PostgreSQL service is running
- [ ] Can connect to PostgreSQL with configured credentials
- [ ] Database `ai_shadow` created
- [ ] Database setup script executed (`npm run db:setup`)
- [ ] All 5 tables created successfully:
  - [ ] users
  - [ ] chats
  - [ ] messages
  - [ ] prompt_templates
  - [ ] user_stats
- [ ] Default prompt templates inserted
- [ ] Can view tables in pgAdmin 4

## 🚀 Running the Application

### Backend

- [ ] Backend starts without errors (`cd backend && npm run dev`)
- [ ] See message: "✅ PostgreSQL database connected"
- [ ] See message: "🚀 AI Shadow Backend running on http://localhost:5000"
- [ ] Can access http://localhost:5000 in browser
- [ ] API health check works: http://localhost:5000/api/health

### Frontend

- [ ] Frontend starts without errors (`cd frontend && npm run dev`)
- [ ] See message with Local URL (http://localhost:5173)
- [ ] Can access http://localhost:5173 in browser
- [ ] Login page loads correctly
- [ ] No console errors in browser dev tools

## 🧪 Testing Features

### Authentication

- [ ] Can access registration page
- [ ] Can create new account
- [ ] Account creation successful
- [ ] Automatically redirected to dashboard after registration
- [ ] Can logout
- [ ] Can login with created credentials
- [ ] Invalid credentials show error message

### Dashboard

- [ ] Dashboard loads after login
- [ ] Statistics cards display (even with 0 values)
- [ ] AI mode cards visible
- [ ] Can click on AI mode cards
- [ ] Recent chats section appears (empty initially)

### Chat

- [ ] Can navigate to Chat page
- [ ] Sidebar opens/closes
- [ ] Can select different AI modes
- [ ] Can type messages
- [ ] Can send messages (Enter key)
- [ ] AI responds to messages
- [ ] Messages display correctly
- [ ] Code blocks have syntax highlighting
- [ ] Can copy messages
- [ ] Chat history saves
- [ ] Can search chats
- [ ] Can delete chats

### Prompt Library

- [ ] Can access Prompt Library
- [ ] Default templates are visible
- [ ] Can search templates
- [ ] Can filter by category
- [ ] Can use templates
- [ ] Can create new templates
- [ ] Can copy prompts
- [ ] Can delete custom templates

### Profile

- [ ] Can access Profile page
- [ ] User information displays correctly
- [ ] Statistics show correct values
- [ ] Activity overview visible

### Settings

- [ ] Can access Settings page
- [ ] All tabs load correctly
- [ ] Can update profile name
- [ ] Changes save successfully
- [ ] Toggle switches work
- [ ] Settings persist after logout/login

## 🔒 Security Checks

- [ ] Passwords are hashed (not visible in database)
- [ ] JWT tokens are generated
- [ ] Protected routes require authentication
- [ ] Cannot access dashboard without login
- [ ] Logout clears authentication
- [ ] CORS is properly configured
- [ ] API rate limiting is active

## 🎨 UI/UX Checks

- [ ] Dark theme loads correctly
- [ ] Glassmorphism effects visible
- [ ] Animations work smoothly
- [ ] Gradient text renders properly
- [ ] Icons load correctly
- [ ] Responsive on mobile (test with browser dev tools)
- [ ] No layout issues on different screen sizes
- [ ] Scrolling works smoothly
- [ ] Hover effects work on buttons
- [ ] Loading states show when appropriate

## 📱 Browser Compatibility

Test in multiple browsers:

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge

## 🐛 Common Issues Resolved

- [ ] No "port already in use" errors
- [ ] No database connection errors
- [ ] No CORS errors in browser console
- [ ] No API key errors
- [ ] No missing dependencies errors
- [ ] All environment variables loaded correctly

## 📊 Performance Checks

- [ ] Page load time is reasonable (< 3 seconds)
- [ ] Chat responses are timely
- [ ] No memory leaks visible
- [ ] Smooth animations (60fps)
- [ ] Database queries are fast

## 📚 Documentation

- [ ] README.md reviewed
- [ ] QUICKSTART.md reviewed
- [ ] Understand project structure
- [ ] Know where to find logs
- [ ] Understand how to report issues

## 🎉 Final Verification

- [ ] All features work as expected
- [ ] No critical errors in console
- [ ] Application is stable
- [ ] Ready for development/demo
- [ ] Backed up .env file safely
- [ ] Documented any custom changes

## 📝 Notes

Write any custom configurations or issues encountered:

```
_____________________________________________________
_____________________________________________________
_____________________________________________________
_____________________________________________________
```

## ✅ Setup Complete!

If all items are checked, your AI Shadow installation is complete and ready to use!

**Date Completed:** _______________

**Completed By:** _______________

---

## 🆘 If Something Doesn't Work

1. Review the specific section in this checklist
2. Check the [QUICKSTART.md](QUICKSTART.md) guide
3. Review [README.md](README.md) for detailed documentation
4. Check browser console for errors
5. Check backend terminal for errors
6. Verify all environment variables
7. Restart both backend and frontend
8. Clear browser cache and try again

---

[← Back to Quick Start](QUICKSTART.md) | [← Back to README](README.md)

