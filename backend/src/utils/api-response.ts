import { Response } from 'express'

/**
 * Standardized API Error Handling
 * Use these for consistent error responses across all endpoints
 */

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface ApiError {
  code: string
  message: string
  status: number
}

// Common error types
export const ApiErrors = {
  // Authentication errors (400s)
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Unauthorized access',
    status: 401,
  },
  INVALID_TOKEN: {
    code: 'INVALID_TOKEN',
    message: 'Invalid or expired token',
    status: 401,
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'Forbidden',
    status: 403,
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Resource not found',
    status: 404,
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    message: 'Bad request',
    status: 400,
  },
  CONFLICT: {
    code: 'CONFLICT',
    message: 'Conflict - resource already exists',
    status: 409,
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    status: 422,
  },
  RATE_LIMIT: {
    code: 'RATE_LIMIT',
    message: 'Rate limit exceeded',
    status: 429,
  },

  // Server errors (500s)
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    message: 'Internal server error',
    status: 500,
  },
  DATABASE_ERROR: {
    code: 'DATABASE_ERROR',
    message: 'Database error',
    status: 500,
  },
  SERVICE_UNAVAILABLE: {
    code: 'SERVICE_UNAVAILABLE',
    message: 'Service unavailable',
    status: 503,
  },
}

/**
 * Send success response
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  status: number = 200
) => {
  res.status(status).json({
    success: true,
    message,
    data,
  } as ApiResponse<T>)
}

/**
 * Send error response
 */
export const sendError = (res: Response, error: ApiError, message?: string) => {
  res.status(error.status).json({
    success: false,
    error: error.code,
    message: message || error.message,
  })
}

/**
 * Send validation error
 */
export const sendValidationError = (res: Response, errors: any) => {
  res.status(422).json({
    success: false,
    error: ApiErrors.VALIDATION_ERROR.code,
    message: ApiErrors.VALIDATION_ERROR.message,
    details: errors,
  })
}

/**
 * Async error wrapper - wrap controller functions to catch errors
 */
export const asyncHandler = (fn: any) => (req: any, res: Response, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error('Async handler error:', error)
    sendError(res, ApiErrors.INTERNAL_ERROR, error.message)
  })
}

/**
 * Validation helper
 */
export const validateRequired = (data: any, fields: string[]): string[] => {
  const errors: string[] = []

  fields.forEach((field) => {
    if (!data[field] || data[field].toString().trim() === '') {
      errors.push(`${field} is required`)
    }
  })

  return errors
}

/**
 * Email validation
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Password validation
 */
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Example usage in a route handler:
/*

import { Router } from 'express'
import {
  sendSuccess,
  sendError,
  sendValidationError,
  ApiErrors,
  validateRequired,
  validateEmail,
  asyncHandler,
} from '../utils/api-response'
import { db } from '../config/database'

const router = Router()

router.post('/signup', asyncHandler(async (req, res) => {
  const { email, name, password } = req.body

  // Validate required fields
  const requiredErrors = validateRequired({ email, name, password }, ['email', 'name', 'password'])
  if (requiredErrors.length > 0) {
    return sendValidationError(res, { fields: requiredErrors })
  }

  // Validate email format
  if (!validateEmail(email)) {
    return sendValidationError(res, { email: 'Invalid email format' })
  }

  // Check if user exists
  const { data: existingUser } = await db.users.findByEmail(email)
  if (existingUser) {
    return sendError(res, ApiErrors.CONFLICT, 'User already exists')
  }

  // Create user
  const { data: newUser, error } = await db.users.create({
    email,
    name,
    passwordHash: hashedPassword,
  })

  if (error || !newUser) {
    return sendError(res, ApiErrors.DATABASE_ERROR)
  }

  sendSuccess(res, { userId: newUser[0].id }, 'User created successfully', 201)
}))

export default router
*/
