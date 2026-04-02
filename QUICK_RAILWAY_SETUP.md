# 🚀 Railway + Supabase Quick Reference

## 📋 Key Files Created

### Core Backend Files

```
backend/
├── .env                              # Environment variables
├── .railwayignore                   # Railway build exclusions
├── railway.json                     # Railway config
├── src/
│   ├── config/
│   │   ├── supabase.ts             # Supabase client init
│   │   └── database.ts             # Database helper functions
│   ├── middleware/
│   │   └── auth.middleware.ts      # JWT verification
│   └── routes/
│       ├── auth.routes.example.ts  # Example auth implementation
│       └── task.routes.example.ts  # Example task implementation
```

### Frontend Files Updated

```
frontend/
├── .env.local                       # Environment variables
└── lib/
    └── supabase.ts                 # Supabase client
```

### Documentation

```
├── RAILWAY_DEPLOYMENT_GUIDE.md          # Detailed deployment guide
├── SETUP_RAILWAY_SUPABASE.md           # Setup verification checklist
├── RAILWAY_SUPABASE_CONFIG_SUMMARY.md  # This summary
```

## ⚡ Next Actions (Priority Order)

### 1. Deploy Backend to Railway

```bash
# Push all changes to GitHub
git add .
git commit -m "Add Railway and Supabase integration"
git push origin main

# Then go to Railway:
# 1. https://railway.app/dashboard
# 2. Create Project → Deploy from GitHub
# 3. Select repo and backend folder
# 4. Add environment variables (see below)
```

### 2. Add Environment Variables to Railway

Go to Railway → Your Project → Backend Service → Variables

**Required Variables:**

```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com

NEXT_PUBLIC_SUPABASE_URL=https://dainnsuqjiaveazgcuph.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp
SUPABASE_SERVICE_ROLE_KEY=[COPY FROM SUPABASE SETTINGS]

GEMINI_API_KEY=AIzaSyDofrRmeWhDbZwTybN_biaCg3ciGOWjmD0
JWT_SECRET=[GENERATE: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
```

### 3. Set Up Supabase Tables

Go to Supabase → SQL Editor → Run this:

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'medium',
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_users_email ON users(email);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
```

### 4. Install & Test Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev

# Visit http://localhost:3000
```

### 5. Implement Auth & Task Routes

Replace placeholder implementations:

```bash
# Option: Copy example implementations
cp backend/src/routes/auth.routes.example.ts backend/src/routes/auth.routes.ts
cp backend/src/routes/task.routes.example.ts backend/src/routes/task.routes.ts
```

Or manually implement using the database helpers in `src/config/database.ts`

## 🔗 Database Helper Usage

### Users

```typescript
import { db } from "../config/database";

// Create user
await db.users.create({ email, name, passwordHash });

// Find by email
await db.users.findByEmail(email);

// Find by ID
await db.users.findById(id);

// Update user
await db.users.update(id, { name: "New Name" });
```

### Tasks

```typescript
// Get all tasks for user
await db.tasks.getAll(userId);

// Get single task
await db.tasks.getById(taskId, userId);

// Create task
await db.tasks.create({ user_id, title, status, priority });

// Update task
await db.tasks.update(taskId, userId, updates);

// Delete task
await db.tasks.delete(taskId, userId);
```

## 🛡️ Auth Middleware

```typescript
import { verifyAuth } from "../middleware/auth.middleware";

// Protect routes
router.get("/protected-route", verifyAuth, (req, res) => {
  const userId = req.userId; // Available after middleware
  // Handle protected endpoint
});
```

## 📊 Environment Variables Reference

### Backend `.env`

```
PORT=5000
NODE_ENV=development/production
CORS_ORIGIN=http://localhost:3000 or https://domain.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
JWT_SECRET=
```

### Frontend `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api or https://railway-url/api
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
```

## 🧪 Testing

### Test Supabase Connection

```bash
curl https://dainnsuqjiaveazgcuph.supabase.co/rest/v1/users \
  -H "Authorization: Bearer sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp" \
  -H "apikey: sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp"
```

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

### Test Backend API

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","password":"password123"}'
```

## 🐛 Common Issues

| Issue                     | Solution                                   |
| ------------------------- | ------------------------------------------ |
| Build fails on Railway    | Check build logs, verify npm works locally |
| CORS errors               | Update CORS_ORIGIN environment variable    |
| Database not found        | Create tables using SQL above              |
| Auth fails                | Verify JWT_SECRET is set in Railway        |
| Can't connect to Supabase | Check SERVICE_ROLE_KEY is correct          |

## 📚 Useful Links

- [Railway Dashboard](https://railway.app/dashboard)
- [Supabase Dashboard](https://app.supabase.com)
- [Railway Docs](https://railway.app/docs)
- [Supabase Docs](https://supabase.com/docs)

## ✅ Checklist Before Going Live

- [ ] Backend deployed on Railway
- [ ] All env vars set in Railway
- [ ] Supabase tables created
- [ ] Service Role Key added to Railway
- [ ] Auth routes implemented
- [ ] Task routes implemented
- [ ] Frontend .env.local updated
- [ ] CORS_ORIGIN set correctly
- [ ] Health endpoint working
- [ ] Auth signup/signin tested
- [ ] JWT tokens working
- [ ] Database queries working
- [ ] Frontend can call backend

---

**Status**: 🟢 Ready to deploy!

Have questions? See the detailed guides:

- `RAILWAY_DEPLOYMENT_GUIDE.md`
- `SETUP_RAILWAY_SUPABASE.md`
