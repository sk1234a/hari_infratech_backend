
var express = require("express")
var router = express.Router()
var db = require("./db")

// INSERT INTERIOR REQUEST
router.post("/", async (req, res) => {

  try {

    const { name, mobile, email, address } = req.body

    const sql = `
      INSERT INTO interior 
      (name, mobile, email, address) 
      VALUES ($1,$2,$3,$4)
    `

    await db.query(sql, [name, mobile, email, address])

    res.json({ message: "Interior request saved" })

  } catch (err) {
    res.json(err)
  }

})


// GET INTERIOR DATA
router.get("/", async (req, res) => {

  try {

    const result = await db.query("SELECT * FROM interior")

    res.json(result.rows)

  } catch (err) {
    res.json(err)
  }

})

module.exports = router

