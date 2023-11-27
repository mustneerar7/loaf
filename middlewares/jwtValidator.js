const jwt = require("jsonwebtoken");

const secretKey = "SPECIALZ";

const jwtValidator = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "fail", message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

module.exports = jwtValidator;
