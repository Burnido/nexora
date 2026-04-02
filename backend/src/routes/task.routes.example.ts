import { Router } from 'express'
import { db } from '../config/database'
import { verifyAuth, AuthRequest } from '../middleware/auth.middleware'

const router = Router()

// Apply auth middleware to all task routes
router.use(verifyAuth)

// GET /api/tasks - Get all tasks for current user
router.get('/', async (req: AuthRequest, res) => {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data: tasks, error } = await db.tasks.getAll(userId)

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch tasks' })
    }

    res.json({
      message: 'Tasks fetched successfully',
      tasks,
      count: tasks?.length || 0,
    })
  } catch (error: any) {
    console.error('Get tasks error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/tasks/:id - Get a single task
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data: task, error } = await db.tasks.getById(id, userId)

    if (error || !task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.json({
      message: 'Task fetched successfully',
      task,
    })
  } catch (error: any) {
    console.error('Get task error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /api/tasks - Create a new task
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const { data: task, error } = await db.tasks.create({
      user_id: userId,
      title,
      description: description || null,
      status: status || 'pending',
      priority: priority || 'medium',
      due_date: due_date || null,
    })

    if (error || !task) {
      return res.status(500).json({ error: 'Failed to create task' })
    }

    res.status(201).json({
      message: 'Task created successfully',
      task,
    })
  } catch (error: any) {
    console.error('Create task error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /api/tasks/:id - Update a task
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const updates = req.body

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No updates provided' })
    }

    // Prevent user_id updates
    delete updates.user_id
    delete updates.id

    const { data: task, error } = await db.tasks.update(id, userId, {
      ...updates,
      updated_at: new Date().toISOString(),
    })

    if (error || !task) {
      return res.status(404).json({ error: 'Task not found or update failed' })
    }

    res.json({
      message: 'Task updated successfully',
      task,
    })
  } catch (error: any) {
    console.error('Update task error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data, error } = await db.tasks.delete(id, userId)

    if (error) {
      return res.status(404).json({ error: 'Task not found or delete failed' })
    }

    res.json({
      message: 'Task deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete task error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
