import { Pool, QueryResult } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Create connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Test connection
pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err)
})

/**
 * Execute a query
 */
async function query(text: string, params?: any[]): Promise<QueryResult> {
  const start = Date.now()
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error('Database query error', { text, error })
    throw error
  }
}

/**
 * Get a single client from the pool for transactions
 */
async function getClient() {
  const client = await pool.connect()
  return client
}

// Database helper functions
export const db = {
  // User operations
  users: {
    async findByEmail(email: string) {
      try {
        const result = await query('SELECT * FROM users WHERE email = $1', [email])
        return { data: result.rows[0] || null, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },

    async findById(id: string) {
      try {
        const result = await query('SELECT * FROM users WHERE id = $1', [id])
        return { data: result.rows[0] || null, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },

    async create(user: { email: string; name: string; passwordHash: string }) {
      try {
        const result = await query(
          'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING *',
          [user.email, user.name, user.passwordHash]
        )
        return { data: result.rows, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },

    async update(id: string, updates: Partial<any>) {
      try {
        const updateFields = Object.keys(updates)
          .map((key, i) => `${key} = $${i + 1}`)
          .join(', ')

        const values = [...Object.values(updates), id]

        const result = await query(
          `UPDATE users SET ${updateFields}, updated_at = CURRENT_TIMESTAMP WHERE id = $${Object.keys(updates).length + 1} RETURNING *`,
          values
        )

        return { data: result.rows, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },
  },

  // Task operations
  tasks: {
    async getAll(userId: string) {
      try {
        const result = await query(
          'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
          [userId]
        )
        return { data: result.rows, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },

    async getById(id: string, userId: string) {
      try {
        const result = await query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [
          id,
          userId,
        ])
        return { data: result.rows[0] || null, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },

    async create(task: {
      user_id: string
      title: string
      description?: string
      status: string
      priority?: string
      due_date?: string
    }) {
      try {
        const result = await query(
          `INSERT INTO tasks (user_id, title, description, status, priority, due_date) 
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [
            task.user_id,
            task.title,
            task.description || null,
            task.status,
            task.priority || 'medium',
            task.due_date || null,
          ]
        )
        return { data: result.rows, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },

    async update(id: string, userId: string, updates: Partial<any>) {
      try {
        const updateFields = Object.keys(updates)
          .map((key, i) => `${key} = $${i + 1}`)
          .join(', ')

        const values = [...Object.values(updates), id, userId]

        const result = await query(
          `UPDATE tasks SET ${updateFields}, updated_at = CURRENT_TIMESTAMP 
           WHERE id = $${Object.keys(updates).length + 1} AND user_id = $${Object.keys(updates).length + 2} 
           RETURNING *`,
          values
        )

        return { data: result.rows, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },

    async delete(id: string, userId: string) {
      try {
        const result = await query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId])
        return { data: result.rows, error: null }
      } catch (error: any) {
        return { data: null, error: error.message }
      }
    },
  },

  // Utility functions
  pool,
  query,
  getClient,
}

export default db
