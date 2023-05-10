require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

import { products } from './routes'
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/products',products)

app.get('/',(req,res)=>{
    res.redirect('/products')
})

app.listen(8080, () => {
    console.log("Server running on 8080")
});