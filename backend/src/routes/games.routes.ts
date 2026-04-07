import express, { Request, Response } from 'express'
import pool from '../../db.js'

const router = express.Router()

// Save game session scores — creates/links school, student, and screening_test
router.post('/ocean-explorer/scores', async (req: Request, res: Response) => {
  const {
    player_name,
    player_age,
    gender,
    sea_buddy,
    score,
    school_name,
    school_location,
    contact_person,
  } = req.body

  if (!player_name) {
    return res.status(400).json({ error: 'Player name is required' })
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // 1. Upsert school — find existing by name, or create new
    let schoolId: string | null = null
    if (school_name) {
      const existingSchool = await client.query(
        `SELECT school_id FROM school WHERE school_name = $1 LIMIT 1`,
        [school_name]
      )

      if (existingSchool.rows.length > 0) {
        schoolId = existingSchool.rows[0].school_id
      } else {
        const newSchool = await client.query(
          `INSERT INTO school (school_name, location, contact_person)
           VALUES ($1, $2, $3)
           RETURNING school_id`,
          [school_name, school_location || null, contact_person || null]
        )
        schoolId = newSchool.rows[0].school_id
      }
    }

    // 2. Create the student record linked to the school
    const studentResult = await client.query(
      `INSERT INTO student (name, age, gender, school_id)
       VALUES ($1, $2, $3, $4)
       RETURNING student_id`,
      [player_name, player_age || null, gender || 'Not Specified', schoolId]
    )
    const studentId = studentResult.rows[0].student_id

    // 3. Normalize score (0–10 raw → 0.0–1.0 float for ai_score constraint)
    const MAX_ROUNDS = 10
    const normalizedScore = Math.min(1, Math.max(0, (score ?? 0) / MAX_ROUNDS))

    // result_status constraint: 'Pending' | 'Low Risk' | 'High Risk'
    const resultStatus = normalizedScore >= 0.7 ? 'Low Risk' : 'High Risk'

    // 4. Insert screening_test linked to student
    const testResult = await client.query(
      `INSERT INTO screening_test (student_id, disability_type, ai_score, result_status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [studentId, 'Dyslexia', normalizedScore, resultStatus]
    )

    await client.query('COMMIT')

    return res.status(201).json({
      message: 'Assessment saved successfully',
      student_id: studentId,
      school_id: schoolId,
      test_id: testResult.rows[0].test_id,
      result_status: resultStatus,
      ai_score: normalizedScore,
    })
  } catch (error) {
    await client.query('ROLLBACK')
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('CRITICAL DATABASE ERROR:', err.message)
    return res.status(500).json({
      error: 'Database error',
      details: err.message,
    })
  } finally {
    client.release()
  }
})

export default router
