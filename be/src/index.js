const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const db = {
    users: [
        {id:0,
        username:"admin",
        password:"admin"},
         {id:1,
        username:"long",
        password:"longpass"}
    ],
    products:[
        {
            id:0,
            name:"Broccoli",
            price:3.99,
            img:"http://vegetable-shop.surge.sh/img/broccoli.jpg"
        },
        {
            id:0,
            name:"Carrots",
            price:4.99,
            img:"http://vegetable-shop.surge.sh/img/carrots.jpg"
        },
    ]
}

app.get("/", (request, respond)=>{
    respond.json(db.products)
})

app.get("/users",(request, respond)=>{
    respond.json(db.users)
})

app.listen(3000)