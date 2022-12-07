require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
const {db, findOne} = require('./db')
app.use(cors())
app.use(express.json())

app.get("/", (request, respond)=>{
    respond.json(db.products)
})

app.get("/users",(request, respond)=>{
    
    respond.json(db.users)
})

app.post("/login", (request,respond) =>{
    const user = findOne({username: request.body.username})
    if (user && user.password === request.body.password) {
        const token = jwt.sign(user.username,process.env.TOKEN_KEY)
        respond.json({...user,token})
    } else {
        respond.status(404).json({error:"user not exist"})
    }

})

app.listen(3000)