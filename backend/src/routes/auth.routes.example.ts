import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../config/database'
import { supabase } from '../config/supabase'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'
const JWT_EXPIRY = '7d'

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body

    // Validate input
    if (!email || !name || !password) {
      return res.status(400).json({
        error: 'Email, name, and password are required',
      })
    }

    // Check if user already exists
    const { data: existingUser } = await db.users.findByEmail(email)
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
      })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const { data: newUser, error } = await db.users.create({
      email,
      name,
      passwordHash,
    })

    if (error || !newUser) {
      return res.status(500).json({
        error: 'Failed to create user',
      })
    }

    // Generate JWT token
    const token = jwt.sign({ id: newUser[0].id, email: newUser[0].email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    })

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].name,
      },
      token,
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
})

// POST /api/auth/signin
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      })
    }

    // Find user
    const { data: user, error } = await db.users.findByEmail(email)

    if (error || !user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      })
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password',
      })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    })

    res.status(200).json({
      message: 'Sign in successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    })
  } catch (error: any) {
    console.error('Signin error:', error)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
})

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  // Logout is typically handled on the client side by removing the token
  res.status(200).json({
    message: 'Logout successful',
  })
})

// GET /api/auth/me
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    const token = authHeader.substring(7)

    // Verify JWT token
    const decoded: any = jwt.verify(token, JWT_SECRET)

    // Get user from database
    const { data: user, error } = await db.users.findById(decoded.id)

    if (error || !user) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
      })
    }

    console.error('Get current user error:', error)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
})

export default router
