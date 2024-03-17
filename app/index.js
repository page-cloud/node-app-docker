const { Pool } = require('pg');
const express = require('express');
const app = express();

// Connect to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// Define a simple route
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello world!']);
    const message = result.rows[0].message;
    client.release();
    res.send(message);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error');
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

