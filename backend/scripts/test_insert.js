const pool = require('../db');

async function testInsert() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    console.log('Testing insert into student...');
    const studentResult = await client.query(
      `INSERT INTO student (name, age, gender) 
       VALUES ($1, $2, $3) 
       RETURNING student_id`,
      ['Test Player', 12, 'Male']
    );
    
    const studentId = studentResult.rows[0].student_id;
    console.log('Successfully inserted student with ID:', studentId);

    console.log('Testing insert into screening_test...');
    const testResult = await client.query(
      `INSERT INTO screening_test (student_id, disability_type, ai_score, result_status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [studentId, 'Dyslexia', 10, 'Completed']
    );

    console.log('Successfully inserted screening_test:', testResult.rows[0].test_id);

    // Commit the data so the user can verify it in Supabase
    await client.query('COMMIT');
    console.log('Test successful! Check your Supabase database!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('DATABASE ERROR:', err.message);
  } finally {
    client.release();
  }
}

testInsert().then(() => process.exit(0));
