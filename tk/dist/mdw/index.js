"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateNewUser = exports.refreshAccessToken = exports.protectRoute = exports.loginUser = exports.generateToken = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _bcrypt = require("bcrypt");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _data = _interopRequireDefault(require("../data"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validateNewUser = async (req, res, next) => {
  // //vanila validation
  // if(!req.body.username || req.body.username.length < 3) {
  //     return res.status(400).send("bad request")
  // }
  // JOI
  const schema = _joi.default.object({
    username: _joi.default.string().alphanum().min(3).max(30).required(),
    password: _joi.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: _joi.default.ref('password'),
    email: _joi.default.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    })
  }).with('password', 'repeat_password');
  const {
    error
  } = await schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  // Find exist users
  let user = await _data.default.users.find(u => u.username == req.body.username);
  if (user && user.username) return res.status(400).send(`${req.body.username} already existed`);
  // Ok- hash pasword and save data
  const password = await (0, _bcrypt.hash)(req.body.password, 10);
  user = await {
    id: _data.default.users.length,
    username: req.body.username,
    password
  };
  await _data.default.users.push(user);
  req.user = await {
    username: user.username
  };
  // generate token 
  // req.token = await jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:"30s"})
  next();
};
exports.validateNewUser = validateNewUser;
const loginUser = async (req, res, next) => {
  const schema = _joi.default.object({
    username: _joi.default.string().alphanum().min(3).max(30).required(),
    password: _joi.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });
  const {
    error
  } = await schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  // Find exist users
  let user = await _data.default.users.find(u => u.username == req.body.username);
  if (!user || !user.username) return res.status(400).send(`${req.body.username} doest not existed`);
  // Ok- hash pasword and save data
  const result = await (0, _bcrypt.compare)(req.body.password, user.password);
  if (!result) return res.status(400).send("wrong password");
  // generate token 
  req.user = await {
    username: user.username
  };
  // req.token = await jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:"30s"})
  next();
};
exports.loginUser = loginUser;
const protectRoute = (req, res, next) => {
  const header = req.headers['authorization'];
  const token = header ? header.split(' ')[1] : null;
  if (!token) return res.status(401).send("Please log in");
  _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(401).send(err.message);
    req.user = user;
    next();
  });
};
exports.protectRoute = protectRoute;
const generateToken = async (req, res, next) => {
  const accessToken = await _jsonwebtoken.default.sign(req.user, process.env.ACCESS_TOKEN, {
    expiresIn: "60s"
  });
  const refreshToken = await _jsonwebtoken.default.sign(req.user, process.env.REFRESH_TOKEN);
  req.token = await {
    accessToken,
    refreshToken
  };
  next();
};
exports.generateToken = generateToken;
const refreshAccessToken = async (req, res, next) => {
  if (!req.body.token) return res.status(401).send("Wrong Token");
  _jsonwebtoken.default.verify(req.body.token, process.env.REFRESH_TOKEN, async (err, user) => {
    if (err) return res.status(401).send(err.message);
    //ignore iat and exp in user
    const accessToken = await _jsonwebtoken.default.sign({
      username: user.username
    }, process.env.ACCESS_TOKEN, {
      expiresIn: "60s"
    });
    req.token = await {
      accessToken
    };
    next();
  });
};
exports.refreshAccessToken = refreshAccessToken;