const pool = require('../db');

async function setupSystemDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Enable uuid-ossp for uuid_generate_v4() support if supported by Supabase pg
    // Supabase usually has this enabled, but just in case:
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await client.query(`
      CREATE TABLE IF NOT EXISTS school (
        school_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        school_name VARCHAR,
        location VARCHAR,
        contact_person VARCHAR,
        email VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS system_user (
        user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR,
        email VARCHAR,
        password VARCHAR,
        phone_no VARCHAR,
        role VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS specialist (
        specialist_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES system_user(user_id),
        specialization VARCHAR,
        license_no VARCHAR,
        bio TEXT,
        consultation_fee NUMERIC,
        is_verified BOOLEAN
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS student (
        student_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        parent_id UUID REFERENCES system_user(user_id),
        school_id UUID REFERENCES school(school_id),
        name VARCHAR,
        age INT4,
        gender VARCHAR,
        enrollment_date DATE DEFAULT CURRENT_DATE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS screening_test (
        test_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        student_id UUID REFERENCES student(student_id),
        disability_type VARCHAR,
        ai_score FLOAT8,
        result_status VARCHAR,
        test_date DATE DEFAULT CURRENT_DATE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS therapy_session (
        session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        student_id UUID REFERENCES student(student_id),
        specialist_id UUID REFERENCES specialist(specialist_id),
        session_date TIMESTAMP,
        duration INT4,
        clinical_notes TEXT,
        status VARCHAR
      );
    `);

    await client.query('COMMIT');
    console.log('Successfully set up core system DB tables.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to set up system database tables', error);
  } finally {
    client.release();
  }
}

setupSystemDb().then(() => process.exit(0));
