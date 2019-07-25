const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userDb = require("./userModel");

const {
  validateUserInfoExists,
  validateUsernameUnique
} = require("../middleware");

const router = express.Router();

router.post(
  "/register",
  validateUserInfoExists,
  validateUsernameUnique,
  async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    try {
      const newUser = await userDb.add(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({
        errorMessage: "Something went wrong when registering the user"
      });
    }
  }
);

router.post("/login", validateUserInfoExists, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userDb.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ errorMessage: "Bad credentials" });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong when registering the user"
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, options);
}
module.exports = router;
