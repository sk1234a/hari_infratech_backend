
var express = require("express")
var router = express.Router()
var db = require("./db")

// INSERT CONTACT FORM
router.post("/", async (req, res) => {

  try {

    const { name, mobile, email, address, worktype, propertytype, area } = req.body

    const sql = `
      INSERT INTO contact 
      (name, mobile, email, address, worktype, propertytype, area) 
      VALUES ($1,$2,$3,$4,$5,$6,$7)
    `

    await db.query(sql, [name, mobile, email, address, workType, propertyType, area])

    res.json({ message: "Contact form saved" })

  } catch (err) {
    res.json(err)
  }

})


// GET CONTACT DATA
router.get("/", async (req, res) => {

  try {

    const result = await db.query("SELECT * FROM contact")

    res.json(result.rows)

  } catch (err) {
    res.json(err)
  }

})

module.exports = router

