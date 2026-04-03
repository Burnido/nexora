const pool = require('../db');

async function check() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT pg_get_constraintdef(oid) as def
      FROM pg_constraint
      WHERE conname = 'student_age_check';
    `);
    console.log('Constraint is: ', res.rows[0]?.def);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

check();
