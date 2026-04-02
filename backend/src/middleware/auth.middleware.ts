import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export interface AuthRequest extends Request {
  userId?: string
  user?: any
}

/**
 * Middleware to verify JWT token from Authorization header
 * Usage: app.use('/api/protected', verifyAuth, routeHandler)
 */
export const verifyAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        error: 'No authorization header provided',
      })
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Invalid authorization header format',
      })
    }

    const token = authHeader.substring(7) // Remove "Bearer " prefix

    // Verify token
    const decoded: any = jwt.verify(token, JWT_SECRET)

    req.userId = decoded.id
    req.user = decoded

    next()
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
      })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token has expired',
      })
    }

    res.status(500).json({
      error: 'Token verification failed',
    })
  }
}

/**
 * Generate JWT token
 */
export const generateToken = (payload: any, expiresIn: string = '7d') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

/**
 * Verify token (standalone function)
 */
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return { valid: true, decoded }
  } catch (error: any) {
    return { valid: false, error: error.message }
  }
}
