"use strict";

var _express = _interopRequireDefault(require("express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _products = _interopRequireDefault(require("./routes/products"));
var _users = _interopRequireDefault(require("./routes/users"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();
app.use((0, _cors.default)());
// app.use(helmet())
app.use((0, _helmet.default)({
  contentSecurityPolicy: false
}));
app.use(_express.default.json());
app.use("/products", _products.default);
app.use("/users", _users.default);
app.use("/", (req, res) => {
  return res.redirect("/products");
});
app.listen(8080, () => {
  console.log("server run on: 8080");
});