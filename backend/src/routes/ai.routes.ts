import { Router, Request, Response } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = Router()

// ✅ Initialize Gemini lazily (on first use)
let genAI: GoogleGenerativeAI | null = null
let model: any = null

function initializeGenAI() {
  if (genAI && model) return

  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not found in environment variables')
  }

  genAI = new GoogleGenerativeAI(apiKey)
  model = genAI.getGenerativeModel({ model: 'gemini-pro' })
}

// POST /api/ai/chat
router.post('/chat', async (req: Request, res: Response) => {
  try {
    initializeGenAI()
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const result = await model.generateContent(message)
    const response = result.response.text()

    res.status(200).json({ response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'AI request failed' })
  }
})

// POST /api/ai/analyze
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    initializeGenAI()
    const { content, type } = req.body

    if (!content) {
      return res.status(400).json({ error: 'Content is required' })
    }

    const prompt = `Analyze the following ${type || 'content'} and provide insights:\n\n${content}`
    const result = await model.generateContent(prompt)
    const analysis = result.response.text()

    res.status(200).json({ analysis })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Analysis failed' })
  }
})

// POST /api/ai/suggest-tasks
router.post('/suggest-tasks', async (req: Request, res: Response) => {
  try {
    initializeGenAI()
    const { goal, context } = req.body

    if (!goal) {
      return res.status(400).json({ error: 'Goal is required' })
    }

    const prompt = `Suggest 5-7 actionable tasks to achieve this goal: "${goal}". ${context ? `Context: ${context}` : ''}. Format as a JSON array of task objects with title and description fields.`
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    res.status(200).json({ tasks: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Task suggestion failed' })
  }
})

// POST /api/ai/generate-plan
router.post('/generate-plan', async (req: Request, res: Response) => {
  try {
    initializeGenAI()
    const { objective, timeframe, constraints } = req.body

    if (!objective) {
      return res.status(400).json({ error: 'Objective is required' })
    }

    const prompt = `Create a detailed action plan for: "${objective}". Timeframe: ${timeframe || 'flexible'}. ${constraints ? `Constraints: ${constraints}` : ''}. Include phases, milestones, and key metrics.`
    const result = await model.generateContent(prompt)
    const plan = result.response.text()

    res.status(200).json({ plan })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Plan generation failed' })
  }
})

export default router
