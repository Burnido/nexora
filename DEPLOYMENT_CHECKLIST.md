# 🚀 Quick Deployment Checklist for Vercel

Follow these steps **in order** to deploy your Nexora app to Vercel + Railway.

---

## ✅ Prerequisites (Do These First!)

### Get API Keys

- [ ] **Google Gemini API Key** (free)
  - Go to: https://makersuite.google.com/app/apikey
  - Click "Create API Key"
  - Copy the key - you'll need it

- [ ] **MongoDB Atlas Setup** (free)
  - Go to: https://www.mongodb.com/cloud/atlas
  - Create free account and cluster
  - Create database user (username: `nexora_user`)
  - Copy connection string: `mongodb+srv://nexora_user:PASSWORD@cluster...`

---

## 📦 Step 1: Prepare Your Code

```bash
# Navigate to project root
cd c:\Users\acer\OneDrive\Desktop\nexora-clean

# Create .env files from examples
# Backend
cd backend
copy .env.example .env
# Edit .env and add:
#   DATABASE_URL=your-mongodb-atlas-string
#   GEMINI_API_KEY=your-gemini-key

# Frontend
cd ../frontend
copy .env.example .env.local
# Edit .env.local and add:
#   NEXT_PUBLIC_API_URL=http://localhost:5000/api  (for local testing)
```

---

## 🔼 Step 2: Push to GitHub

```bash
# From project root
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

---

## 🚂 Step 3: Deploy Backend to Railway

### 3.1 Create Railway Account

- Go to: https://railway.app
- Click "Start Project"
- Select "GitHub" and connect

### 3.2 Deploy Backend

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select `nexora` repository
4. Railway detects backend in `/backend`
5. Click "Deploy"
6. **Wait for deployment** (takes 2-3 minutes)

### 3.3 Set Environment Variables on Railway

1. Click on Backend service
2. Go to "Variables" tab
3. Add these variables:

```
PORT=5000
NODE_ENV=production
DATABASE_URL=mongodb+srv://nexora_user:PASSWORD@cluster.mongodb.net/nexora
JWT_SECRET=your-random-secret-key-change-this
GEMINI_API_KEY=your-gemini-api-key
CORS_ORIGIN=https://YOUR-VERCEL-DOMAIN.vercel.app
```

Replace:

- `PASSWORD` = your MongoDB password
- `your-gemini-api-key` = your Gemini API key
- `YOUR-VERCEL-DOMAIN` = your Vercel domain (set after step 4)

### 3.4 Get Backend URL

- Railway dashboard shows your backend URL
- Example: `https://nexora-backend-xyzabc.up.railway.app`
- **Copy this - you need it for the next step!**

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 4.1 Deploy to Vercel

1. Go to: https://vercel.com
2. Click "Add New Project"
3. Select `nexora` from GitHub
4. **Configure project:**
   - Framework: `Next.js` (auto-selected)
   - Root Directory: `./frontend` (IMPORTANT!)
   - Click "Deploy"
5. **Wait for deployment** (takes 2-3 minutes)

### 4.2 Get Your Vercel Domain

- After deployment, you see a domain like: `https://nexora-production-xyz.vercel.app`
- Go back to Railway and update `CORS_ORIGIN` with this URL

### 4.3 Set Environment Variables on Vercel

1. Go to Vercel dashboard
2. Click your project
3. Go to "Settings" → "Environment Variables"
4. Add:

```
NEXT_PUBLIC_API_URL=https://YOUR-RAILWAY-BACKEND-URL/api
```

Replace:

- `YOUR-RAILWAY-BACKEND-URL` = your Railway backend URL (from step 3.4)
- Example: `https://nexora-backend-xyzabc.up.railway.app/api`

### 4.4 Redeploy Frontend

1. Go to "Deployments"
2. Click the latest deployment
3. Click "Redeploy"
4. Wait for deployment

---

## ✅ Verification

### Test 1: Backend Health Check

```bash
# Replace with your actual Railway URL
curl https://YOUR-RAILWAY-BACKEND-URL/api/health
```

Should return:

```json
{
  "status": "ok",
  "message": "Nexora API is running"
}
```

### Test 2: Visit Frontend

- Open: `https://your-app.vercel.app`
- Check for errors in browser console (F12)

### Test 3: Test API Call

1. Go to any page that makes an API call
2. Open DevTools (F12)
3. Go to Network tab
4. Make an API call
5. Check that responses are 200, not 404 or CORS errors

---

## 🚨 Troubleshooting

| Problem                 | Solution                                                                    |
| ----------------------- | --------------------------------------------------------------------------- |
| **CORS Error**          | Make sure `CORS_ORIGIN` on Railway matches your Vercel URL exactly          |
| **API 404 Not Found**   | Check `NEXT_PUBLIC_API_URL` on Vercel is correct and starts with `https://` |
| **DB Connection Error** | Verify MongoDB connection string in Railway `.env` has correct password     |
| **Gemini API Error**    | Check `GEMINI_API_KEY` is set in Railway and not empty                      |
| **Blank Frontend/404**  | Make sure Vercel root directory is `./frontend`                             |

---

## 📝 Summary

After following all steps:

- ✅ Frontend deployed on Vercel
- ✅ Backend deployed on Railway
- ✅ Database on MongoDB Atlas
- ✅ Both services connected and working
- ✅ AI features powered by Google Gemini

**Total estimated time: 15-20 minutes**
