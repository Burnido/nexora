# Railway + Supabase Deployment Guide

## Prerequisites

- Railway Account (https://railway.app)
- Supabase Account (https://supabase.com)
- Your Supabase credentials are already configured

## Backend Deployment on Railway

### Step 1: Connect Railway to GitHub

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "Create New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account and select your repository
5. Select the `backend` directory as the root

### Step 2: Configure Environment Variables in Railway

In your Railway project settings, add these environment variables:

```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://dainnsuqjiaveazgcuph.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=AIzaSyDofrRmeWhDbZwTybN_biaCg3ciGOWjmD0
JWT_SECRET=your_secure_jwt_secret_key
```

> **Important**: The `SERVICE_ROLE_KEY` should be kept private. Get it from Supabase Settings > API Keys > Service Role key

### Step 3: Deploy on Railway

1. Railway will automatically detect the Node.js environment
2. It will run `npm install` and `npm run build`
3. Then execute `npm start` to run the server
4. Railway will provide you with a public URL (e.g., `https://your-app.up.railway.app`)

### Step 4: Update Frontend Configuration

Once Railway deployment is complete:

1. Copy the Railway URL from the deployment logs
2. In `frontend/.env.local`, add:

   ```
   NEXT_PUBLIC_API_URL=https://your-railway-url
   NEXT_PUBLIC_SUPABASE_URL=https://dainnsuqjiaveazgcuph.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp
   ```

3. Update the `CORS_ORIGIN` in Railway backend settings to match your frontend domain

## Database Schema Setup in Supabase

Create these tables in your Supabase dashboard:

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table

```sql
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
```

## Troubleshooting

### Build Fails on Railway

- Check the build logs in Railway dashboard
- Ensure `npm run build` works locally: `npm run build`
- Verify all dependencies are in `package.json`

### Database Connection Issues

- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Test Supabase connection locally first
- Check Supabase project is active (not paused)

### CORS Errors

- Update `CORS_ORIGIN` environment variable to match your frontend domain
- In Supabase, ensure your frontend domain is allowed in RLS policies

## Local Testing with Railway Variables

```bash
# Create .env file with Railway variables
cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
NEXT_PUBLIC_SUPABASE_URL=https://dainnsuqjiaveazgcuph.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_Jt3L3lofncwvR1xVQPJD_A_Vvr0nFkp
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=AIzaSyDofrRmeWhDbZwTybN_biaCg3ciGOWjmD0
JWT_SECRET=dev_jwt_secret
CORS_ORIGIN=http://localhost:3000
EOF

# Install and run
npm install
npm run dev
```

## Next Steps

1. Set up Supabase tables (copy SQL above)
2. Deploy backend to Railway
3. Configure frontend with Railway URL
4. Test API endpoints from frontend
5. Monitor logs in Railway dashboard

For more info: https://railway.app/docs
