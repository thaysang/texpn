const express = require('express')
const db  = require( '../data')
const router = express.Router()

router
.get('/',(req,res) => {
    return res.json(db.products)
})
.post('/new',(req,res)=>{
    db.products.push({id: db.products.length ,...req.body})
    return res.json({success:true})
})
.param('id',(req,res,next,id)=>{
    req.id = id
    next()
})
.put('/:id',(req,res)=>{
    if(!db.products.find(p=>p.id == req.id)) return res.status(404).send("Post not found")
    db.products[+req.id] = {id: +req.id ,...req.body}
    return res.json({success:true})
})
.delete('/:id',(req,res)=>{
    if(!db.products.find(p=>p.id == req.id)) return res.status(404).send("Post not found")
    db.products.splice(+req.id,1)
    return res.json({success:true})
})

module.exports = router