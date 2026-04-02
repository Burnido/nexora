# 🐘 PostgreSQL Connection Setup Guide

## Your Supabase PostgreSQL Connection

Your database is:

- **Host**: `db.dainnsuqjiaveazgcuph.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres`

## 📋 Setting Up DATABASE_URL

### Step 1: Find Your Database Password

1. Go to **Supabase Dashboard** → Your Project
2. Click **Settings** → **Database**
3. Scroll down to "Connection string" section
4. Copy the password from the URI (it shows as `[YOUR-PASSWORD]`)

### Step 2: Update Your .env File

Replace `[YOUR-PASSWORD]` with your actual password:

```bash
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.dainnsuqjiaveazgcuph.supabase.co:5432/postgres
```

**Example**:

```bash
DATABASE_URL=postgresql://postgres:MySecurePassword123@db.dainnsuqjiaveazgcuph.supabase.co:5432/postgres
```

### Step 3: Update Railway Environment Variables

Go to Railway Dashboard → Your Project → Backend Service → Variables

Add or update:

```
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.dainnsuqjiaveazgcuph.supabase.co:5432/postgres
```

## ✅ Test the Connection

### Test Locally

```bash
cd backend
npm install
npm run dev
```

Check the logs - you should see successful database connections.

### Test with psql (Optional)

```bash
psql postgresql://postgres:YOUR_PASSWORD@db.dainnsuqjiaveazgcuph.supabase.co:5432/postgres
```

### Test with curl from Node

```bash
cd backend
npm run dev

# Then in another terminal:
curl http://localhost:5000/api/health
```

## 🔗 Full Connection String Format

```
postgresql://[user]:[password]@[host]:[port]/[database]

Where:
- user: postgres
- password: YOUR DATABASE PASSWORD
- host: db.dainnsuqjiaveazgcuph.supabase.co
- port: 5432
- database: postgres
```

## 🛡️ Security Notes

1. **Never commit `.env` to GitHub** - Add to `.gitignore` (already done)
2. **Use environment variables** - Railway automatically injects variables
3. **Keep password secure** - Don't share your connection string
4. **Rotate password periodically** - Can be done in Supabase settings

## 🔄 How Database Connection Works

Your backend now uses a **PostgreSQL connection pool** (`pg` package):

```typescript
// Multiple clients are maintained in the pool
// Queries are automatically routed to available connections
// Idle connections are closed after 30 seconds
// Maximum 20 concurrent connections
```

This is more efficient than:

- Opening a new connection per request
- Using Supabase SDK for every database operation

## 🧪 Testing Queries

Once set up, test with:

```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","password":"SecurePass123"}'

# Check database
psql postgresql://postgres:PASSWORD@db.dainnsuqjiaveazgcuph.supabase.co:5432/postgres
postgres=# SELECT * FROM users;
```

## 📊 Connection Pool Configuration

The pool is configured in `backend/src/config/database.ts`:

```typescript
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
  max: 20, // Max 20 connections
  idleTimeoutMillis: 30000, // Close idle after 30s
  connectionTimeoutMillis: 2000, // Connect timeout 2s
});
```

Adjust these values if needed for your production workload.

## 🐛 Troubleshooting Connection Issues

### Error: "Password authentication failed"

- ✅ Double-check your password is correct
- ✅ Make sure no special characters were escaped

### Error: "connect ECONNREFUSED"

- ✅ Check DATABASE_URL format is correct
- ✅ Ensure Supabase project is active (not paused)

### Error: "FATAL: remaining connection slots are reserved"

- ✅ Increase `max` pool size in `database.ts`
- ✅ Implement connection pooling (already done)

### Connection times out

- ✅ Check if Supabase firewall allows your IP
- ✅ Check if your internet connection is stable

## 📚 Quick Reference

| Task                   | Command                                 |
| ---------------------- | --------------------------------------- |
| View connection config | `cat backend/.env \| grep DATABASE_URL` |
| Update password        | Edit `.env` and re-deploy               |
| View pool status       | Check logs for connection messages      |
| Test connection        | `npm run dev` in backend folder         |

---

**Status**: ✅ PostgreSQL connection ready to use!
