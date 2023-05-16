const Joi = require('joi')
const {hash,compare} = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../data')

module.exports.validateNewUser = async (req,res,next) => {
    
    // //vanila validation
    // if(!req.body.username || req.body.username.length < 3) {
    //     return res.status(400).send("bad request")
    // }
    // JOI
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        repeat_password: Joi.ref('password'),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
        .with('password', 'repeat_password');

    const {error} = await schema.validate(req.body)
    if(error) return res.status(400).send(error.message)
    // Find exist users
    let user = await db.users.find(u => u.username == req.body.username)
    if(user && user.username) return res.status(400).send(`${req.body.username} already existed`)
    // Ok- hash pasword and save data
    const password = await hash(req.body.password,10)
    user = await {
        id: db.users.length ,
        username:req.body.username,
        password
    }
    await db.users.push(user)
    req.user = await {username:user.username}
    // generate token 
    // req.token = await jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:"30s"})
    next()
}

module.exports.loginUser = async (req,res,next) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    const {error} = await schema.validate(req.body)
    if(error) return res.status(400).send(error.message)
    // Find exist users
    let user = await db.users.find(u => u.username == req.body.username)
    if(!user || !user.username) return res.status(400).send(`${req.body.username} doest not existed`)
    // Ok- hash pasword and save data
    const result = await compare(req.body.password,user.password)
    if(!result) return res.status(400).send("wrong password")
    // generate token 
    req.user = await {username:user.username}
    // req.token = await jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:"30s"})
    next()
}

module.exports.protectRoute = (req,res,next) => {
    const header = req.headers['authorization']
    const token = header? header.split(' ')[1] : null
    if(!token) return res.status(401).send("Please log in")
    jwt.verify(token, process.env.ACCESS_TOKEN, (err,user) =>{
        if(err) return res.status(401).send(err.message)
        req.user = user
        next()
    })
}

module.exports.generateToken = async (req,res,next) => {
    const accessToken = await jwt.sign(req.user,process.env.ACCESS_TOKEN,{expiresIn:"60s"})
    const refreshToken =  await jwt.sign(req.user,process.env.REFRESH_TOKEN)
    req.token = await {accessToken,refreshToken}
    next()
}

module.exports.refreshAccessToken = async (req,res,next) => {
    const header = req.headers['authorization']
    const token = header? header.split(' ')[1] : null
    if(!token) return res.status(401).send("you don't have permistion to refresh")
    // if(!req.body.token) return res.status(401).send("Wrong Token")
    jwt.verify(token, process.env.REFRESH_TOKEN, async (err,user) =>{
        if(err) return res.status(401).send(err.message)
        //ignore iat and exp in user
        const accessToken = await jwt.sign({username:user.username},process.env.ACCESS_TOKEN,{expiresIn:"60s"})
        req.token = await {accessToken}
        next()
    })
}