# Railway + Supabase Setup Verification

## ✅ What Has Been Configured

### Backend Configuration

- ✅ Environment variables configured in `.env`
- ✅ Supabase client setup in `src/config/supabase.ts`
- ✅ Database helper functions in `src/config/database.ts`
- ✅ Railway configuration file (`railway.json`)
- ✅ `.railwayignore` file for optimized deployments
- ✅ Required packages added: `@supabase/supabase-js`, `pg`

### Frontend Configuration

- ✅ Supabase environment variables added to `.env.local`
- ✅ Supabase client setup in `lib/supabase.ts`
- ✅ `@supabase/supabase-js` package added
- ✅ Railway API URL already configured

## 🔧 Next Steps to Complete Setup

### 1. Backend Deployment on Railway

```bash
# Step 1: Push to GitHub (if not already done)
git add .
git commit -m "Add Railway and Supabase configuration"
git push origin main

# Step 2: Go to Railway Dashboard
# - Create new project
# - Connect GitHub repository
# - Select `backend` directory as root
```

### 2. Add Missing Environment Variables in Railway

Go to Railway Dashboard > Your Project > Backend Service > Variables:

```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com

NEXT_PUBLIC_SUPABASE_URL=https://dainnsuqjiaveazgcuph.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp
SUPABASE_SERVICE_ROLE_KEY=<Get from Supabase Project > Settings > API Keys > Service Role>

GEMINI_API_KEY=AIzaSyDofrRmeWhDbZwTybN_biaCg3ciGOWjmD0
JWT_SECRET=your_secure_random_key_here
```

### 3. Setup Supabase Database Tables

Go to Supabase Dashboard > SQL Editor and run:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
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

-- Create indexes for better performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_users_email ON users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies (adjust based on your auth strategy)
CREATE POLICY "Users can view their own profile"
ON users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can view their own tasks"
ON tasks FOR SELECT
USING (auth.uid() = user_id);
```

### 4. Update Backend Auth Routes

Replace placeholder implementations in `backend/src/routes/auth.routes.ts` with actual database calls using the `db` helper from `src/config/database.ts`.

### 5. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 6. Test Locally

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Should see: ✅ Server running on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm run dev
# Should see: ▲ Next.js running on http://localhost:3000
```

### 7. Deploy Frontend (Optional: Vercel Recommended)

```bash
# Push to GitHub, then:
# 1. Go to vercel.com
# 2. Import your GitHub repository
# 3. Add environment variables from .env.local
# 4. Deploy
```

## 📋 Environment Variables Checklist

### Backend (.env)

```
☐ PORT=5000
☐ NODE_ENV=production
☐ CORS_ORIGIN=https://your-domain.com
☐ NEXT_PUBLIC_SUPABASE_URL
☐ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
☐ SUPABASE_SERVICE_ROLE_KEY
☐ GEMINI_API_KEY
☐ JWT_SECRET
```

### Frontend (.env.local)

```
☐ NEXT_PUBLIC_API_URL=https://your-railway-url/api
☐ NEXT_PUBLIC_SUPABASE_URL
☐ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
```

## 🧪 Testing the Connection

### Test Supabase Connection from Backend

```bash
curl -X GET https://dainnsuqjiaveazgcuph.supabase.co/rest/v1/users \
  -H "Authorization: Bearer sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp" \
  -H "apikey: sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp"
```

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

## 🔐 Security Notes

1. **SERVICE_ROLE_KEY**: Keep this secret - only use on backend
2. **PUBLISHABLE_KEY**: Safe to expose in frontend code
3. **JWT_SECRET**: Generate a strong random key for production:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
4. **CORS_ORIGIN**: Update to your actual frontend domain after deployment

## 📞 Troubleshooting

### Railway Build Fails

- Check build logs: Railway Dashboard > Build Logs
- Verify `npm run build` works locally
- Ensure all dependencies are in `package.json`

### Supabase Connection Errors

- Verify SERVICE_ROLE_KEY is correct
- Ensure tables exist in Supabase
- Check RLS policies allow your access

### CORS Errors

- Update CORS_ORIGIN in Railway
- Test with curl first to isolate the issue

## 📚 Additional Resources

- [Railway Docs](https://railway.app/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Railway + Database](https://railway.app/docs/guides/databases)
