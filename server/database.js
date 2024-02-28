const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "messaging",
  password: "utkarsh",
  port: 8000,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
  } else {
    console.log("Connected to database successfully!");
  }
});

module.exports = db;


// CREATE TABLE messages (
//   id SERIAL PRIMARY KEY,
//   message TEXT NOT NULL,
//   time_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   ip_address VARCHAR(45),
//   username VARCHAR(50) REFERENCES users(username) ON DELETE CASCADE
// );

// CREATE TABLE users (
//   user_id SERIAL PRIMARY KEY,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   username VARCHAR(50) UNIQUE NOT NULL,
//   password_hash VARCHAR(255) NOT NULL,
//   name VARCHAR(100) NOT NULL,
//   gender VARCHAR(10),
//   birthday DATE
// );

