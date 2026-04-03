# ✅ Pre-Testing Verification Checklist

## ✨ Current Status

### Completed ✅

- [x] **Git Committed** - All changes saved to history
- [x] **JWT_SECRET Generated** - `e8e27ee932b3ad9a0f6e387ab911e4a95f310e85618e4512abf3ab96ee8b71aa`
- [x] **Database Connection String Set** - PostgreSQL configured
- [x] **Environment Variables** - Updated in `.env`

---

## 🔴 Critical Items Needed Before Testing

### 1. **Database Tables Must Exist** (CRITICAL)

❌ Without these tables, the app will crash on first query.

**Solution**: Go to Supabase SQL Editor and run:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_users_email ON users(email);
```

### 2. **Route Files Need Implementation** (IMPORTANT)

The route files are `.example.ts` - they need to be activated:

```bash
# Either copy examples:
cp backend/src/routes/auth.routes.example.ts backend/src/routes/auth.routes.ts
cp backend/src/routes/task.routes.example.ts backend/src/routes/task.routes.ts

# OR create your own implementations
```

**Current state**:

- `auth.routes.ts` and `task.routes.ts` exist with placeholder messages
- Example implementations are ready to use

---

## 🟡 Potential Errors During Testing

### Error 1: "Database tables don't exist"

```
Error: relation "users" does not exist
```

**Fix**: Create tables in Supabase (see above)

### Error 2: "Cannot find module 'pg'"

```
Error: Cannot find module 'pg'
```

**Fix**: Run `npm install` in backend folder

### Error 3: "Connection refused"

```
Error: connect ECONNREFUSED
```

**Causes:**

- ❌ DATABASE_URL is wrong
- ❌ Supabase project is paused
- ❌ Wrong password in connection string

**Fix**:

```bash
# Test connection directly
psql postgresql://postgres:sahilsr1330@QAZ@db.dainnsuqjiaveazgcuph.supabase.co:5432/postgres
```

### Error 4: "Invalid JWT signature or format"

```
Error: jwt malformed
```

**Causes:**

- ❌ Routes using wrong JWT_SECRET
- ❌ TOKEN_EXPIRY format incorrect

### Error 5: "CORS errors in browser"

```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix**: Update `CORS_ORIGIN` in Railway (not needed for local testing)

### Error 6: "Mongoose not needed"

Your app uses PostgreSQL, not MongoDB. You can remove:

```json
"mongoose": "^7.5.0"
```

---

## 📋 Environment Variables Check

### Current `.env` Status:

```
✅ PORT=5000
✅ NODE_ENV=production
✅ DATABASE_URL=postgresql://postgres:sahilsr1330@QAZ@db.dainnsuqjiaveazgcuph.supabase.co:5432/postgres
✅ JWT_SECRET=e8e27ee932b3ad9a0f6e387ab911e4a95f310e85618e4512abf3ab96ee8b71aa
✅ GEMINI_API_KEY=AIzaSyDofrRmeWhDbZwTybN_biaCg3ciGOWjmD0
⚠️  CORS_ORIGIN=https://your-frontend-domain.com (UPDATE FOR PRODUCTION)
✅ NEXT_PUBLIC_SUPABASE_URL (set)
✅ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY (set)
✅ SUPABASE_SERVICE_ROLE_KEY (set)
```

---

## 🧪 Ready to Test?

Before running `npm run dev`:

### Checklist:

- [ ] Supabase tables created
- [ ] `backend/.env` has all variables
- [ ] `npm install` completed (will do now)
- [ ] Database password is correct
- [ ] No TypeScript errors in `backend/src/`

After running `npm run dev`, you should see:

```
✅ Server running on http://localhost:5000
```

---

## 🚀 Next Commands

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Start development server
npm run dev

# 3. Test in another terminal
curl http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","password":"Pass123!"}'
```

---

**✅ Ready to proceed with testing?**
