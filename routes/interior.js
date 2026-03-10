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

    const result = await db.query(
      "SELECT * FROM interior ORDER BY id DESC"
    )

    res.json(result.rows)

  } catch (err) {
    res.json(err)
  }

})


// DELETE REQUEST
router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params

    await db.query(
      "DELETE FROM interior WHERE id=$1",
      [id]
    )

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
      "UPDATE interior SET status='read' WHERE id=$1",
      [id]
    )

    res.json({ message: "Marked as read" })

  } catch (err) {
    res.json(err)
  }

})

module.exports = router