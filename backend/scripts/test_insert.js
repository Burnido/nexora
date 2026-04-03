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
      ['Test Player', 25, 'Male']
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

    // Rollback so we don't pollute their db with test data
    await client.query('ROLLBACK');
    console.log('Test successful! No errors.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('DATABASE ERROR:', err.message);
  } finally {
    client.release();
  }
}

testInsert().then(() => process.exit(0));
