
var express = require("express")
var router = express.Router()
var db = require("./db")

// INSERT DATA
router.post("/", async (req, res) => {

  try {

    const { name, mobile, email, address, worktype, propertytype, area } = req.body

    const sql = `
      INSERT INTO construction 
      (name, mobile, email, address, worktype, propertytype, area) 
      VALUES ($1,$2,$3,$4,$5,$6,$7)
    `

    await db.query(sql, [name, mobile, email, address, worktype, propertytype, area])

    res.json({ message: "Construction request saved" })

  } catch (err) {
    res.json(err)
  }

})


// GET DATA
router.get("/", async (req, res) => {

  try {

    const result = await db.query("SELECT * FROM construction")

    res.json(result.rows)

  } catch (err) {
    res.json(err)
  }

})

module.exports = router

