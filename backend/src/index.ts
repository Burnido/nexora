import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import taskRoutes from './routes/task.routes'
import aiRoutes from './routes/ai.routes'
import healthRoutes from './routes/health.routes'
import gamesRoutes from './routes/games.routes'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      /^https:\/\/.*\.railway\.app$/,
    ]

    // Custom origin from env
    const customOrigin = process.env.CORS_ORIGIN
    if (customOrigin) {
      allowedOrigins.push(customOrigin)
    }

    // Allow if origin is not present (like mobile apps) or matches allowed list
    if (!origin) {
      return callback(null, true)
    }

    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin)
      }
      return allowed === origin
    })

    if (isAllowed) {
      callback(null, true)
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`)
      callback(new Error('CORS not allowed'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/games', gamesRoutes)

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
  })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
