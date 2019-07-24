const userDb = require("../users/userModel");

module.exports = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await userDb.findBy({ username });
    if (user) {
      res.status(400).json({ errorMessage: "Username already exists" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      errorMessage:
        "Something went wrong validating that username, please try again"
    });
  }
};
