const express = require("express")
const helmet = require("helmet")
const products = require("./routes/products")
const users = require("./routes/users")
const cors = require("cors")


const app = express()

app.use(cors())
// app.use(helmet())
app.use(helmet({contentSecurityPolicy: false,}))
app.use(express.json())
app.use("/products",products)
app.use("/users",users)
app.use("/",(req,res)=>{
    return res.redirect("/products")
})
app.listen(8080,()=>{})