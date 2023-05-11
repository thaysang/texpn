import express from "express"
import helmet from 'helmet'
import dotenv from 'dotenv'
import products from './routes/products'
import users from './routes/users'
import cors from 'cors'

dotenv.config()

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
app.listen(8080,()=>{
    console.log("server run on: 8080")
})