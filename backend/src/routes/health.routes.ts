import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Nexora API is running',
    timestamp: new Date().toISOString(),
    version: '0.1.0'
  })
})

export default router
