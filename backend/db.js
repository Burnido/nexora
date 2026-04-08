const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // 5 second timeout for initial connection
  statement_timeout: 10000, // 10 second timeout for statements
})

console.log('Database pool created with timeouts: connectionTimeout=5s, statementTimeout=10s')

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

pool.on('connect', () => {
  console.log('New client connected to database pool')
})

pool.on('remove', () => {
  console.log('Client removed from database pool')
})

module.exports = pool
