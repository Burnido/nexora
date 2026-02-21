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
    const { message } = req.body```
if (!message) {
  return res.status(400).json({ error: "Message is required" })
}

const result = await model.generateContent(message)
const response = result.response.text()

res.status(200).json({ response })
```
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'AI request failed' })
  }
})

export default router
