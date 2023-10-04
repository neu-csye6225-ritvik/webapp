const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_URL,
});

pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit with a non-zero status code
  }

  console.log('Connected to the database');
  process.exit(0); // Exit with a status code of 0 (success)
});