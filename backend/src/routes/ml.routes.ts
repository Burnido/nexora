import { Router, Request, Response } from 'express'
import axios from 'axios'
import FormData from 'form-data'
import multer from 'multer'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })
const uploadImage = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 },
])

const getMlServiceUrl = () => {
  const url = process.env.ML_SERVICE_URL

  if (!url) {
    throw new Error('ML_SERVICE_URL not found in environment variables')
  }

  return url.replace(/\/+$/, '')
}

router.post('/predict', uploadImage, async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined
    const image = files?.file?.[0] || files?.image?.[0]

    if (!image) {
      return res.status(400).json({ error: 'Image file is required' })
    }

    const form = new FormData()
    form.append('file', image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
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
