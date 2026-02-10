# Backend - Nexora

Express.js API server for the ADHD support platform.

## 📦 Install Dependencies

```bash
npm install
```

## ⚙️ Configuration

1. Copy `.env.example` to `.env`
2. Update environment variables

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/nexora
JWT_SECRET=your_jwt_secret_key_change_this
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Development

```bash
npm run dev
```

Server will start on `http://localhost:5000`

## 🏗️ Build & Run

```bash
npm run build
npm start
```

## 📁 Directory Structure

- **routes/** - API route handlers
- **controllers/** - Business logic
- **models/** - Database schemas
- **middleware/** - Express middleware
- **services/** - Reusable services (AI, auth, etc.)
- **utils/** - Helper functions

## 🔌 API Endpoints

### Health
- `GET /api/health` - Server status

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### AI Features
- `POST /api/ai/analyze` - Analyze user patterns
- `POST /api/ai/suggest-tasks` - Get AI suggestions
- `POST /api/ai/generate-plan` - Generate focus plan
- `POST /api/ai/chat` - Chat with AI

## 🗄️ Database

Currently configured for MongoDB. Update `DATABASE_URL` in `.env` to connect.

Example:
```env
DATABASE_URL=mongodb://localhost:27017/nexora
```

## 🤖 AI Integration

OpenAI integration for:
- Task analysis and suggestions
- Focus plan generation
- Personalized insights
- Chat support

Set `OPENAI_API_KEY` in `.env`

## 🔐 Security

- JWT authentication (to be implemented)
- Bcrypt password hashing (to be implemented)
- CORS enabled
- Environment variables for secrets

## 📝 Implementation Checklist

- [ ] User authentication (JWT)
- [ ] Password hashing with bcryptjs
- [ ] MongoDB connection and models
- [ ] Task CRUD operations
- [ ] AI service integration
- [ ] User session management
- [ ] Error handling
- [ ] Input validation
- [ ] Rate limiting
- [ ] Database migrations

## 🚀 Deployment

Ready for deployment to:
- Heroku
- AWS
- DigitalOcean
- Railway
- Any Node.js host

## 📚 Tech Stack

- Express.js - Web framework
- TypeScript - Type safety
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- OpenAI API - AI features
- CORS - Cross-origin requests

## 🤝 Development Notes

- All responses use consistent JSON format
- Proper HTTP status codes
- Error handling with meaningful messages
- Logging for debugging

## 📞 Support

For issues, check:
1. Logs in console
2. `.env` configuration
3. MongoDB connection
4. API endpoint paths
