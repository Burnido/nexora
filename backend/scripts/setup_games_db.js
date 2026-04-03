const pool = require('../db');

async function setupGamesDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Create games table
    await client.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        tags VARCHAR[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert Ocean Explorer game if it doesn't exist
    await client.query(`
      INSERT INTO games (title, slug, description, tags)
      VALUES (
        'Dyslexia Assessment',
        'ocean-explorer',
        'Advanced reading pattern recognition through immersive oceanic environments',
        ARRAY['Pattern Recognition', 'Visual Processing', 'Reading Fluency']
      )
      ON CONFLICT (slug) DO NOTHING;
    `);

    // Create a sessions/scores table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ocean_explorer_sessions (
        id SERIAL PRIMARY KEY,
        game_slug VARCHAR(255) REFERENCES games(slug),
        player_name VARCHAR(255) NOT NULL,
        player_age INTEGER,
        sea_buddy VARCHAR(50),
        score INTEGER DEFAULT 0,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('COMMIT');
    console.log('Successfully set up games database tables.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to set up database', error);
  } finally {
    client.release();
  }
}

setupGamesDb().then(() => process.exit(0));
