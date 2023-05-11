"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _data = _interopRequireDefault(require("../data"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/', (req, res) => {
  return res.json(_data.default.products);
}).post('/new', (req, res) => {
  _data.default.products.push({
    id: _data.default.products.length,
    ...req.body
  });
  return res.json({
    success: true
  });
}).param('id', (req, res, next, id) => {
  req.id = id;
  next();
}).put('/:id', (req, res) => {
  if (!_data.default.products.find(p => p.id == req.id)) return res.status(404).send("Post not found");
  _data.default.products[+req.id] = {
    id: +req.id,
    ...req.body
  };
  return res.json({
    success: true
  });
}).delete('/:id', (req, res) => {
  if (!_data.default.products.find(p => p.id == req.id)) return res.status(404).send("Post not found");
  _data.default.products.splice(+req.id, 1);
  return res.json({
    success: true
  });
});
var _default = router;
exports.default = _default;