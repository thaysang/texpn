const express = require('express')
const cors = require('cors')
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
        console.log("OK- Token")
    } else {
        console.log("Not OK")
    }

})

app.listen(3000)