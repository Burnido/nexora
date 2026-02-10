import { Router, Request, Response } from 'express'

const router = Router()

// TODO: Implement task management routes
// GET /api/tasks
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get all tasks - to be implemented',
    tasks: []
  })
})

// POST /api/tasks
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create task - to be implemented'
  })
})

// GET /api/tasks/:id
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get task by ID - to be implemented'
  })
})

// PUT /api/tasks/:id
router.put('/:id', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Update task - to be implemented'
  })
})

// DELETE /api/tasks/:id
router.delete('/:id', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Delete task - to be implemented'
  })
})

export default router
