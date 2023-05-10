import express from 'express'
import {allProducts} from '../data'
const router = express.Router()
const db = {posts:[]}

router
.get('/',(req,res) => {
    return res.json(allProducts())
})

// .post('/new',(req,res)=>{
//     console.log(req.body)
//     db.posts.push({id: db.posts.length ,...req.body})
//     return res.json({success:true})
// })
// .param('id',(req,res,next,id)=>{
//     req.id = id
//     next()
// })
// .put('/:id',(req,res)=>{
//     if(!db.posts.find(p=>p.id == req.id)) return res.status(404).send("Post not found")
//     console.log(req.body)
//     console.log(req.params)
//     db.posts[+req.id] = {id: +req.id ,...req.body}
//     return res.json({success:true})
// })
// .delete('/:id',(req,res)=>{
//     if(!db.posts.find(p=>p.id == req.id)) return res.status(404).send("Post not found")
//     console.log(req.params)
//     db.posts.splice(+req.id,1)
//     return res.json({success:true})
// })


export default router