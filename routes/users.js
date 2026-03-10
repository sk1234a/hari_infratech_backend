const express = require("express")
const router = express.Router()
const db = require("./db")

// REGISTER

router.post("/register", async (req,res)=>{

try{

const {name,email,password,confirmPassword} = req.body

if(!name || !email || !password || !confirmPassword){
return res.json({message:"Please fill all fields"})
}

if(password !== confirmPassword){
return res.json({message:"Passwords do not match"})
}

// CHECK EMAIL

const check = await db.query(
"SELECT * FROM users WHERE email=$1",
[email]
)

if(check.rows.length > 0){
return res.json({message:"Email already registered"})
}

// INSERT USER WITH PENDING STATUS

await db.query(
"INSERT INTO users(name,email,password,status) VALUES($1,$2,$3,$4)",
[name,email,password,"pending"]
)

res.json({message:"Registration successful. Wait for admin approval"})

}catch(err){

console.log(err)
res.json({message:"Server error"})

}

})


// LOGIN

router.post("/login", async (req,res)=>{

try{

const {email,password} = req.body

if(!email || !password){
return res.json({message:"Please fill email and password"})
}

const result = await db.query(
"SELECT * FROM users WHERE email=$1",
[email]
)

if(result.rows.length === 0){
return res.json({message:"Email not found"})
}

const user = result.rows[0]

if(password !== user.password){
return res.json({message:"Wrong password"})
}

// CHECK ADMIN APPROVAL

if(user.status !== "approved"){
return res.json({message:"Your account is pending admin approval"})
}

res.json({
message:"Login success",
user:user.name
})

}catch(err){

console.log(err)
res.json({message:"Server error"})

}

})


// GET ALL PENDING USERS

router.get("/pending-users", async (req,res)=>{

try{

const result = await db.query(
"SELECT * FROM users WHERE status=$1",
["pending"]
)

res.json(result.rows)

}catch(err){

console.log(err)
res.json({message:"Server error"})
}

})


// APPROVE USER

router.put("/approve-user/:id", async (req,res)=>{

try{

const {id} = req.params

await db.query(
"UPDATE users SET status=$1 WHERE id=$2",
["approved",id]
)

res.json({message:"User approved successfully"})

}catch(err){

console.log(err)
res.json({message:"Server error"})
}

})

// UPDATE PASSWORD

router.put("/update-password", async (req,res)=>{

try{

const {email,newPassword} = req.body

if(!email || !newPassword){
return res.json({message:"Please enter new password"})
}

await db.query(
"UPDATE users SET password=$1 WHERE email=$2",
[newPassword,email]
)

res.json({
message:"Congratulations! Password updated successfully"
})

}catch(err){

console.log(err)
res.json({message:"Server error"})

}

})

module.exports = router