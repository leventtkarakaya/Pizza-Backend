const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const AuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("🚀 ~ AuthMiddleware ~ authorization:", authorization);
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded) {
    req.body.userId = decoded.userId;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { AuthMiddleware };
