require("dotenv").config()

const { Client } = require("pg")

const db = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

db.connect()
.then(()=>{
console.log("Supabase PostgreSQL Connected")
})
.catch((err)=>{
console.log("Database Error:",err)
})

module.exports = db