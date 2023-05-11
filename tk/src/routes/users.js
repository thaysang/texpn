import express from 'express'
import db from '../data'
import { validateNewUser,protectRoute,loginUser,generateToken,refreshAccessToken } from '../mdw'
const router = express.Router()

router
.get('/', protectRoute, (req,res) => {
    return res.json(db.users)
})
.post('/register', validateNewUser,generateToken,(req,res)=>{
    return res.json(req.token)
})
.post('/login', loginUser,generateToken,(req,res)=>{
    return res.json(req.token)
})
.post('/refresh', refreshAccessToken, (req,res)=>{
    return res.json(req.token)
})
.param('id',(req,res,next,id)=>{
    req.id = id
    next()
})
.put('/:id',(req,res)=>{
    if(!db.users.find(p=>p.id == req.id)) return res.status(404).send("Post not found")
    db.users[+req.id] = {id: +req.id ,...req.body}
    return res.json({success:true})
})
.delete('/:id',(req,res)=>{
    if(!db.users.find(p=>p.id == req.id)) return res.status(404).send("Post not found")
    db.users.splice(+req.id,1)
    return res.json({success:true})
})

export default router