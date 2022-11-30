const express = require('express')
const app = express()
const users = [
    {id:0,
    username:"admin",
    password:"admin"},
     {id:1,
    username:"long",
    password:"longpass"}
]
app.get("/",(request, respond)=>{
    respond.send("HOME")
})
app.get("/users",(request, respond)=>{
    respond.json(users)
})
app.listen(3000)