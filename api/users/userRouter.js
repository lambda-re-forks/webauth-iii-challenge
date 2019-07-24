const express = require("express");
const bcrypt = require("bcryptjs");
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

module.exports = router;
