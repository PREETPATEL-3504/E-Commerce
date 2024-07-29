const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const verify = jwt.verify(token, "123");
  if (!verify) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = verify.user;
  next();
};

module.exports = verifyToken;
