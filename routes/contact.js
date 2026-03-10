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

    await db.query(sql, [
      name,
      mobile,
      email,
      address,
      worktype,
      propertytype,
      area
    ])

    res.json({ message: "Contact form saved" })

  } catch (err) {
    res.json(err)
  }

})


// GET CONTACT DATA
router.get("/", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM contact ORDER BY id DESC"
    )

    res.json(result.rows)

  } catch (err) {
    res.json(err)
  }

})


// DELETE CONTACT
router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params

    await db.query(
      "DELETE FROM contact WHERE id=$1",
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
      "UPDATE contact SET status='read' WHERE id=$1",
      [id]
    )

    res.json({ message: "Marked as read" })

  } catch (err) {
    res.json(err)
  }

})

module.exports = router