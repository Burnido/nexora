import express, { Request, Response } from 'express'
const pool = require('../../db')

const router = express.Router()

// Save game session scores
router.post('/ocean-explorer/scores', async (req: Request, res: Response) => {
  const { player_name, player_age, sea_buddy, score } = req.body

  if (!player_name) {
    return res.status(400).json({ error: 'Player name is required' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO ocean_explorer_sessions 
       (game_slug, player_name, player_age, sea_buddy, score) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      ['ocean-explorer', player_name, player_age, sea_buddy, score]
    )

    return res.status(201).json({
      message: 'Score saved successfully',
      session: result.rows[0]
    })
  } catch (error) {
    console.error('Error saving score:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Get top scores / leaderboard (optional but good to have)
router.get('/ocean-explorer/leaderboard', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT player_name, sea_buddy, score, completed_at
       FROM ocean_explorer_sessions
       WHERE game_slug = 'ocean-explorer'
       ORDER BY score DESC, completed_at DESC
       LIMIT 10`
    )

    return res.status(200).json({
      leaderboard: result.rows
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
