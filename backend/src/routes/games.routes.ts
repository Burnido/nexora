import express, { Request, Response } from 'express'
import pool from '../../db.js'

const router = express.Router()

const MAX_ROUNDS = 10

const getOptionalText = (value: unknown) => {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

const getRequiredText = (value: unknown) => {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

const parseOptionalNumber = (value: unknown) => {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const doesTableExist = async (client: any, tableName: string) => {
  const result = await client.query(`SELECT to_regclass($1) AS table_ref`, [`public.${tableName}`])
  return Boolean(result.rows[0]?.table_ref)
}

const getOceanExplorerSlug = async (client: any) => {
  const gamesTableExists = await doesTableExist(client, 'games')
  if (!gamesTableExists) {
    return null
  }

  const gameResult = await client.query(
    `SELECT slug FROM games WHERE slug = 'ocean-explorer' LIMIT 1`
  )
  return gameResult.rows[0]?.slug ?? null
}

router.post('/ocean-explorer/onboarding', async (req: Request, res: Response) => {
  const playerName = getRequiredText(req.body.player_name)
  const playerAge = parseOptionalNumber(req.body.player_age)
  const gender = getOptionalText(req.body.gender) || 'Not Specified'
  const seaBuddy = getOptionalText(req.body.sea_buddy)
  const schoolName = getRequiredText(req.body.school_name)
  const schoolLocation = getOptionalText(req.body.school_location)
  const contactPerson = getOptionalText(req.body.contact_person)

  console.log('ONBOARDING REQUEST:', {
    playerName,
    playerAge,
    gender,
    seaBuddy,
    schoolName,
    schoolLocation,
    contactPerson,
  })

  if (!playerName || !schoolName || !seaBuddy) {
    console.error('ONBOARDING VALIDATION ERROR: Missing required fields', {
      playerName: !!playerName,
      schoolName: !!schoolName,
      seaBuddy: !!seaBuddy,
    })
    return res.status(400).json({
      error: 'Player name, school name, and sea buddy are required',
    })
  }

  let client: any = null
  try {
    client = await pool.connect()
    console.log('Database connection established')

    // Set statement timeout for this connection
    await client.query('SET statement_timeout TO 10000')
    console.log('Statement timeout set to 10 seconds')

    await client.query('BEGIN')
    console.log('Transaction started')

    let schoolId: string
    console.log('Checking for existing school:', schoolName)
    const existingSchool = await client.query(
      `SELECT school_id FROM school WHERE school_name = $1 LIMIT 1`,
      [schoolName]
    )
    console.log('School query result:', existingSchool.rows.length, 'records')

    if (existingSchool.rows.length > 0) {
      schoolId = existingSchool.rows[0].school_id
      console.log('School exists, updating:', schoolId)
      await client.query(
        `UPDATE school
         SET location = COALESCE($1, location),
             contact_person = COALESCE($2, contact_person)
         WHERE school_id = $3`,
        [schoolLocation, contactPerson, schoolId]
      )
      console.log('School updated')
    } else {
      console.log('School does not exist, creating new school')
      const newSchool = await client.query(
        `INSERT INTO school (school_name, location, contact_person)
         VALUES ($1, $2, $3)
         RETURNING school_id`,
        [schoolName, schoolLocation, contactPerson]
      )
      schoolId = newSchool.rows[0].school_id
      console.log('School created with ID:', schoolId)
    }

    const studentResult = await client.query(
      `INSERT INTO student (name, age, gender, school_id)
       VALUES ($1, $2, $3, $4)
       RETURNING student_id`,
      [playerName, playerAge, gender, schoolId]
    )
    const studentId = studentResult.rows[0].student_id
    console.log('Student created with ID:', studentId)

    let onboardingSessionId: number | null = null
    const sessionsTableExists = await doesTableExist(client, 'ocean_explorer_sessions')
    console.log('Ocean explorer sessions table exists:', sessionsTableExists)

    if (sessionsTableExists) {
      const gameSlug = await getOceanExplorerSlug(client)
      console.log('Game slug:', gameSlug)

      if (gameSlug) {
        const onboardingSession = await client.query(
          `INSERT INTO ocean_explorer_sessions (game_slug, player_name, player_age, sea_buddy, score)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
          [gameSlug, playerName, playerAge, seaBuddy, 0]
        )
        onboardingSessionId = onboardingSession.rows[0].id
        console.log('Onboarding session created with ID:', onboardingSessionId)
      }
    }

    await client.query('COMMIT')
    console.log('Transaction committed successfully')

    return res.status(201).json({
      message: 'Onboarding saved successfully',
      student_id: studentId,
      school_id: schoolId,
      onboarding_session_id: onboardingSessionId,
    })
  } catch (error) {
    try {
      await client.query('ROLLBACK')
      console.log('Transaction rolled back due to error')
    } catch (rollbackErr) {
      console.error('ROLLBACK ERROR:', rollbackErr)
    }

    const err = error instanceof Error ? error : new Error(String(error))
    console.error('ONBOARDING SAVE ERROR:', err.message)
    console.error('Error stack:', err.stack)

    return res.status(500).json({
      error: 'Database error',
      details: err.message,
    })
  } finally {
    if (client) {
      client.release()
      console.log('Database connection released')
    }
  }
})

// Save game session scores — creates/links school, student, and screening_test
router.post('/ocean-explorer/scores', async (req: Request, res: Response) => {
  const playerName = getRequiredText(req.body.player_name)
  const playerAge = parseOptionalNumber(req.body.player_age)
  const gender = getOptionalText(req.body.gender) || 'Not Specified'
  const seaBuddy = getOptionalText(req.body.sea_buddy)
  const score = parseOptionalNumber(req.body.score) || 0
  const schoolName = getOptionalText(req.body.school_name)
  const schoolLocation = getOptionalText(req.body.school_location)
  const contactPerson = getOptionalText(req.body.contact_person)
  const onboardingSessionId = parseOptionalNumber(req.body.onboarding_session_id)
  const studentIdFromBody = getOptionalText(req.body.student_id)

  console.log('SCORE SAVE REQUEST:', {
    playerName,
    playerAge,
    gender,
    seaBuddy,
    score,
    schoolName,
    studentIdFromBody,
    onboardingSessionId,
  })

  if (!playerName && !studentIdFromBody) {
    console.error('SCORE SAVE ERROR: Missing player_name and student_id')
    return res.status(400).json({ error: 'Player name or student_id is required' })
  }

  let client: any = null

  try {
    client = await pool.connect()
    console.log('Database connection established')

    // Set statement timeout for this connection
    await client.query('SET statement_timeout TO 10000')
    console.log('Statement timeout set to 10 seconds')

    await client.query('BEGIN')
    console.log('Transaction started')

    let schoolId: string | null = null
    let studentId: string | null = studentIdFromBody

    if (!studentId) {
      if (schoolName) {
        const existingSchool = await client.query(
          `SELECT school_id FROM school WHERE school_name = $1 LIMIT 1`,
          [schoolName]
        )

        if (existingSchool.rows.length > 0) {
          schoolId = existingSchool.rows[0].school_id
          await client.query(
            `UPDATE school
             SET location = COALESCE($1, location),
                 contact_person = COALESCE($2, contact_person)
             WHERE school_id = $3`,
            [schoolLocation, contactPerson, schoolId]
          )
        } else {
          const newSchool = await client.query(
            `INSERT INTO school (school_name, location, contact_person)
             VALUES ($1, $2, $3)
             RETURNING school_id`,
            [schoolName, schoolLocation, contactPerson]
          )
          schoolId = newSchool.rows[0].school_id
        }
      }

      const studentResult = await client.query(
        `INSERT INTO student (name, age, gender, school_id)
         VALUES ($1, $2, $3, $4)
         RETURNING student_id`,
        [playerName, playerAge, gender, schoolId]
      )
      studentId = studentResult.rows[0].student_id
    }

    const normalizedScore = Math.min(1, Math.max(0, score / MAX_ROUNDS))

    const resultStatus = normalizedScore >= 0.7 ? 'Low Risk' : 'High Risk'

    const testResult = await client.query(
      `INSERT INTO screening_test (student_id, disability_type, ai_score, result_status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [studentId, 'Dyslexia', normalizedScore, resultStatus]
    )

    let savedSessionId: number | null = null
    const sessionsTableExists = await doesTableExist(client, 'ocean_explorer_sessions')

    if (sessionsTableExists && onboardingSessionId) {
      const updatedSession = await client.query(
        `UPDATE ocean_explorer_sessions
         SET score = $1,
             completed_at = CURRENT_TIMESTAMP,
             player_name = COALESCE($2, player_name),
             player_age = COALESCE($3, player_age),
             sea_buddy = COALESCE($4, sea_buddy)
         WHERE id = $5
         RETURNING id`,
        [score, playerName, playerAge, seaBuddy, onboardingSessionId]
      )

      if (updatedSession.rows.length > 0) {
        savedSessionId = updatedSession.rows[0].id
      }
    }

    if (sessionsTableExists && !savedSessionId) {
      const gameSlug = await getOceanExplorerSlug(client)
      const createdSession = await client.query(
        `INSERT INTO ocean_explorer_sessions (game_slug, player_name, player_age, sea_buddy, score)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [gameSlug, playerName, playerAge, seaBuddy, score]
      )
      savedSessionId = createdSession.rows[0].id
    }

    await client.query('COMMIT')

    return res.status(201).json({
      message: 'Assessment saved successfully',
      student_id: studentId,
      school_id: schoolId,
      session_id: savedSessionId,
      test_id: testResult.rows[0].test_id,
      result_status: resultStatus,
      ai_score: normalizedScore,
    })
  } catch (error) {
    try {
      await client.query('ROLLBACK')
      console.log('Transaction rolled back due to error')
    } catch (rollbackErr) {
      console.error('ROLLBACK ERROR:', rollbackErr)
    }

    const err = error instanceof Error ? error : new Error(String(error))
    console.error('CRITICAL DATABASE ERROR:', err.message)
    console.error('Error stack:', err.stack)
    return res.status(500).json({
      error: 'Database error',
      details: err.message,
    })
  } finally {
    if (client) {
      client.release()
      console.log('Database connection released')
    }
  }
})

export default router
