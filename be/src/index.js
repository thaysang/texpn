require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
const {db, findOne} = require('./db')
const { json } = require('express')
app.use(cors())
app.use(express.json())

app.get("/", (request, respond)=>{
    respond.json(db.products)
})

const verifyToken = (request, respond, next) => {
    const token = request.headers.authorization.split(' ')[1]
    if(!token){    
        respond.status(401).json("Not Authorite")
    }
    jwt.verify(token,process.env.TOKEN_KEY, (err,username)=>{
        if (err) respond.status(403).json("Error user")
        request.username = username
        next()
    })
}

app.get("/users",verifyToken,(request, respond)=>{
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