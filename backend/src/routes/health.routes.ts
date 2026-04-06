import { Router, Request, Response } from 'express'
import pool from '../../db.js'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Nexora API is running',
    timestamp: new Date().toISOString(),
    version: '0.1.0'
  })
})

router.get('/db', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.status(200).json({
      success: true,
      message: 'Database connection successful',
      db_time: result.rows[0].now,
    })
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    console.error('DB connection test failed:', error)
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
    })
  }
})

export default router
