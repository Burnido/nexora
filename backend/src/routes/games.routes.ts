import express, { Request, Response } from 'express'
import pool from '../../db.js'

const router = express.Router()

// Save game session scores natively into the ERD schema
router.post('/ocean-explorer/scores', async (req: Request, res: Response) => {
  const { player_name, player_age, gender, sea_buddy, score } = req.body

  if (!player_name) {
    return res.status(400).json({ error: 'Player name is required' })
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // 1. Create the Student record
    // Leaving parent_id and school_id NULL since this is a self-administered guest flow
    const studentResult = await client.query(
      `INSERT INTO student (name, age, gender) 
       VALUES ($1, $2, $3) 
       RETURNING student_id`,
      [player_name, player_age || null, gender || 'Not Specified']
    )
    
    const studentId = studentResult.rows[0].student_id

    // 2. Insert the game result into screening_test
    // ai_score must be 0.0–1.0 (check constraint), so normalize from raw count
    const MAX_ROUNDS = 10
    const normalizedScore = Math.min(1, Math.max(0, (score ?? 0) / MAX_ROUNDS))

    const testResult = await client.query(
      `INSERT INTO screening_test (student_id, disability_type, ai_score, result_status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [studentId, 'Dyslexia', normalizedScore, 'Completed']
    )

    await client.query('COMMIT')

    return res.status(201).json({
      message: 'Score saved successfully to screening_test ERD',
      session: testResult.rows[0]
    })
  } catch (error: any) {
    if (client) await client.query('ROLLBACK')
    console.error('CRITICAL DATABASE ERROR:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      stack: error.stack
    })
    return res.status(500).json({ 
      error: 'Database error', 
      details: error.message,
      code: error.code 
    })
  } finally {
    if (client) client.release()
  }
})

export default router
