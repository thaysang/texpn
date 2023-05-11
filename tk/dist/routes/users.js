"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _data = _interopRequireDefault(require("../data"));
var _mdw = require("../mdw");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/', _mdw.protectRoute, (req, res) => {
  return res.json(_data.default.users);
}).post('/register', _mdw.validateNewUser, _mdw.generateToken, (req, res) => {
  return res.json(req.token);
}).post('/login', _mdw.loginUser, _mdw.generateToken, (req, res) => {
  return res.json(req.token);
}).post('/refresh', _mdw.refreshAccessToken, (req, res) => {
  return res.json(req.token);
}).param('id', (req, res, next, id) => {
  req.id = id;
  next();
}).put('/:id', (req, res) => {
  if (!_data.default.users.find(p => p.id == req.id)) return res.status(404).send("Post not found");
  _data.default.users[+req.id] = {
    id: +req.id,
    ...req.body
  };
  return res.json({
    success: true
  });
}).delete('/:id', (req, res) => {
  if (!_data.default.users.find(p => p.id == req.id)) return res.status(404).send("Post not found");
  _data.default.users.splice(+req.id, 1);
  return res.json({
    success: true
  });
});
var _default = router;
exports.default = _default;