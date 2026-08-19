import { Router, Request, Response } from 'express'
import axios from 'axios'
import FormData from 'form-data'
import multer from 'multer'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const getMlServiceUrl = () => {
  const url = process.env.ML_SERVICE_URL

  if (!url) {
    throw new Error('ML_SERVICE_URL not found in environment variables')
  }

  return url.replace(/\/+$/, '')
}

router.post('/predict', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' })
    }

    const form = new FormData()
    form.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    })

    const response = await axios.post(`${getMlServiceUrl()}/predict`, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 30000,
    })

    return res.status(response.status).json(response.data)
  } catch (error: any) {
    console.error('Prediction proxy error:', error)

    if (error?.response) {
      return res.status(error.response.status).json(error.response.data)
    }

    return res.status(500).json({ error: 'Prediction failed' })
  }
})

export default router
