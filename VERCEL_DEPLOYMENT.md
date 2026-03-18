# Nexora Vercel Deployment Guide

## ✅ Overview

Vercel is **serverless** - it can't run your Express backend directly. This guide sets up:

- **Frontend** on Vercel ✅
- **Backend** on Railway (free tier available)
- **Database** on MongoDB Atlas (free tier available)

---

## 🚀 Step 1: Setup MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project called "nexora"
4. Create a free M0 cluster

### 1.2 Get Connection String

1. In Atlas, go to "Database" → "Connect"
2. Choose "Drivers"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/nexora`)
4. **Save this - you'll need it for backend**

### 1.3 Create Database User

In Atlas:

1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username: `nexora_user`
4. Create password: (save this!)
5. Choose "Read and write to any database"

Your connection string will be:

```
mongodb+srv://nexora_user:YOUR_PASSWORD@cluster.mongodb.net/nexora
```

---

## 🎯 Step 2: Deploy Backend to Railway

### 2.1 Prepare Backend for Railway

Update your `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

This should already be correct. ✓

### 2.2 Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub"
5. Connect your repository
6. Select the `nexora` repository
7. Railway will detect your services (backend in `/backend`)
8. Click "Deploy"

### 2.3 Set Environment Variables on Railway

In Railway dashboard:

1. Click on your Backend service
2. Go to "Variables"
3. Add these variables:

```
PORT=5000
NODE_ENV=production
DATABASE_URL=mongodb+srv://nexora_user:PASSWORD@cluster.mongodb.net/nexora
JWT_SECRET=your-random-secret-key-change-this
GEMINI_API_KEY=your-gemini-api-key
CORS_ORIGIN=https://your-frontend.vercel.app
```

⚠️ **Replace:**

- `PASSWORD` with your MongoDB password
- `your-gemini-api-key` with your Google Gemini API key
- `https://your-frontend.vercel.app` with your actual Vercel URL

### 2.4 Get Your Backend URL

After deployment, Railway shows your backend URL (like `https://nexora-backend-production.up.railway.app`)

**Save this - you'll need it for frontend!**

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Push Code to GitHub

```bash
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

### 3.2 Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New..." → "Project"
4. Select your `nexora` repository
5. Vercel auto-detects Next.js, configure:
   - **Framework:** Next.js ✓
   - **Root Directory:** `./frontend`
   - Click "Deploy"

### 3.3 Set Environment Variables on Vercel

After deployment, go to:

1. Project Settings → Environment Variables
2. Add:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app/api
```

⚠️ **Replace with your actual Railway backend URL**

### 3.4 Redeploy Frontend

Go to Deployments → Click latest → Click "Redeploy" so it picks up the new env variables.

---

## ✅ Step 4: Verify Everything Works

### Test Backend Health Check

```bash
curl https://your-backend-url.up.railway.app/api/health
```

Should return:

```json
{
  "status": "ok",
  "message": "Nexora API is running",
  "timestamp": "...",
  "version": "0.1.0"
}
```

### Test Frontend

Visit `https://your-site.vercel.app` - should load without errors

### Test API Connection

1. Go to Dashboard or AI page
2. Open browser DevTools (F12)
3. Go to Network tab
4. Make a request through the UI
5. Check if API responses are successful (200 status)

---

## 🔑 Required API Keys

### Google Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy it
4. Add to Railway as `GEMINI_API_KEY`

### MongoDB Setup

Already done in Step 1 ✓

### JWT Secret

Generate a random string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚨 Common Issues & Fixes

### Issue: "CORS error" or "API not found"

**Fix:** Check `CORS_ORIGIN` on Railway matches your Vercel URL exactly

### Issue: "Cannot connect to database"

**Fix:** Verify MongoDB connection string in Railway variables (check username:password)

### Issue: "GEMINI_API_KEY is not found"

**Fix:** Add the key to Railway environment variables and redeploy

### Issue: Frontend shows "http://localhost:5000"

**Fix:** Make sure `NEXT_PUBLIC_API_URL` is set on Vercel and frontend is redeployed

---

## 📋 Checklist

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string saved
- [ ] Backend pushed to GitHub
- [ ] Backend deployed on Railway
- [ ] Backend environment variables set on Railway
- [ ] Backend URL saved (e.g., https://nexora-backend-production.up.railway.app)
- [ ] Frontend code updated with backend URL (if needed)
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set on Vercel
- [ ] Frontend redeployed after env variables
- [ ] Health check test successful
- [ ] API requests working in browser
