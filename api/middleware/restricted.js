const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ errorMessage: "Bad credentials" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ errorMessage: "No token provided" });
  }
};
