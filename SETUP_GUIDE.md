# Nexora Setup & Deployment Guide

## 🚀 Installation & Setup

### Step 1: Clone & Navigate

```bash
git clone <repository-url>
cd nexora
```

### Step 2: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Frontend runs on:** http://localhost:3000

### Step 3: Backend Setup

Open a new terminal and:

```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your configuration
npm run dev
```

**Backend runs on:** http://localhost:5000

## ⚙️ Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/nexora
JWT_SECRET=your_jwt_secret_key_change_this
OPENAI_API_KEY=sk-your-key
CORS_ORIGIN=http://localhost:3000
```

## 🗄️ Database Setup

### Local MongoDB
```bash
# Download and install MongoDB
# Start MongoDB service
mongod

# Connect with MongoDB Compass or tools
mongodb://localhost:27017
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update DATABASE_URL in .env

## 🧪 Testing the Setup

### Health Check
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "ok",
  "message": "Nexora API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "0.1.0"
}
```

### Frontend Pages
- Home: http://localhost:3000/
- Sign In: http://localhost:3000/signin
- Sign Up: http://localhost:3000/signup
- Dashboard: http://localhost:3000/dashboard
- AI Studio: http://localhost:3000/ai
- Pricing: http://localhost:3000/pricing
- Resources: http://localhost:3000/resources

## 📦 Project Structure

```
nexora/
├── frontend/
│   ├── pages/           # Route pages
│   ├── components/      # React components
│   ├── lib/            # Utilities (API, store)
│   ├── styles/         # Global CSS
│   ├── utils/          # Helper functions
│   ├── public/         # Static files
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── routes/     # API endpoints
│   │   ├── controllers/
│   │   ├── models/     # Database schemas
│   │   ├── middleware/ # Custom middleware
│   │   ├── services/   # Business logic
│   │   └── utils/      # Helpers
│   └── .env
│
└── README.md
```

## 🎨 Design System

### Colors
- **Navy**: #1a1e26 (primary)
- **Cream**: #fdfbf7 (background)
- **Sage**: #8fb899 (accent)

### Typography Classes
- `.text-display` - Large headings
- `.text-heading` - Section headings
- `.text-subheading` - Subsections
- `.text-body` - Regular text
- `.text-caption` - Small text

### Button Classes
- `.btn` - Primary button
- `.btn-outline` - Outline button

## 🔌 API Endpoints

### Health
- `GET /api/health` - Server status

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/signin` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### AI
- `POST /api/ai/analyze` - Analyze patterns
- `POST /api/ai/suggest-tasks` - Task suggestions
- `POST /api/ai/generate-plan` - Create plan
- `POST /api/ai/chat` - Chat with AI

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
cd frontend
vercel deploy
```

### Backend (Heroku)
```bash
heroku create nexora-backend
git push heroku main
```

### Environment Variables on Production
- Set all `.env` variables in hosting dashboard
- Ensure CORS_ORIGIN matches frontend URL
- Update NEXT_PUBLIC_API_URL to production API

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or Atlas credentials are correct
- Check DATABASE_URL format

### CORS Errors
- Verify CORS_ORIGIN in backend .env matches frontend URL
- Check browser console for specific errors

### Port Already in Use
```bash
# Kill process on port 3000 (frontend)
npx kill-port 3000

# Kill process on port 5000 (backend)
npx kill-port 5000
```

## 📚 Next Implementation Steps

- [ ] Implement JWT authentication
- [ ] Create user models and database
- [ ] Build task management system
- [ ] Integrate OpenAI API
- [ ] Add file upload capability
- [ ] Create notification system
- [ ] Add analytics
- [ ] Implement premium features
- [ ] Setup CI/CD pipeline
- [ ] Add logging and monitoring

## 🤝 Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **API Testing**: Use Thunder Client, Postman, or curl
3. **Database**: Use MongoDB Compass for visual data management
4. **Logging**: Check browser console (frontend) and terminal (backend)

## 📞 Getting Help

1. Check README files in /frontend and /backend folders
2. Review API endpoint documentation
3. Check console for error messages
4. Ensure all environment variables are set correctly

---

Happy building! 🚀 Feel free to customize and extend this setup for your needs.
