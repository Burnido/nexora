# 📖 Nexora Project - Quick Reference Guide

## 🚀 Getting Started (5 Minutes)

### Step 1: Run Setup Script
```bash
# Windows
setup.bat

# Mac/Linux
chmod +x setup.sh && ./setup.sh
```

### Step 2: Start Development (2 Terminals)
```bash
# Terminal 1
cd frontend && npm run dev

# Terminal 2
cd backend && npm run dev
```

### Step 3: Open Browser
```
http://localhost:3000
```

---

## 📚 Documentation Guide

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [GET_STARTED.md](./GET_STARTED.md) | Complete overview & setup | 5 min |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Detailed installation steps | 10 min |
| [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md) | Tasks & implementation roadmap | 8 min |
| [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) | Colors, fonts, components | 15 min |
| [PROJECT_COMPLETION_REPORT.md](./PROJECT_COMPLETION_REPORT.md) | What was created | 10 min |

---

## 🎯 Common Tasks

### Want to...

**Start Development?**
```bash
# See GET_STARTED.md
# Run setup.bat or setup.sh
```

**Add a New Page?**
```bash
# Create file in frontend/pages/yourpage.tsx
# Edit frontend/components as needed
# Reference DESIGN_TOKENS.md for styling
```

**Add a Backend Endpoint?**
```bash
# Create route in backend/src/routes/
# Create controller in backend/src/controllers/
# Update backend/src/index.ts with route
```

**Deploy to Production?**
```bash
# See SETUP_GUIDE.md > Deployment section
```

**Check Design System?**
```bash
# See DESIGN_TOKENS.md
```

**Understand Project Structure?**
```bash
# See PROJECT_COMPLETION_REPORT.md
```

---

## 🗂️ File Locations

### Frontend Files
```
frontend/
├── pages/          ← Add new pages here
├── components/     ← Add new components here
├── lib/
│   ├── api.ts      ← API endpoint definitions
│   └── store.ts    ← State management (Zustand)
├── styles/
│   └── globals.css ← Global styles
└── tailwind.config.js ← Colors & theme
```

### Backend Files
```
backend/
├── src/
│   ├── routes/     ← API endpoints
│   ├── controllers/ ← Business logic
│   ├── models/     ← Database schemas
│   ├── services/   ← Reusable services
│   └── index.ts    ← Server entry point
└── .env            ← Configuration
```

---

## 🎨 Design Quick Reference

### Colors
```css
Navy:  #1a1e26 (primary)
Cream: #fdfbf7 (background)
Sage:  #8fb899 (accent)
```

### Typography Classes
```jsx
<h1 className="text-display">Large title</h1>
<h2 className="text-heading">Section heading</h2>
<h3 className="text-subheading">Feature title</h3>
<p className="text-body">Regular text</p>
<p className="text-caption">Small text</p>
```

### Buttons
```jsx
<button className="btn">Primary</button>
<button className="btn btn-outline">Outline</button>
```

---

## 📂 Pages Created

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Landing page |
| Sign In | `/signin` | User login |
| Sign Up | `/signup` | Registration |
| Dashboard | `/dashboard` | User dashboard |
| AI Studio | `/ai` | AI tools showcase |
| Pricing | `/pricing` | Pricing plans |
| Resources | `/resources` | Help & docs |

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```

### Authentication
```
POST /auth/signup
POST /auth/signin
POST /auth/logout
GET  /auth/me
```

### Tasks
```
GET    /tasks
POST   /tasks
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id
```

### AI
```
POST /ai/analyze
POST /ai/suggest-tasks
POST /ai/generate-plan
POST /ai/chat
```

---

## 💻 Development Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm start        # Start production server
```

### Backend
```bash
npm run dev      # Start with auto-reload
npm run build    # Compile TypeScript
npm run lint     # Run ESLint
npm start        # Start production server
```

---

## 🔧 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/nexora
JWT_SECRET=your_secret_key
OPENAI_API_KEY=sk-your-key
CORS_ORIGIN=http://localhost:3000
```

---

## 🐛 Troubleshooting

### Problem: Port already in use
```bash
npx kill-port 3000  # Frontend
npx kill-port 5000  # Backend
```

### Problem: MongoDB connection error
```bash
# Ensure MongoDB is running
# Check DATABASE_URL in backend/.env
```

### Problem: CORS errors
```bash
# Check CORS_ORIGIN in backend/.env
# Should match your frontend URL
```

### Problem: Dependencies not installing
```bash
# Try clearing cache
npm cache clean --force
# Reinstall
npm install
```

---

## 📞 Useful Resources

### Internal Documentation
- [GET_STARTED.md](./GET_STARTED.md) - Start here!
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup
- [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) - Design system
- [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md) - Tasks
- [PROJECT_COMPLETION_REPORT.md](./PROJECT_COMPLETION_REPORT.md) - Overview

### External Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## ✅ Checklist Before Coding

- [ ] Run setup script (setup.bat or setup.sh)
- [ ] Dependencies are installed
- [ ] Read GET_STARTED.md
- [ ] Frontend runs on port 3000
- [ ] Backend runs on port 5000
- [ ] MongoDB is accessible
- [ ] VS Code extensions installed
- [ ] .env files configured
- [ ] API health check works: GET /api/health

---

## 🚀 First Development Task

1. **Implement User Authentication**
   - Create user model in MongoDB
   - Build JWT token system
   - Add password hashing
   - Connect login/signup pages to backend
   - Test authentication flow

See [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md) for detailed steps.

---

## 📱 Project Screenshot

```
www.localhost:3000
├── Navigation Header (NEXORA)
├── Hero Section
│   ├── Main heading
│   ├── Description
│   └── CTA Buttons
├── Features Grid (6 items)
├── Solutions Cards (3 items)
└── Footer
    ├── Links
    ├── Social icons
    └── Copyright
```

---

## 🎯 30-Day Development Plan

**Week 1**: Authentication  
**Week 2-3**: Task Management System  
**Week 4**: AI Integration  
**Week 5**: Polish & Deploy  

See [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md) for details.

---

## 💡 Pro Tips

1. **Use Thunder Client** for API testing instead of Postman
2. **Follow the color palette** strictly - no other colors
3. **Keep edges sharp** - never add border-radius
4. **Test on mobile** - design is mobile-first
5. **Use API utilities** from `lib/api.ts`
6. **Reference DESIGN_TOKENS.md** for all styling decisions
7. **Enable auto-save** in VS Code for faster development

---

## 🎉 You're Ready!

Everything is set up. Time to build something amazing for people with ADHD!

**Next Step**: Read [GET_STARTED.md](./GET_STARTED.md) and run the setup script.

---

_Last Updated: February 2026_  
_Status: Ready for Development_  
_Built with ❤️ for people with ADHD_
