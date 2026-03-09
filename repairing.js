var express = require("express")
var router = express.Router()
var db = require("./db")

// INSERT REPAIRING REQUEST
router.post("/", async (req, res) => {

  try {

    const { name, mobile, email, address, worktype, propertytype, area } = req.body

    const sql = `
      INSERT INTO repairing
      (name, mobile, email, address, worktype, propertytype, area)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
    `

    await db.query(sql, [name, mobile, email, address, workType, propertyType, area])

    res.json({ message: "Repairing request saved" })

  } catch (err) {
    console.log(err)
    res.json(err)
  }

})


// GET REPAIRING DATA
router.get("/", async (req, res) => {

  try {

    const result = await db.query("SELECT * FROM repairing")

    res.json(result.rows)

  } catch (err) {
    res.json(err)
  }

})

module.exports = router