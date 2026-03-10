
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

// DELETE DATA
router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params

    await db.query("DELETE FROM construction WHERE id=$1", [id])

    res.json({ message: "Deleted successfully" })

  } catch (err) {
    res.json(err)
  }

})


// MARK AS READ
router.put("/read/:id", async (req, res) => {

  try {

    const { id } = req.params

    await db.query(
      "UPDATE construction SET status='read' WHERE id=$1",
      [id]
    )

    res.json({ message: "Marked as read" })

  } catch (err) {
    res.json(err)
  }

})

module.exports = router

