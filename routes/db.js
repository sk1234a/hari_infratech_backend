require("dotenv").config()

const { Pool } = require("pg")

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

db.connect()
.then(() => console.log("Supabase PostgreSQL Connected"))
.catch(err => console.log("Database Error:", err))

module.exports = db